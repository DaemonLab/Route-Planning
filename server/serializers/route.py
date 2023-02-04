from typing import List

from models import  Location, RouteLocation, RouteDetail , LocationDetail
import serializers

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

def location_detail_serializer(location_detail: LocationDetail) -> dict:

    if location_detail is None:
        return location_detail

    location_detail = serializers.serialize_object(location_detail)

    return {
        "address": location_detail["address"],
        "area": location_detail["area"],
        "awb_id": location_detail["awb_id"],
        "lat": location_detail["lat"],
        "lng": location_detail["lng"]
    }

def location_details_serializer(location_details: List[LocationDetail]) -> list:
    return [location_detail_serializer(location_detail) for location_detail in location_details]