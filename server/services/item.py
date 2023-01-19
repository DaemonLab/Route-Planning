import serializers
from database import items_db
from fastapi import HTTPException
from models import Item
from typing import List

def get_item(item_id: str):
    try:
        if items_db.find_one({"item_id": item_id}) is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return serializers.item_serializer(
            items_db.find_one({"item_id": item_id})
        )
    except:
        raise HTTPException(status_code=404, detail="Invalid ID")

def get_items():
    items = serializers.items_serializer(items_db.find())
    if items:
        return items
    raise HTTPException(status_code=404, detail="Items not found")

def add_items(items: List[Item]) -> dict:
    for item in items:
        _id = items_db.insert_one(dict(item))
        added_item = serializers.item_serializer(items.find({"_id": _id.inserted_id}))
        print({"status": "OK", "data_inserted": added_item})
    return {"status": "OK", "data_added": True}
    

def delete_item(item_id: str):
    items_db.delete_one({"item_id": item_id})
    return {"status": "OK", "data_deleted": True}
