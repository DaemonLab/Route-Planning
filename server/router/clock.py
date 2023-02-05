from fastapi import APIRouter
from datetime import datetime as dt

from database import clock_db, items_db , riders_db , location_details_db  
import serializers
import utils


router = APIRouter(prefix="/clock", tags=["Clock"])

@router.get("/start_day")
def start_day():

    clock = serializers.clock_serializer(clock_db.find_one())
    
    if clock is None:
        clock_db.insert_one({
            "day_start": utils.day_start,
            "clock_start": dt.strptime(dt.now().strftime("%d-%m-%Y %H:%M:%S") , "%d-%m-%Y %H:%M:%S"),
            "is_scanned": False,
            "is_dispatched": False
        })

    else:
        clock_db.update_one({}, {
                "$set": {
                    "day_start": utils.day_start,
                    "clock_start": dt.strptime(dt.now().strftime("%d-%m-%Y %H:%M:%S") , "%d-%m-%Y %H:%M:%S"),
                    "is_scanned": False,
                    "is_dispatched": False
                }
            })

    items_db.delete_many({})
    riders_db.delete_many({})
    location_details_db.delete_many({})

    return {"success": True, "message":"Clock Started Successfully"}

@router.get("/complete_scan")
def complete_scan():

    clock_db.update_one( {} , {
                "$set": {
                    "is_scanned": True
                }
            })

    return {"done": True}

@router.get("/complete_dispatch")
def complete_dispatch():
    
    clock_db.update_one( {} , {
                "$set": {
                    "is_dispatched": True
                }
            })
            
    return {"done": True}