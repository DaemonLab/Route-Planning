import services
from fastapi import APIRouter , HTTPException
from models import Item
from typing import List

router = APIRouter(prefix="/items",tags=["Items"])

@router.get("/{item_id}")
def get_item(item_id: str):
    try:
        return services.get_item(item_id=item_id)
    except Exception as E:
        print(E)
        raise HTTPException(status_code=400, detail="Error in Get Item")

@router.get("/")
def get_items():
    try:
        return services.get_items()
    except Exception as E:
        print(E)
        raise HTTPException(status_code=400, detail="Error in Get Items")

@router.post("/")
def add_items(items: List[Item]):
    try:
        return services.add_items(items=items)
    except Exception as E:
        print(E)
        raise HTTPException(status_code=400, detail="Error in Add Items")

@router.delete("/{item_id}")
def delete_item(item_id: str):
    try:
        return services.delete_item(item_id=item_id)
    except:
        raise HTTPException(status_code=400, detail="Error in Delete Item")