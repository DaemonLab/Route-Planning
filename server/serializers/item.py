from typing import List

from models import Item, PickupItems
import serializers


def item_serializer(item: Item) -> dict:

    if item is None:
        return item

    item = serializers.serialize_object(item)

    return {
        "item_id": item["item_id"],
        "name": item["name"],
        "description": item["description"],
        "task_type": item["task_type"],

        "volume": item["volume"],
        "weight": item["weight"],

        "awb_id": item["awb_id"],
        "task_location": serializers.location_serializer(item["task_location"]),
        "scan_time": item["scan_time"],
        "edd": item["edd"]
    }


def items_serializer(items: List[Item]) -> list:
    return [item_serializer(item) for item in items]


def pickup_items_serializer(pickupItems: PickupItems) -> dict:

    if pickupItems is None:
        return pickupItems

    pickupItems = serializers.serialize_object(pickupItems)

    return {
        'items': serializers.items_serializer(pickupItems['items']),
        'num_hours': pickupItems['num_hours']
    }