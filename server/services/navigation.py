from fastapi import HTTPException
from datetime import datetime as dt
from subprocess import Popen, PIPE
from typing import List

from models import Item, PickupItems, Rider
from database import items_db, riders_db
import serializers
import utils


def dispatch():

    # try:
    items = serializers.items_serializer(items_db.find())
    riders = serializers.riders_serializer(riders_db.find())

    num_items  = len(items)
    num_riders = len(riders)

    time_adj = utils.get_delivery_time_matrix(items, num_items)

    program_path = "./algorithm/dispatch_eval_1000.exe"

    p = Popen(program_path, stdout=PIPE, stdin=PIPE,  encoding='utf8')
    f = open("./algorithm/dispatch_input.in","w")

    p.stdin.write(str(num_items)+'\n')
    f.write(str(int(num_items)) + '\n')

    for i in range(num_items+1):
        for j in range(num_items+1):
            if i == j:
                p.stdin.write(str(0)+'\n')
                f.write(str(int(0)) + '\n')
                continue
            p.stdin.write(str(time_adj[i][j])+'\n')
            f.write(str(int(time_adj[i][j])) + '\n')

    for item in items:
        p.stdin.write(str(int(item['volume']))+'\n')
        f.write(str(int(item['volume'])) + '\n')

    for item in items:
        edd_time_algth = item["edd"]
        p.stdin.write(str(int(edd_time_algth))+'\n')
        f.write(str(int(edd_time_algth)) + '\n')

    warehouse_lat, warehouse_lng = utils.geocode(utils.WAREHOUSE_LOCATION_DETAIL["awb_id"],utils.WAREHOUSE_LOCATION_DETAIL["address"])

    p.stdin.write(str(warehouse_lat)+'\n')
    p.stdin.write(str(warehouse_lng)+'\n')
    f.write(str(warehouse_lat) + '\n')
    f.write(str(warehouse_lng) + '\n')


    for item in items:
        awb_id = item["awb_id"]
        lat , lng = utils.geocode(awb_id,"")
        p.stdin.write(str(lat)+'\n')
        p.stdin.write(str(lng)+'\n')
        f.write(str(lat) + '\n')
        f.write(str(lng) + '\n')

    p.stdin.write(str(1)+'\n')
    f.write(str(1) + '\n')

    for item in items:
        p.stdin.write(str(1)+'\n')
        f.write(str(1) + '\n')
        
    p.stdin.write(str(num_riders)+'\n')
    f.write(str(int(num_riders)) + '\n')

    for rider in riders:
        p.stdin.write(str(int(rider['bag_volume']))+'\n')
        f.write(str(int(rider['bag_volume'])) + '\n')

    p.stdin.flush()

    deliveries = dict()

    for rider_ind in range(num_riders):

        order = []

        while True:

            result = int(p.stdout.readline().strip())

            if result == -1:
                break

            order.append(result-1)

        deliveries[rider_ind] = order

    print(deliveries)

    for rider_ind in range(num_riders):

        delivery_items = [items[i] for i in deliveries[rider_ind]]

        bag_volume = riders[rider_ind]["bag_volume"]

        tasks = []

        for item in delivery_items:

            tasks.append({
                "item_id": item["item_id"],
                "awb_id": item["awb_id"],
                "task_type": "Delivery",
                "volume": int(item["volume"]),
                "task_location": item["task_location"],
                "edd": item["edd"],
                "route_steps": [],
                "route_polyline": [],
                "time_taken": 0,
                "time_next": 0
            })

            bag_volume-=item["volume"]

        tasks.append({
            "item_id": "warehose_task",
            "awb_id": utils.WAREHOUSE_LOCATION_DETAIL["awb_id"],
            "task_type": "Delivery",
            "volume": 0,
            "edd": 48600,
            "route_steps": [],
            "route_polyline": [],
            "task_location": {
                "address": utils.WAREHOUSE_LOCATION_DETAIL["address"],
                "lat": utils.WAREHOUSE_LOCATION_DETAIL["lat"],
                "lng": utils.WAREHOUSE_LOCATION_DETAIL["lng"]
            },
            "time_taken": 0,
            "time_next": 0
        })

        if len(tasks) > 1:
            for task_ind in range(len(tasks)):
                tasks[task_ind]["route_steps"], tasks[task_ind]["route_polyline"] , tasks[task_ind]["time_taken"]  = utils.get_route(tasks, task_ind-1, task_ind)
                if task_ind > 0:
                    tasks[task_ind-1]["time_next"] = tasks[task_ind]["time_taken"]

        task_index = 0

        riders_db.update_one({"rider_id": riders[rider_ind]["rider_id"]}, {
            "$set": {
                "bag_volume": bag_volume,
                "tasks": serializers.tasks_serializer(tasks),
                "task_index": task_index
            }
        })


    return {"success": True, "message": "Dispatched Successfully!"}

    # except Exception as E:
    #     print(E)
    #     return {"success": False}


def insert_pickup(tasks, after_task_index, item):

    pickup_task = dict({
        "item_id": item["item_id"],
        "awb_id": item["awb_id"],
        "task_type": "Pickup",
        "volume": item["volume"],
        "task_location": item["task_location"],
        "edd": item["edd"],
        "route_steps": [],
        "route_polyline": [],
        "time_taken": 0,
        "time_next": 0
    })

    tasks.insert(after_task_index+1, pickup_task)

    for task_ind in range(after_task_index+1,after_task_index+3):
        tasks[task_ind]["route_steps"], tasks[task_ind]["route_polyline"] , tasks[task_ind]["time_taken"]  = utils.get_route(tasks, task_ind-1, task_ind)
        if task_ind > 0:
            tasks[task_ind-1]["time_next"] = tasks[task_ind]["time_taken"]

    return tasks
    

def get_updated_riders(riders, NUM_HOURS):

    for rider in riders:

        if len(rider["tasks"])==1 and rider["task_index"]==0:
            continue

        time_delta = NUM_HOURS*60*60

        while rider["task_index"] < len(rider["tasks"]):
            
            if rider["tasks"][rider["task_index"]]["time_taken"] > time_delta:
                rider["tasks"][rider["task_index"]]["time_taken"]-=time_delta
                break

            else:
                time_delta-=rider["tasks"][rider["task_index"]]["time_taken"]
                rider["tasks"][rider["task_index"]]["time_taken"] = 0
                rider["bag_volume"] = rider["bag_volume"] + (rider["tasks"][rider["task_index"]]["volume"])*(1 if rider["tasks"][rider["task_index"]]["task_type"] == "Delivery" else -1)
                rider["task_index"]+=1

    return riders

def add_pickup_item(item: Item, valid_riders: List[Rider], num_hours):

    try:

        program_path = "./algorithm/pickup_eval.exe"
        p = Popen(program_path, stdout=PIPE, stdin=PIPE,  encoding='utf8')

        f = open("./algorithm/pickup_input.in","w")

        current_time = num_hours*3600
        p.stdin.write(str(int(current_time))+'\n')
        f.write(str(int(current_time)) + '\n')

        item_volume = int(item["volume"])
        p.stdin.write(str(item_volume)+'\n')
        f.write(str(item_volume)+'\n')

        item_entry_time = current_time
        p.stdin.write(str(int(item_entry_time))+'\n')
        f.write(str(int(item_entry_time))+'\n\n')

        num_riders = len(valid_riders)
        p.stdin.write(str(num_riders)+'\n')
        f.write(str((num_riders))+'\n')

        for rider in valid_riders:
            p.stdin.write(str(int(rider["bag_volume"]))+'\n')
            f.write(str(int(rider["bag_volume"]))+' ')
        f.write('\n\n')

        times_from_pickup = utils.get_pickup_time_matrix(valid_riders, item)

        for rider_ind in range(len(valid_riders)):

            rider = valid_riders[rider_ind]

            num_tasks = len(rider["tasks"]) -  valid_riders[rider_ind]["task_index"]
            p.stdin.write(str(num_tasks)+'\n')
            f.write(str(num_tasks) + '\n')

            first_task_time = rider["tasks"][valid_riders[rider_ind]["task_index"]]["time_taken"]
            
            p.stdin.write(str(first_task_time)+'\n')
            f.write(str(first_task_time) + '\n')

            for task_index in range(valid_riders[rider_ind]["task_index"], valid_riders[rider_ind]["task_index"] + num_tasks):

                item_volume = rider["tasks"][task_index]["volume"]
                task_type = (0 if rider["tasks"][task_index]["task_type"] == "Delivery" else 1)
                edd_time_simult = rider["tasks"][task_index]["edd"]
                time_next = rider["tasks"][task_index]["time_next"]
                time_from_pickup = times_from_pickup[rider["rider_id"]][task_index]


                p.stdin.write(str(int(item_volume))+'\n')
                p.stdin.write(str(task_type)+'\n')
                p.stdin.write(str(int(edd_time_simult))+'\n')
                p.stdin.write(str(time_next)+'\n')
                p.stdin.write(str(time_from_pickup)+'\n')

                f.write(str(int(item_volume)) + ' ' + str(task_type) + ' ' + str(int(edd_time_simult)) + ' ' + str(time_next) + ' ' + str(time_from_pickup))
                f.write('\n')

            f.write('\n')

        p.stdin.flush()

        rider_ind = int(p.stdout.readline().strip())
        after_task_index = int(p.stdout.readline().strip()) + valid_riders[rider_ind]["task_index"]

        print(rider_ind,after_task_index)

        if rider_ind == -1:
            print("Could not assign item")
            return

        tasks = valid_riders[rider_ind]["tasks"]
        valid_riders[rider_ind]["tasks"] = insert_pickup(tasks, after_task_index, item)
    
    except Exception as E:
        print("Could not insert pickup item",E)

    return valid_riders

def add_pickup_items(pickupItems: PickupItems):

    try:

        pickupItems = serializers.pickup_items_serializer(pickupItems)
        items = pickupItems["items"]
        num_hours = int(pickupItems["num_hours"])


        for item_ind in range(len(items)):
            lat , lng = utils.geocode(items[item_ind]["awb_id"],"")

            items[item_ind]["task_location"] = {
                'address': items[item_ind]['task_location']['address'],
                'lat': lat,
                'lng': lng
            }
        
        items_db.insert_many(items)

        riders = serializers.riders_serializer(riders_db.find())
        riders = get_updated_riders(riders,num_hours)
        valid_riders = [rider for rider in riders if ( (rider["task_index"] <= (len(rider["tasks"]) - 2)) or (len(rider["tasks"])==1 and rider["task_index"]==0))]

        if len(valid_riders) == 0:
            return {"success": False, "message": "Cannot Be Inserted"}

        for item in items:
            valid_riders = add_pickup_item(item,valid_riders,num_hours)

        for rider in riders:
            riders_db.update_one({"rider_id":rider["rider_id"]},{
                "$set": {
                    "task_index": rider["task_index"],
                    "bag_volume": rider["bag_volume"]
                }
            })

        for rider in valid_riders:
            riders_db.update_one({"rider_id":rider["rider_id"]},{
                "$set": {
                    "tasks": rider["tasks"]
                }
            })

        return {"success": True, "message": "Assigned Pickup Items Successfully!"}

    except Exception as E:
        print(E)
        return {"success": False, "message": E}


def remove_pickup_item(item_id):
    
    riders = serializers.riders_serializer(riders_db.find())

    for rider in riders:

        rem_task_ind = 0
        found = False   
        
        for task_ind in len(rider["tasks"]):
            if rider["tasks"][task_ind]["item_id"] == item_id:
                rem_task_ind = task_ind
                found = True
                break

        if found:

            tasks = rider["tasks"]
            tasks.remove(rem_task_ind)
            tasks[task_ind]["route_steps"], tasks[task_ind]["route_polyline"] , tasks[task_ind]["time_taken"]  = utils.get_route(tasks, task_ind-1, task_ind)
            if task_ind > 0:
                tasks[task_ind-1]["time_next"] = tasks[task_ind]["time_taken"]

            riders_db.update_one({"rider_id": rider["rider_id"]}, {
                "$set": {
                    "tasks": tasks
                }
            })

            break