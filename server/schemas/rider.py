from pydantic import BaseModel
from item import Item

class RoutePoint(BaseModel):  #type to define next point in rider's route
    task_id : str     #delivery_id or pickup_id
    task_type : str   #delivery or pickup
    task_location : str
    time_req : float  #time required to reach this point from current location of rider
    
    

class Rider(BaseModel):
    
    id : str
    name : str
    age : int = '30'
    bag_volume : float
    current_location : str = 'Warehouse Address'
    route : list[RoutePoint] = []
    
    class Config:
        title = 'riders'
        orm_mode = True