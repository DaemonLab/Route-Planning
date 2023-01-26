import serializers
from database import rider_db
from fastapi import HTTPException
from models import Rider
from typing import List


def get_rider(rider_id: str):
    try:
        rider = rider_db.find_one({"rider_id": rider_id})

        if rider is None:
            raise HTTPException(status_code=404, detail="rider Not Found")

        return {"rider": serializers.rider_serializer(rider)}

    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get rider")


def get_riders() -> dict:
    try:
        riders = rider_db.find()
        return {"riders": serializers.riders_serializer(riders)}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get riders")



def add_riders(riders: List[Rider]) -> dict:
    try:
        riders = serializers.riders_serializer(riders)
        rider_db.insert_many(riders)
        return {"status": "OK", "data_added": True}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Add riders")


def delete_rider(rider_id: str):
    try:
        rider_db.delete_one({"rider_id": rider_id})
        return {"status": "OK", "data_deleted": True}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Delete rider")
