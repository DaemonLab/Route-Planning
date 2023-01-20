import serializers
from database import riders_db
from fastapi import HTTPException
from models import Rider
from typing import List

def get_rider(rider_id: str):
    try:

        rider = riders_db.find_one({"rider_id": rider_id})
        if rider:
            return {"rider": serializers.rider_serializer(rider)}

        raise HTTPException(status_code=404, detail="rider not found")
        
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get rider")

def get_riders() -> dict:
    try:
        riders = riders_db.find()
        if riders:
            return {"riders": serializers.riders_serializer(riders)}
        
        raise HTTPException(status_code=404, detail="riders not found")

    except Exception as E:
        print(E)
        return HTTPException(status_code=404, detail=f"Could Not Process Get riders")

def add_riders(riders: List[Rider]) -> dict:
    try:
        ins_riders = serializers.riders_serializer(riders)
        print("ins_riders : ",ins_riders)
        riders_db.insert_many(ins_riders)
        return {"status": "OK", "data_added": True}
    except Exception as E:
        print(E)
        return HTTPException(status_code=404, detail=f"Could Not Process Add riders")
    

def delete_rider(rider_id: str):
    try:
        riders_db.delete_one({"rider_id": rider_id})
        return {"status": "OK", "data_deleted": True}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Delete rider")
