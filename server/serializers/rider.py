from typing import List
import serializers
from models import  Rider



def rider_serializer(rider : Rider) -> dict :

    rider = serializers.serialize_object(rider)

    return {
        "rider_id": rider["rider_id"],
        "name": rider["name"],
        "age": rider["age"],
        "bag_volume" : rider["bag_volume"],
        "current_location": serializers.location_serializer(rider["current_location"]),
        "current_route": serializers.locations_serializer(rider["current_route"]),
        "current_index": rider["current_index"],
        "route_details":  serializers.route_details_serializer(rider["route_details"]),
        "tasks" : serializers.tasks_serializer(rider["tasks"])
    }


def riders_serializer(riders: List[Rider]) -> list:
    return [rider_serializer(rider) for rider in riders]
