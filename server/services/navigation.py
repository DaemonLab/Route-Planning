import serializers
import services
from database import item_db, rider_db
from fastapi import HTTPException
from models import Item, Rider
from typing import List
import subprocess
import datetime

def rider_update():
    print("Updating Rider Location")

def dispatch():

    items  = serializers.items_serializer(item_db.find())
    riders = serializers.riders_serializer(rider_db.find())

    num_items  = len(items)
    num_riders = len(riders)

    dist = services.get_distance_matrix(items,num_items)

    f = open("./algorithm/input.in", "w")

    print(num_items,file=f)

    for i in range(num_items+1):
        for j in range(num_items+1):
            if i==j :
                continue
            print(dist[i][j],file=f)

    for item in items:
        print(int(item['volume']),file=f)

    for item in items:
        print(int(item['weight']),file=f)
        # print(str(item['edd']),file=f)

    print(num_riders,file=f)

    for rider in riders:
        print(int(rider['bag_volume']),file=f)

    f.close()

    subprocess.call("algorithm\dispatch.exe",shell=True) 

    f = open("./algorithm/output.out", "r")

    deliveries = dict()

    for i in range(num_riders):

        order = []

        while(True):
            
            result = int(f.readline())

            if result==-1:
                break

            #Items order obtained from algorithm is 1-indexed
            #We convert it to zero-indexed
            
            order.append(result-1)

        deliveries[i] = order

    print(deliveries)



    return {"done" : str(deliveries)}

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

