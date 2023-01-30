from typing import List
import serializers
from models import  Location, RouteLocation, RouteDetail

def location_serializer(location: Location) -> dict:
    
    if location is None:
        return location
    
    location = serializers.serialize_object(location)

    return {
        "address": location["address"],
        "lat": location["lat"],
        "lng": location["lng"]
    }

def locations_serializer(locations: List[Location]) -> list:
    return [location_serializer(location) for location in locations]

def route_location_serializer(route_location: RouteLocation):

    if route_location is None:
        return route_location

    route_location = serializers.serialize_object(route_location)

    return {
        "lat": route_location["lat"],
        "lng": route_location["lng"]
    }

def route_locations_serializer(route_locations: List[RouteLocation]) -> list:
    return [route_location_serializer(route_location) for route_location in route_locations]

def route_detail_serializer(route_detail: RouteDetail) -> dict:

    if route_detail is None:
        return route_detail

    route_detail = serializers.serialize_object(route_detail)

    return {
        "time_taken": route_detail["time_taken"],
        "distance": route_detail["distance"],
        "speed_limit": route_detail["speed_limit"],
        "instruction": route_detail["instruction"]
    }

def route_details_serializer(route_details: List[RouteDetail]) -> list:
    return [route_detail_serializer(route_detail) for route_detail in route_details]