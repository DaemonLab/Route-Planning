from fastapi import HTTPException
from datetime import datetime as dt
from subprocess import Popen, PIPE
from typing import List

from models import Item,  LocationDetail
from database import items_db, riders_db, clock_db , location_details_db
import serializers
import utils

iter = 0


def add_locations(location_details: List[LocationDetail]) -> dict:
    try:
        location_details = serializers.location_details_serializer(location_details)

        location_details.append(utils.WAREHOUSE_LOCATION_DETAIL)
    
        for location_detail in location_details:
            location_detail["lat"] , location_detail["lng"] = utils.geocode(location_detail["awb_id"],location_detail["address"])

        location_details_db.insert_many(location_details)
        
        return {"success": True, "message": "Locations Added Successfully!"}
    except Exception as E:
        print(E)
        return HTTPException(status_code=404, detail=f"Could Not Process Add Locations")

def dispatch():

    try:

        items = serializers.items_serializer(items_db.find())
        riders = serializers.riders_serializer(riders_db.find())

        clock = serializers.clock_serializer(clock_db.find_one())
        day_start = clock["day_start"]

        num_items = len(items)
        num_riders = len(riders)

        time_adj = utils.get_delivery_time_matrix(items, num_items)

        program_path = "./algorithm/dispatch_test_win.exe"

        p = Popen(program_path, stdout=PIPE, stdin=PIPE,  encoding='utf8')

        p.stdin.write(str(num_items)+'\n')

        for i in range(num_items+1):
            for j in range(num_items+1):
                if i == j:
                    continue
                p.stdin.write(str(time_adj[i][j])+'\n')

        for item in items:
            p.stdin.write(str(int(item['volume']))+'\n')

        for item in items:
            edd_time_simult = item["edd"]
            edd_time_algthm = (edd_time_simult - day_start).total_seconds()
            p.stdin.write(str(int(edd_time_algthm))+'\n')

        location_detail = (serializers.location_detail_serializer(location_details_db.find_one({"awb_id": utils.WAREHOUSE_LOCATION_DETAIL["awb_id"]}))) 
        p.stdin.write(str(location_detail["lat"])+'\n')
        p.stdin.write(str(location_detail["lng"])+'\n')

        for item in items:
            awb_id = item["awb_id"]
            location_detail = (serializers.location_detail_serializer(location_details_db.find_one({"awb_id": awb_id}))) 
            p.stdin.write(str(location_detail["lat"])+'\n')
            p.stdin.write(str(location_detail["lng"])+'\n')

        areas = []

        areas.append(utils.WAREHOUSE_LOCATION_DETAIL["area"])
        p.stdin.write(str(1)+'\n')

        for item in items:
            awb_id = item["awb_id"]
            area = (serializers.location_detail_serializer(location_details_db.find_one({"awb_id": awb_id})))["area"]
            
            if area not in areas:
                areas.append(area)
            p.stdin.write(str(int(areas.index(area))+1)+'\n')
            
        

        p.stdin.write(str(num_riders)+'\n')

        for rider in riders:
            p.stdin.write(str(int(rider['bag_volume']))+'\n')

        p.stdin.flush()

        deliveries = dict()

        for i in range(num_riders):

            order = []

            while True:

                result = int(p.stdout.readline().strip())

                if result == -1:
                    break

                order.append(result-1)

            deliveries[i] = order

        print(deliveries)

        for i in range(num_riders):

            delivery_items = [items[j] for j in deliveries[i]]

            tasks = []

            bag_volume = riders[i]["bag_volume"]

            for item in delivery_items:

                tasks.append({
                    "item_id": item["item_id"],
                    "volume": item["volume"],
                    "task_type": "Delivery",
                    "edd": item["edd"],
                    "awb_id": item["awb_id"],
                    "task_location": item["task_location"],
                    "time_next": 0
                })

                bag_volume-=item["volume"]

            for delivery_ind in range(len(deliveries[i])):

                item_num_1 = (deliveries[i][delivery_ind] + 1)
                item_num_2 = (deliveries[i][delivery_ind+1] + 1) if (delivery_ind+1) < len(deliveries[i]) else 0

                tasks[delivery_ind]["time_next"] = int(time_adj[item_num_1][item_num_2])

            if len(tasks) > 0:
                current_route, route_details, route_polyline = utils.get_route(tasks, -1, 0)
                tasks.append(utils.WAREHOUSE_TASK)
            else:
                current_route, route_details, route_polyline = [], [], []

            current_location = {"lat":utils.WAREHOUSE_LOCATION_DETAIL["lat"], "lng":utils.WAREHOUSE_LOCATION_DETAIL["lng"]}
            route_index = 0
            task_index = 0

            riders_db.update_one({"rider_id": riders[i]["rider_id"]}, {
                "$set": {
                    "bag_volume": bag_volume,
                    "current_location": serializers.route_location_serializer(current_location),
                    "current_route": serializers.route_locations_serializer(current_route),
                    "route_details": serializers.route_details_serializer(route_details),
                    "route_polyline": serializers.route_locations_serializer(route_polyline),
                    "route_index": route_index,
                    "tasks": serializers.tasks_serializer(tasks),
                    "task_index": task_index
                }
            })


        return {"success": True, "message": "Dispatched Successfully!"}

    except Exception as E:
        print(E)
        return {"success": False}


def update_rider_location():

    try:
        global iter
        print("Updating Riders",iter)
        iter+=1

        riders = serializers.riders_serializer(riders_db.find())

        clock = serializers.clock_serializer(clock_db.find_one())
        day_start = clock["day_start"]
        clock_start = clock["clock_start"]

        found = False

        for rider in riders:

            time_delta = 1

            if rider["task_index"] >= len(rider["tasks"]):
                continue

            found = True

            while (rider["route_index"] < len(rider["route_details"])):

                if (time_delta >= rider["route_details"][rider["route_index"]]["time_taken"]):
                    time_delta -= rider["route_details"][rider["route_index"]]["time_taken"]
                    rider["route_details"][rider["route_index"]]["time_taken"] = 0
                    rider["route_index"] += 1
                    rider["current_location"] = rider["current_route"][rider["route_index"]]

                else:
                    rider["route_details"][rider["route_index"]]["time_taken"] -= time_delta
                   
                    rider["current_location"] = rider["route_polyline"][rider["route_details"][rider["route_index"]]['polyline_index']]

                    if rider["route_details"][rider["route_index"]]['polyline_index'] < rider["route_details"][rider["route_index"]]['to_index']:
                        rider["route_details"][rider["route_index"]]['polyline_index']+=1
                    
                    break

            if rider["route_index"] == len(rider["route_details"]):

                
                task_completion_actual = dt.strptime(dt.now().strftime("%d-%m-%Y %H:%M:%S") , "%d-%m-%Y %H:%M:%S")
                task_completion_simult = day_start + (task_completion_actual - clock_start)

                task_edd = rider["tasks"][rider["task_index"]]["edd"]

                print("Task Completed")

                items_db.update_one({"item_id": rider["tasks"][rider["task_index"]]["item_id"]}, {
                    "$set": {
                        "is_completed": True,
                        "completion_time": task_completion_simult
                    }
                })

                rider["bag_volume"] = rider["bag_volume"] + (rider["tasks"][rider["task_index"]]["volume"])*(1 if rider["tasks"][rider["task_index"]]["task_type"] == "Delivery" else -1)

                rider["current_route"], rider["route_details"], rider["route_polyline"] = utils.get_route(
                    rider["tasks"], rider["task_index"], rider["task_index"]+1)
                rider["route_index"] = 0

                rider["task_index"] = rider["task_index"] + 1

            riders_db.update_one({"rider_id": rider["rider_id"]}, {
                "$set": {
                    "bag_volume": rider["bag_volume"],
                    "current_location": rider["current_location"],
                    "current_route": rider["current_route"],
                    "route_details": rider["route_details"],
                    "route_polyline": rider["route_polyline"],
                    "route_index": rider["route_index"],
                    "task_index": rider["task_index"]
                }
            })

        if not found:
            print("Riders Finished")

        return {"success": True, "message": "Updated Successfully!"}



    except Exception as E:
        print(E)
        return {"success": False, "message": E}


def insert_pickup(rider_id, tasks, after_task_index, item, times_from_pickup):

    tasks[after_task_index]["time_next"] = int(times_from_pickup[rider_id][after_task_index])

    pickup_task = dict({
        "item_id": item["item_id"],
        "volume": item["volume"],
        "task_type": "Pickup",
        "edd": item["edd"],
        "awb_id": item["awb_id"],
        "task_location": item["task_location"],
        "time_next": int(times_from_pickup[rider_id][after_task_index+1])
    })

    tasks.insert(after_task_index+1, pickup_task)

    return tasks

def add_pickup_item(item: Item):

    print("Adding pickup",item)

    try:

        item = serializers.item_serializer(item)

        location_detail = {
            'address': item['task_location']['address'],
            'area': '',
            'awb_id': item['awb_id'],
            'lat': 0.0,
            'lng': 0.0,
            'item_id': item['item_id']
        }
        location_detail["lat"] , location_detail["lng"] = utils.geocode(location_detail["awb_id"],location_detail["address"])
        item["task_location"]["lat"], item["task_location"]["lng"] = location_detail["lat"] , location_detail["lng"]
        
        location_details_db.insert_one(serializers.location_detail_serializer(location_detail))
        items_db.insert_one(item)


        riders = serializers.riders_serializer(riders_db.find())
        valid_riders = [rider for rider in riders if rider["task_index"] <= (len(rider["tasks"]) - 2)]

        clock = serializers.clock_serializer(clock_db.find_one())
        day_start = clock["day_start"]
        clock_start = clock["clock_start"]
        pickup_add_time_actual = dt.strptime(dt.now().strftime("%d-%m-%Y %H:%M:%S"), "%d-%m-%Y %H:%M:%S")
        pickup_add_time_algthm = (pickup_add_time_actual - clock_start).total_seconds()

        if len(valid_riders) == 0:
            return {"success": False, "message": "Cannot Be Inserted"}

        program_path = "./algorithm/pickup_win.exe"
        p = Popen(program_path, stdout=PIPE, stdin=PIPE,  encoding='utf8')

        current_time = pickup_add_time_algthm
        p.stdin.write(str(int(current_time))+'\n')

        p.stdin.write(str(int(item["volume"]))+'\n')

        item_entry_time = current_time
        p.stdin.write(str(int(item_entry_time))+'\n')

        num_riders = len(valid_riders)
        p.stdin.write(str(num_riders)+'\n')

        for rider in valid_riders:
            p.stdin.write(str(int(rider["bag_volume"]))+'\n')

        times_from_pickup = utils.get_pickup_time_matrix(valid_riders, item)

        for rider in valid_riders:

            num_tasks = len(rider["tasks"]) - rider["task_index"]
            p.stdin.write(str(num_tasks)+'\n')

            for task_index in range(rider["task_index"], rider["task_index"] + num_tasks):

                item_volume = rider["tasks"][task_index]["volume"]
                task_type = (0 if rider["tasks"][task_index]["task_type"] == "Delivery" else 1)
                edd = (rider["tasks"][task_index]["edd"] - day_start).total_seconds()
                time_next = rider["tasks"][task_index]["time_next"]
                time_from_pickup = times_from_pickup[rider["rider_id"]][task_index]


                p.stdin.write(str(int(item_volume))+'\n')
                p.stdin.write(str(task_type)+'\n')
                p.stdin.write(str(int(edd))+'\n')
                p.stdin.write(str(time_next)+'\n')
                p.stdin.write(str(time_from_pickup)+'\n')


        p.stdin.flush()

        rider_ind = int(p.stdout.readline().strip())
        after_task_index = int(p.stdout.readline().strip()) + valid_riders[rider_ind]["task_index"]

        print(rider_ind, after_task_index)

        tasks = valid_riders[rider_ind]["tasks"]
        valid_riders[rider_ind]["tasks"] = insert_pickup(valid_riders[rider_ind]["rider_id"], tasks, after_task_index, item, times_from_pickup)

        riders_db.update_one({"rider_id": valid_riders[rider_ind]["rider_id"]}, {
            "$set": {
                "tasks": valid_riders[rider_ind]["tasks"]
            }
        })

        return {"success": True, "message": "Assigned Pickup Successfully!"}

    except Exception as E:
        print(E)
        return {"success": False, "message": E}
