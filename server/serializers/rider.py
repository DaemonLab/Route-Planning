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
        
        "current_location": serializers.route_location_serializer(rider["current_location"]),
        "current_route": serializers.route_locations_serializer(rider["current_route"]),
        "route_details":  serializers.route_details_serializer(rider["route_details"]),
        "route_polyline": serializers.route_locations_serializer(rider["route_polyline"]),
        "route_index": rider["route_index"],
        
        "tasks" : serializers.tasks_serializer(rider["tasks"]),
        "task_index": rider["task_index"]
    }


def riders_serializer(riders: List[Rider]) -> list:
    return [rider_serializer(rider) for rider in riders]
