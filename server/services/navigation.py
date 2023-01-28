import serializers
import services
from database import item_db, rider_db
from fastapi import HTTPException
from models import Item, Rider
from typing import List
import subprocess
import datetime
from pathlib import Path
from subprocess import Popen, PIPE

def rider_update():
    print("Updating Rider Location")

def dispatch():

    items  = serializers.items_serializer(item_db.find())
    riders = serializers.riders_serializer(rider_db.find())

    num_items  = len(items)
    num_riders = len(riders)

    time_adj = services.get_time_matrix(items,num_items)

    program_path = "./algorithm/dispatch_win.exe"

    p = Popen(program_path, stdout=PIPE, stdin=PIPE ,  encoding='utf8')

    p.stdin.write(str(num_items)+'\n')

    for i in range(num_items+1):
        for j in range(num_items+1):
            if i==j :
                continue
            p.stdin.write(str(time_adj[i][j])+'\n')

    for item in items:
        p.stdin.write(str(int(item['volume']))+'\n')

    for item in items:
        p.stdin.write(str(int(item['weight']))+'\n')
        # print(str(item['edd']),file=f)

    p.stdin.write(str(num_riders)+'\n')

    for rider in riders:
        p.stdin.write(str(int(rider['bag_volume']))+'\n')

    p.stdin.flush()

    deliveries = dict()

    for i in range(num_riders):

        order = []

        while True:
            
            result = int(p.stdout.readline().strip())

            if result==-1:
                break
            
            order.append(result-1)

        deliveries[i] = order

    for i in range(num_riders):

        delivery_items = [items[j] for j in deliveries[i]]

        tasks = [] 
        
        for item in delivery_items:
            tasks.append({
                "item_id": item["item_id"],
                "task_type": "Delivery",
                "awb_id": item["awb_id"],
                "task_location": item["task_location"],
                "time_next": 0
            }) 

        for delivery_ind in range(len(deliveries[i])):

            item_num_1 = deliveries[i][delivery_ind] + 1
            item_num_2 = deliveries[i][delivery_ind+1] if (delivery_ind+1)<len(deliveries[i]) else 0

            tasks[delivery_ind]["time_next"] = time_adj[item_num_1][item_num_2]

        if len(tasks)>0:
            current_route , route_details = services.get_route(tasks,-1,0)
            tasks.append({"warehouse task"})
        else:
            current_route , route_details = [] , []

        current_location = "warehoue location"
        route_index = 0
        task_index = 0

        #update rider in database
        

    return {"done":str(deliveries)}

def update_rider_location(time_delta=5):

    riders = serializers.riders_serializer(rider_db.find())

    for rider in riders:

        current_route = rider["current_route"]
        route_details = rider["route_details"]
        route_index   = rider["route_index"]

        tasks = rider["tasks"]
        task_index  = rider["task_index"]

        if task_index >= len(tasks):
            continue

        while (route_index < len(route_details)):

            if (time_delta >= route_details[route_index]["time_taken"]):
                time_delta -= route_details[route_index]["time_taken"]
                route_details[route_index]["time_taken"] = 0
                route_index += 1

            else:
                route_details[route_index]["time_taken"] -= time_delta
                break

        if route_index == len(route_details):

            rider["current_location"] = current_route[route_index]
            
            rider["current_route"] , rider["route_details"] = services.get_route(tasks,task_index,task_index+1)
            rider["route_index"] = 0
            
            rider["task_index"] = task_index + 1

            rider_db.update_one({"rider_id": rider["rider_id"]}, {
                                  "$set": {
                                      "current_location": rider["current_location"],
                                      "current_route": rider["current_route"],
                                      "route_details": rider["route_details"],
                                      "route_index": rider["route_index"],
                                      "task_index": rider["task_index"]
                                  }
                                })

    return {"updated":"True"}

def add_pickup_item(item: Item):

    riders = serializers.riders_serializer(rider_db.find())
    valid_riders = [rider for rider in riders if rider["task_ind"] <= (len(rider["tasks"]) - 2)]

    program_path = "./algorithm/pickup_win.exe"
    p = Popen(program_path, stdout=PIPE, stdin=PIPE ,  encoding='utf8')

    current_time = 0
    p.stdin.write(str(current_time)+'\n')
   
    p.stdin.write(str(int(item["volume"]))+'\n')

    item_entry_time = current_time
    p.stdin.write(str(item_entry_time)+'\n')

    
    num_riders = len(valid_riders)
    p.stdin.write(str(num_riders)+'\n') 

    for rider in valid_riders:
        p.stdin.write(str(int(rider["bag_volume"]))+'\n')

    for rider in valid_riders:

        num_tasks = len(rider["tasks"]) - rider["task_ind"] + 1
        p.stdin.write(str(num_tasks)+'\n')

        for i in range(rider["task_ind"],rider["task_ind"] + num_tasks):

            item_volume = 0 #Get item_volume for rider["tasks"][i]["item_id"] from database
            task_type = (0 if rider["tasks"][i]["task_type"]=="Delivery" else 1)
            edd = 0 #Get edd for rider["tasks"][i]["item_id"] from database
            time_next = rider["tasks"][i]["time_next"]
            time_from_pickup = services.get_time(rider["tasks"][i]["task_location"],item["task_location"])

            p.stdin.write(str(item_volume)+'\n')
            p.stdin.write(str(task_type)+'\n')
            p.stdin.write(str(edd)+'\n')
            p.stdin.write(str(time_next)+'\n')
            p.stdin.write(str(time_from_pickup)+'\n')

    rider_ind =  int(p.stdout.readline().strip())
    after_task_ind = int(p.stdout.readline().strip())

    tasks = valid_riders[rider_ind]["tasks"]

    tasks , task_ind = services.insert_pickup(tasks,after_task_ind,item)

    #Update rider in database