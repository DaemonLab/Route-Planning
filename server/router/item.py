import services
from fastapi import APIRouter
from models import Item
from typing import List

router = APIRouter(prefix="/item",tags=["Items"])

@router.get("/{item_id}")
def get_item(item_id: str):
        return services.get_item(item_id=item_id)

@router.get("/")
def get_items():
    return services.get_items()

@router.post("/")
def add_items(items: List[Item]):
    return services.add_items(items=items)

@router.delete("/{item_id}")
def delete_item(item_id: str):
    return services.delete_item(item_id=item_id)