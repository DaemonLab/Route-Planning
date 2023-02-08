from fastapi import HTTPException
from typing import List

from models import Rider
from database import riders_db
import serializers



def get_rider(rider_id: str):
    try:
        rider = serializers.rider_serializer(riders_db.find_one({"rider_id": rider_id}))

        if rider is None:
            raise HTTPException(status_code=404, detail="rider Not Found")

        return {"rider": rider}

    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get rider")


def get_riders() -> dict:
    try:
        riders = serializers.riders_serializer(riders_db.find())
        return {"riders": riders}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Get riders")


def add_riders(riders: List[Rider]) -> dict:
    try:
        riders = serializers.riders_serializer(riders)
        riders_db.insert_many(riders)
        return {"success": True, "message": "Riders Added Successfully!"}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Add riders")


def delete_rider(rider_id: str):
    try:
        riders_db.delete_one({"rider_id": rider_id})
        return {"success": False, "message": "Rider Deleted Successfully!"}
    except Exception as E:
        return HTTPException(status_code=404, detail=f"Could Not Process Delete rider")
