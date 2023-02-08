from typing import List

from models import  Location, RouteLocation, RouteStep , LocationDetail
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

def route_step_serializer(route_step: RouteStep) -> dict:

    if route_step is None:
        return route_step

    route_step = serializers.serialize_object(route_step)

    return {
        "distance": route_step["distance"],
        "time_taken": route_step["time_taken"],
        "instruction": route_step["instruction"],
        "polyline": route_locations_serializer(route_step["polyline"])
    }

def route_steps_serializer(route_steps: List[RouteStep]) -> list:
    return [route_step_serializer(route_step) for route_step in route_steps]

def location_detail_serializer(location_detail: LocationDetail) -> dict:

    if location_detail is None:
        return location_detail

    location_detail = serializers.serialize_object(location_detail)

    return {
        "address": location_detail["address"],
        "area": location_detail["area"],
        "awb_id": location_detail["awb_id"],
        "lat": location_detail["lat"],
        "lng": location_detail["lng"],
        "item_id": location_detail["item_id"]
    }

def location_details_serializer(location_details: List[LocationDetail]) -> list:
    return [location_detail_serializer(location_detail) for location_detail in location_details]