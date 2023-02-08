from typing import List

from models import Task, RouteStep
import serializers

def task_serializer(task: Task) -> dict :

    if task is None:
        return task
    
    task = serializers.serialize_object(task)

    return {
        "item_id": task["item_id"],
        "awb_id": task["awb_id"],
        "task_type": task["task_type"],
        "volume": task["volume"],
       
        "task_location": serializers.location_serializer(task["task_location"]),
        "edd": task["edd"],
        
        "route_steps": serializers.route_steps_serializer(task["route_steps"]),
        "route_polyline": serializers.route_locations_serializer(task["route_polyline"]),
        "time_taken": task["time_taken"],
        "time_next": task["time_next"]
    }


def tasks_serializer(tasks: List[Task]) -> list:
    return [task_serializer(task) for task in tasks]
