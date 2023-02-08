from fastapi import APIRouter
from typing import List

from models import Item
import services


router = APIRouter(prefix="/item", tags=["Items"])


@router.get("/{item_id}")
def get_item(item_id: str):
    return services.get_item(item_id=item_id)


@router.get("/")
def get_items():
    return services.get_items()


@router.post("/")
def add_items(items: List[Item]):
    return services.add_items(items)


@router.delete("/{item_id}")
def delete_item(item_id: str):
    return services.delete_item(item_id=item_id)


@router.post("/volume")
def getVolume(item):
    # item added
    return {'volume': item.volume}
    
@router.get("/volume")
def getVolume(item):
    # return most recent item's volume
    return {'volume': item.volume}


