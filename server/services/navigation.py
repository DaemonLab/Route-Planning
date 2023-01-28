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
import numpy as np
import json
import math

def rider_update():
    print("Updating Rider Location")

def dispatch():

    try:

        items  = serializers.items_serializer(item_db.find())
        riders = serializers.riders_serializer(rider_db.find())

        num_items  = len(items)
        num_riders = len(riders)

        time_adj = services.get_delivery_time_matrix(items,num_items)

        program_path = "./algorithm/dispatch_win.exe"        
        # program_path = "./algorithm/dispatch_linux"

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

        dispatched_riders = []

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

                item_num_1 = (deliveries[i][delivery_ind] + 1)
                item_num_2 = (deliveries[i][delivery_ind+1] + 1) if (delivery_ind+1)<len(deliveries[i]) else 0

                tasks[delivery_ind]["time_next"] = time_adj[item_num_1][item_num_2]

            if len(tasks)>0:
                current_route , route_details = services.get_route(tasks,-1,0)
                tasks.append({"warehouse task"})
            else:
                current_route , route_details = [] , []

            current_location = "warehoue location"
            route_index = 0
            task_index = 0

            dispatched_riders.append({
                "rider_id": riders[i]["rider_id"],
                "current_location": current_location,
                "current_route": current_route,
                "route_details": route_details,
                "route_index": route_index,
                "tasks": tasks,
                "task_index": task_index
            })

            #update rider in database
        
        response = dict()
        response["time_adj"] = str(time_adj)
        response["deliveries_assigned"] = str(deliveries)
        response["dispatched_riders"] = str(dispatched_riders)

        return {"response": response}
    
    except Exception as E:
        print(E)
        return {"error": E}

def update_rider_location(time_delta=5):
    
    print("Updating")

    riders = serializers.riders_serializer(rider_db.find())


    for rider in riders:

        time_delta = 5

        if  rider["task_index"] >= len(rider["tasks"]):
            continue

        while (rider["route_index"] < len(rider["route_details"])):

            if (time_delta >= rider["route_details"][rider["route_index"]]["time_taken"]):
                time_delta -= rider["route_details"][rider["route_index"]]["time_taken"]
                rider["route_details"][rider["route_index"]]["time_taken"] = 0
                rider["route_index"] += 1
                rider["current_location"] = rider["current_route"][rider["route_index"]]

            else:
                rider["route_details"][rider["route_index"]]["time_taken"] -= time_delta
                break

        if rider["route_index"] == len(rider["route_details"]):

            rider["bag_volume"] = 4 #Update volume from DB
            
            rider["current_route"] , rider["route_details"] = services.get_route(rider["tasks"],rider["task_index"],rider["task_index"]+1)
            rider["route_index"] = 0
            
            rider["task_index"] = rider["task_index"] + 1

        rider_db.update_one({"rider_id": rider["rider_id"]}, {
                                  "$set": {
                                        "bag_volume": rider["bag_volume"],
                                        "current_location": rider["current_location"],
                                        "current_route": rider["current_route"],
                                        "route_details": rider["route_details"],
                                        "route_index": rider["route_index"],
                                        "task_index": rider["task_index"]
                                }
        })

    return {"updated":"True"}

def insert_pickup(rider_id,tasks,after_task_index,item,times_from_pickup):
    
    tasks[after_task_index]["time_next"]   = times_from_pickup[rider_id][after_task_index]

    pickup_task = dict({
        "item_id": item["item_id"],
        "task_type": "Pickup",
        "awb_id": item["awb_id"],
        "task_location": item["task_location"],
        "time_next": times_from_pickup[rider_id][after_task_index+1]
    })

    tasks.insert(after_task_index+1,pickup_task)

    return tasks

def add_pickup_item(item: Item):

    try:

        item = serializers.item_serializer(item)

        

        riders = serializers.riders_serializer(rider_db.find())
        valid_riders = [rider for rider in riders if rider["task_index"] <= (len(rider["tasks"]) - 2)]

        if len(valid_riders) == 0:
            return {"message": "Cannot be inserted"}

        # program_path = "./algorithm/pickup_win.exe"
        program_path = "./algorithm/pickup_linux"
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

        times_from_pickup = services.get_pickup_time_matrix(valid_riders,item) #times_from_pickup["rider_id"][task_index]
        
        for rider in valid_riders:

            num_tasks = len(rider["tasks"]) - rider["task_index"]
            p.stdin.write(str(num_tasks)+'\n')

            for task_index in range(rider["task_index"],rider["task_index"] + num_tasks):

                item_volume = 0 #Get item_volume for rider["tasks"][i]["item_id"] from database
                task_type = (0 if rider["tasks"][task_index]["task_type"]=="Delivery" else 1)
                edd = 0 #Get edd for rider["tasks"][i]["item_id"] from database
                time_next = rider["tasks"][task_index]["time_next"]
                time_from_pickup = times_from_pickup[rider["rider_id"]][task_index]

                p.stdin.write(str(item_volume)+'\n')
                p.stdin.write(str(task_type)+'\n')
                p.stdin.write(str(edd)+'\n')
                p.stdin.write(str(time_next)+'\n')
                p.stdin.write(str(time_from_pickup)+'\n')

                

        p.stdin.flush()

        rider_ind =  int(p.stdout.readline().strip())
        after_task_index = int(p.stdout.readline().strip()) + valid_riders[rider_ind]["task_index"]

        tasks = valid_riders[rider_ind]["tasks"]
        valid_riders[rider_ind]["tasks"]  = insert_pickup(valid_riders[rider_ind]["rider_id"],tasks,after_task_index,item,times_from_pickup)

        response = dict()
        response["times_from_pickup"] = (times_from_pickup)
        response["pair_ans"] = ({"rider_id":valid_riders[rider_ind]["rider_id"],"rider_ind":rider_ind,"after_task":after_task_index})
        response["final_riders"] = (valid_riders)
        

        #Update rider in database

        return {"response":(response)}

    except Exception as E:
        print(E)
        return {"error":E}

    