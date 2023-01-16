from pydantic import BaseModel
from .location import Location

class Task(BaseModel):  
    item_id : str 
    task_type : str 
    task_location : Location
    
    

class Rider(BaseModel):
    
    rider_id : str
    name : str
    age : int = '30'
    bag_volume : float
    current_location : Location or None
    current_route : list = []
    current_index : int
    time_taken : list = []
    tasks : list = []
    
    class Config:
        title = 'riders'
        orm_mode = True
        
        
def rider_serializer(item) -> dict:
    return {
        "_id": str(item["_id"]),
        "rider_id": str(item["rider_id"]),
        "name": item["name"],
        "age": item["age"],
        "bag_volume": item["bag_volume"],
        "current_location": item["current_location"],
        "current_route": item["current_route"],
        "current_index": item["current_index"],
        "time_taken": item["time_taken"],
        "tasks": item["tasks"]
    }


def riders_serializer(items) -> list:
    return [item_serializer(item) for item in items]
