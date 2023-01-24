import serializers
from database import item_db, rider_db
from fastapi import HTTPException
from models import Item, Rider
from typing import List

def rider_update():
    print("Updating Rider Location")

# https://stackoverflow.com/questions/65408371/how-to-use-python-to-input-to-and-get-output-from-c-program


def dispatch():
    try:

        items = item_db.find()
        riders = rider_db.find()
        # Run algorithm and assign deliveries to riders

    except:
        return 0

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

