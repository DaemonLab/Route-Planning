import serializers
from database import items_db
from fastapi import HTTPException
from models import Item
from typing import List


def get_item(item_id: str):
    try:
        item = items_db.find_one({"item_id": item_id})

        if item is None:
            raise HTTPException(status_code=404, detail="Item Not Found")

        return {"item": serializers.item_serializer(item)}

    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get Item")


def get_items() -> dict:
    try:
        items = items_db.find()
        return {"items": serializers.items_serializer(items)}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get Items")


def assign_ids(items: List[Item]) -> List[Item]:
    #Assign ids to items according to predefined list
    return items

def add_items(items: List[Item]) -> dict:
    try:
        items = assign_ids(serializers.items_serializer(items))
        items_db.insert_many(items)
        return {"status": "OK", "data_added": True}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Add Items")


def delete_item(item_id: str):
    try:
        items_db.delete_one({"item_id": item_id})
        return {"status": "OK", "data_deleted": True}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Delete Item")
