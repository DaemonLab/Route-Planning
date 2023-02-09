from fastapi import APIRouter
from typing import List
from typing import Dict, Any

from models import Item
import services


router = APIRouter(prefix="/item", tags=["Items"])


@router.get("/{item_id}")
def get_item(item_id: str):
    return services.get_item(item_id=item_id)


@router.get("/")
def get_items():
    return services.get_items()

@router.post("/add_dispatch_details")
def add_dispatch_details(items: List[Item]):
    return services.add_dispatch_details(items)

@router.post("/")
def add_items(items: List[Item]):
    return services.add_items(items)


@router.delete("/{item_id}")
def delete_item(item_id: str):
    return services.delete_item(item_id=item_id)

@router.post("/tool/volume")
def show_volume(data: Dict[Any, Any]):
    print("Hello",data)
    return {'success':True}

@router.post("/volume")
def getVolume(item):
    # item added
    return {'volume': item.volume}
    
@router.get("/volume")
def getVolume(item):
    # return most recent item's volume
    return {'volume': item.volume}


