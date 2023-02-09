from fastapi import APIRouter
from typing import List
import threading

from models import Item , PickupItems
import services
from setInterval import setInterval

router = APIRouter(prefix="/navigation", tags=["Navigation"])

inter = 'setInterval Object'


@router.get("/dispatch")
def dispatch():
    return services.dispatch()

@router.post("/add_pickup_items")
def add_pickups(pickupItems: PickupItems):
    return services.add_pickup_items(pickupItems)

@router.post("/remove_pickup_item")
def remove_pickup_item(item_id: str):
    return services.remove_pickup_item(item_id)