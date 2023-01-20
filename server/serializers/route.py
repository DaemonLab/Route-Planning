from typing import List
import serializers
from models import  Location, RouteDetail

def location_serializer(location: Location) -> dict :
    
    location = serializers.serialize_object(location)

    return {
        "address": location["address"],
        "lat": location["lat"],
        "lng": location["lng"]
    }

def locations_serializer(locations: List[Location]) -> list:
    return [location_serializer(location) for location in locations]

def route_detail_serializer(route_detail: RouteDetail) -> dict:

    route_detail = serializers.serialize_object(route_detail)

    return {
        "time_taken": route_detail["time_taken"],
        "distance": route_detail["distance"],
        "speed_limit": route_detail["speed_limit"],
        "instruction": route_detail["instruction"]
    }

def route_details_serializer(route_details: List[RouteDetail]) -> list:
    return [route_detail_serializer(route_detail) for route_detail in route_details]