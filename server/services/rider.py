import serializers
from database import riders_db
from fastapi import HTTPException
from models import Rider
from typing import List


def get_rider(rider_id: str):
    try:
        if riders_db.find_one({"rider_id": rider_id}) is None:
            raise HTTPException(status_code=404, detail="Rider not found")
        return serializers.rider_serializer(
            riders_db.find_one({"rider_id": rider_id})
        )
    except:
        raise HTTPException(status_code=404, detail="Invalid ID")

def get_riders():
    riders = serializers.riders_serializer(riders_db.find())
    if riders:
        return riders
    raise HTTPException(status_code=404, detail="Riders not found")

def add_riders(riders: List[Rider]) -> dict:
    ins_riders = [dict(rider) for rider in riders]
    print("riders in services : ",ins_riders)
    riders_db.insert_many(ins_riders)
    return {"status": "OK", "riders_added": riders}

def delete_rider(rider_id: str):
    riders_db.delete_one({"rider_id": rider_id})
    return {"status": "OK", "data_deleted": True}
