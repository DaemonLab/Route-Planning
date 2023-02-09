from fastapi import HTTPException
from datetime import datetime as dt
from typing import List

from models import Item
from database import items_db , clock_db , location_details_db
import serializers
import utils

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

def add_dispatch_details(items: List[Item]):
        
    items = serializers.items_serializer(items)


    for item_ind in range(len(items)):

        lat , lng = utils.geocode(items[item_ind]["awb_id"],"")

        items[item_ind]["task_location"] = {
            'address': items[item_ind]['task_location']['address'],
            'lat': lat,
            'lng': lng
        }


    items_db.insert_many(items)

def mock_assign(items: List[Item]) -> List[Item]:

    dispatch_item_locations = items_db.find({})

    for item_ind in range(len(items)):

        items_db.update_one({"item_id":dispatch_item_locations[item_ind]["item_id"]},
        {
            "$set": {
                "volume": items[item_ind]["volume"],
                "weight": items[item_ind]["weight"]
            }
        })

    return items


def add_items(items: List[Item]) -> dict:
    try:
        items = mock_assign(serializers.items_serializer(items))
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
