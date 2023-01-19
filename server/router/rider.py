import services
from fastapi import APIRouter , HTTPException
from models import Rider
from typing import List

router = APIRouter(prefix="/riders", tags=["Riders"])

@router.get("/{rider_id}")
def get_rider(rider_id: str):
    try:
        return services.get_rider(rider_id=rider_id)
    except:
        raise HTTPException(status_code=400, detail="Error in Get Rider")

@router.get("/")
def get_riders():
    try:
        return services.get_riders()
    except:
        raise HTTPException(status_code=400, detail="Error in Get Riders")

@router.post("/")
def add_riders(riders: List[Rider]):
    try:
        print("riders in router : ",riders)
        return services.add_riders(riders=riders)
    except:
        raise HTTPException(status_code=400, detail="Error in Add Riders")

@router.delete("/{rider_id}")
def delete_rider(rider_id: str):
    try:
        return services.delete_rider(rider_id=rider_id)
    except:
        raise HTTPException(status_code=400, detail="Error in Delete Riders")

