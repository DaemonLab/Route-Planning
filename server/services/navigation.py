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

    dist = services.get_distance_matrix(items,num_items)

    # program_path = "./algorithm/dispatch_win.exe"
    program_path = "./algorithm/dispatch_linux"

    p = Popen(program_path, stdout=PIPE, stdin=PIPE ,  encoding='utf8')

    p.stdin.write(str(num_items)+'\n')

    for i in range(num_items+1):
        for j in range(num_items+1):
            if i==j :
                continue
            p.stdin.write(str(dist[i][j])+'\n')

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
            
            order.append(result)

        deliveries[i] = order

    print(deliveries)

    return {"done":str(deliveries)}

def assign_pickup_items(free_riders,pickup_items):
  #Run algorithm and assign pickups to riders
  return 0

def update_rider_location(time_delta=5):

    riders = serializers.riders_serializer(rider_db.find())

    free_riders  = []
    pickup_items = item_db.find({"task_type": "Deliver", "is_completed": False})

    for rider in riders:

        current_index = rider["current_index"]
        route_details = rider["route_details"]

        while (current_index < len(route_details)):

            if (time_delta >= route_details[current_index]["time_taken"]):
                time_delta -= route_details[current_index]["time_taken"]
                route_details[current_index]["time_taken"] = 0
                current_index += 1

            else:
                route_details[current_index]["time_taken"] -= time_delta
                break

        if current_index == len(route_details):

            rider["current_location"] = rider["current_route"][current_index]
            rider["current_route"] = []
            rider["current_index"] = 0
            rider["route_details"] = []
            rider["tasks"].pop(0)

            free_riders.append(rider) 

            rider_db.update_one({"rider_id": rider["rider_id"]}, {
                                  "$set": {
                                      "current_location": rider["current_location"],
                                      "current_route": rider["current_route"],
                                      "current_index": rider["current_index"],
                                      "route_details": rider["route_details"],
                                      "tasks": rider["tasks"]
                                  }
                                })
    
    assign_pickup_items(free_riders,pickup_items)

