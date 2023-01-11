from pydantic import BaseModel
from location import Location

class Task(BaseModel):  
    item_id : str 
    task_type : str 
    task_location : Location
    time_req : float 
    
    

class Rider(BaseModel):
    
    rider_id : str
    name : str
    age : int = '30'
    bag_volume : float
    current_location : Location | None
    current_route : list[Location] = []
    tasks : list[Task] = []
    
    class Config:
        title = 'riders'
        orm_mode = True