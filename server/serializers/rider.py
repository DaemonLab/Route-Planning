from typing import List

from models import  Rider



def rider_serializer(rider : Rider) -> dict :
    return {
        "rider_id" : rider["rider_id"],
        "name" : rider["name"],
        "age" : rider["age"],
        "bag_volume" : rider["bag_voume"],
        "current_location" : rider["current_location"],
        "current_route" : rider["current_route"],
        "current_index" : rider["current_index"],
        "route_information" : rider["route_information"],
        "tasks" : rider["tasks"]
    }


def riders_serializer(riders: List[Rider]) -> list:
    return [rider_serializer(rider) for rider in riders]
