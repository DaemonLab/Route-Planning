from fastapi import APIRouter
from typing import List

from models import Rider
import services

router = APIRouter(prefix="/rider", tags=["Riders"])


@router.get("/{rider_id}")
def get_rider(rider_id: str):
    return services.get_rider(rider_id=rider_id)

@router.get("/")
def get_riders():
    return services.get_riders()

# @router.get("/download/riders")
# def download_riders():
#     return services.download_riders()


@router.post("/")
def add_riders(riders: List[Rider]):
    return services.add_riders(riders=riders)


@router.delete("/{rider_id}")
def delete_rider(rider_id: str):
    return services.delete_rider(rider_id=rider_id)
