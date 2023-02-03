from fastapi import APIRouter
from datetime import datetime as dt

from database import clock_db
import serializers


router = APIRouter(prefix="/clock", tags=["Clock"])

@router.post("/start_day")
def start_day(day_start):

    clock = serializers.clock_serializer(clock_db.find_one())
    day_start = dt.strptime(day_start, "%d-%m-%Y %H:%M:%S")

    if clock is None:
        clock_db.insert_one({
            "day_start": day_start,
            "clock_start": dt.strptime(dt.now().strftime("%d-%m-%Y %H:%M:%S") , "%d-%m-%Y %H:%M:%S"),
            "is_scanned": False,
            "is_dispatched": False
        })

    else:
        clock_db.update_one({}, {
                "$set": {
                    "day_start": day_start,
                    "clock_start": dt.strptime(dt.now().strftime("%d-%m-%Y %H:%M:%S") , "%d-%m-%Y %H:%M:%S"),
                    "is_scanned": False,
                    "is_dispatched": False
                }
            })

    return {"done": True}

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