import serializers
from database import items_db
from fastapi import HTTPException
from models import Item
from typing import List

def get_item(item_id: str):
    try:

        item = items_db.find_one({"item_id": item_id})
        if item:
            return {"item": serializers.item_serializer(item)}

        raise HTTPException(status_code=404, detail="Item not found")
        
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get Item")

def get_items() -> dict:
    try:
        items = items_db.find()
        if items:
            return {"items": serializers.items_serializer(items)}
        
        raise HTTPException(status_code=404, detail="Items not found")

    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get Items, Error")

def add_items(items: List[Item]) -> dict:
    try:
        items_db.insert_many(serializers.items_serializer(items))
        return {"status": "OK", "data_added": True}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Add Items, Error")
    

def delete_item(item_id: str):
    try:
        items_db.delete_one({"item_id": item_id})
        return {"status": "OK", "data_deleted": True}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Delete Item, Error")
