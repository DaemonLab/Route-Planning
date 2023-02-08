from typing import List

from models import  Rider
import serializers



def rider_serializer(rider : Rider) -> dict :

    if rider is None:
        return rider

    rider = serializers.serialize_object(rider)

    return {
        "rider_id": rider["rider_id"],
        "name": rider["name"],
        "age": rider["age"],
        "bag_volume" : rider["bag_volume"],
        
        "tasks" : serializers.tasks_serializer(rider["tasks"]),
        "task_index": rider["task_index"]
    }


def riders_serializer(riders: List[Rider]) -> list:
    return [rider_serializer(rider) for rider in riders]
