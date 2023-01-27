from typing import List
import serializers
from models import Task

def task_serializer(task: Task) -> dict :
    
    task = serializers.serialize_object(task)

    return {
        "item_id": task["item_id"],
        "task_type": task["task_type"],
        "awb_id": task["awb_id"],
        "task_location": serializers.location_serializer(task["task_location"]),
        "time_next": task["time_next"],
        "dist_next": task["dist_next"]
    }


def tasks_serializer(tasks: List[Task]) -> list:
    return [task_serializer(task) for task in tasks]
