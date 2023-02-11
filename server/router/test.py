from fastapi import APIRouter
from database import items_db, riders_db
import serializers
import json
import random

router = APIRouter(prefix="/test", tags=["Test"])


@router.get("/reset")
def reset():
    items_db.delete_many({})
    riders_db.delete_many({})
    return {'success': True}

@router.get("/download/{count_num}")
def download(count_num: int):
    try:
        riders = serializers.riders_serializer(riders_db.find({}))
        with open(f"./utils/riders_{count_num}.json", "w") as outfile:
            json.dump(riders, outfile)
        return {'success': True}
    except Exception as E:
        print(E)
        return {'success': False}

@router.get("/metrics")
def metrics():
    try:
        items = serializers.items_serializer(items_db.find({}))
        riders = serializers.riders_serializer(riders_db.find({}))

        num_orders = len(items)
        num_riders = len(riders)

        total_distance = 0
        total_time = 0

        num_tasks = []

        for rider in riders:
            distance_rider = 0
            time_rider = 0
            num_tasks.append(len(rider["tasks"]))
            for task in rider["tasks"]:
                for route_step in task["route_steps"]:
                    distance_rider+=route_step["distance"]
                    time_rider+=route_step["time_taken"]
            total_distance+=distance_rider
            total_time+=time_rider

        num_tasks.sort()

        avg_distance = (total_distance)/num_riders
        avg_time = (total_time)/num_riders

        return {'success': True}
    except Exception as E:
        print(E)
        return {'success': False}
