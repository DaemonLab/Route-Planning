from pydantic import BaseModel
from .location import Location
import datetime



class Item(BaseModel):
    
    _id : str
    given_id: str
    name : str
    description : str = 'Item Description'
    volume: float
    weight: float
    task_type : str
    task_location: Location
    task_completed : bool
    edd: datetime.datetime = None
    
    class Config:
        title = 'items'
        orm_mode = True
        
        

def item_serializer(item) -> dict:
    return {
        "_id": str(item["_id"]),
        "given_id": str(item["given_id"]),
        "name": item["name"],
        "description": item["description"],
        "volume": item["volume"],
        "weight": item["weight"],
        "task_type": item["task_type"],
        "task_location": item["task_location"],
        "task_completed": item["task_completed"],
        "edd": item["edd"]
    }


def items_serializer(items) -> list:
    return [item_serializer(item) for item in items]
