from typing import List
import serializers
from models import  Item

def item_serializer(item : Item) -> dict :
    
    item = serializers.serialize_object(item)

    return {
        "item_id" : item["item_id"],
        "name" : item["name"],
        "description" : item["description"],
        "task_type" : item["task_type"],
        "is_completed" : item["is_completed"],

        "volume" : item["volume"],
        "weight" : item["weight"],
        
        "awb_id" : item["awb_id"],
        "task_location" : serializers.location_serializer(item["task_location"]),
        "scan_time" : item["scan_time"],
        "edd" : item["edd"]
    }


def items_serializer(items: List[Item]) -> list:
    return [item_serializer(item) for item in items]
