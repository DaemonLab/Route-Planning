from typing import List

from models import Task
import serializers

def task_serializer(task: Task) -> dict :

    if task is None:
        return task
    
    task = serializers.serialize_object(task)

    return {
        "item_id": task["item_id"],
        "volume": task["volume"],
        "task_type": task["task_type"],
        "edd": task["edd"],
        "awb_id": task["awb_id"],
        "task_location": serializers.location_serializer(task["task_location"]),
        "time_next": task["time_next"]
    }


def tasks_serializer(tasks: List[Task]) -> list:
    return [task_serializer(task) for task in tasks]
