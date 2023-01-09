from pydantic import BaseModel
from datetime import datetime

class Rider(BaseModel):
    
    id : str
    name : str
    age : int = '30'
    bag_volume : float
    current_location : str = 'Warehouse Address'
    route : list[str] = []
    
    class Config:
        title = 'riders'
        orm_mode = True