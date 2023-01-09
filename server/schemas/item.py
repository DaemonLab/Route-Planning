from pydantic import BaseModel
from datetime import datetime


class Item(BaseModel):
    
    id : str
    name : str
    description : str = 'Item Description'
    volume: float
    weight: float
    delivery_location: str
    edd: datetime.datetime
    
    class Config:
        title = 'items'
        orm_mode = True