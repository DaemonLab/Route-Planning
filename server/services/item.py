from fastapi import HTTPException
from datetime import datetime as dt
from typing import List
import random

from models import Item
from database import items_db , clock_db , location_details_db
import serializers

def get_item(item_id: str):
    try:
        item = serializers.item_serializer(items_db.find_one({"item_id": item_id}))

        if item is None:
            raise HTTPException(status_code=404, detail="Item Not Found")

        return {"item": item}

    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get Item")


def get_items() -> dict:
    try:
        items = serializers.items_serializer(items_db.find())
        return {"items": items}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get Items")


def mock_assign(items: List[Item]) -> List[Item]:

    location_details = serializers.location_details_serializer(location_details_db.find())

    for item_ind in range(len(items)):
        
        location_detail = location_details[item_ind]

        items[item_ind]["awb_id"] = location_detail["awb_id"]
        items[item_ind]["task_location"] = {
                "address": location_detail["address"],
                "lat": location_detail["lat"],
                "lng": location_detail["lng"],
            }


    return items


def add_items(items: List[Item]) -> dict:
    try:
        items = mock_assign(serializers.items_serializer(items))

        clock = serializers.clock_serializer(clock_db.find_one())
        day_start = clock["day_start"]
        clock_start = clock["clock_start"]
        scan_time_actual = dt.strptime(dt.now().strftime("%d-%m-%Y %H:%M:%S"), "%d-%m-%Y %H:%M:%S")
        scan_time_simult = day_start + (scan_time_actual - clock_start)
        
        for item in items:
            item["scan_time"] = scan_time_simult

        items_db.insert_many(items)
        return {"success": True, "message": "Items Added Successfully!"}
    except Exception as E:
        print("Exception",E)
        return HTTPException(status_code=404, detail=f"Could Not Process Add Items")


def delete_item(item_id: str):
    try:
        items_db.delete_one({"item_id": item_id})
        return {"success": False, "message": "Item Deleted Successfully!"}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Delete Item")
