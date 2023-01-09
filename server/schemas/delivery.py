from pydantic import BaseModel
from datetime import datetime

from item import Item
from rider import Rider


class Delivery(BaseModel):
    
    id : str
    item_id : Item.id
    rider_id : Rider.id
    completed : bool = False
    
    class Config:
        title = 'deliveries'
        orm_mode = True