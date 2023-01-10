from pydantic import BaseModel
from item import Item
from rider import Rider
from datetime import datetime

class TaskLog(BaseModel):
    item_id  : Item.item_id
    rider_id : Rider.rider_id
    
    class Config:
        title = 'items'
        orm_mode = True