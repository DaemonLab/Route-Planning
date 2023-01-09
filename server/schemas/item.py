from pydantic import BaseModel
from datetime import datetime


class Item(BaseModel):
    
    id : str
    name : str
    description : str = 'Item Description'
    volume: float
    weight: float
    task_location: str
    task_type : str
    edd: datetime.datetime = None
    
    class Config:
        title = 'items'
        orm_mode = True