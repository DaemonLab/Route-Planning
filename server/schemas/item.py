import datetime

from pydantic import BaseModel

from .location import Location


class Item(BaseModel):

    item_id: str
    name: str
    description: str = "Item Description"
    volume: float
    weight: float
    task_type: str
    task_location: Location
    task_completed: bool
    edd: datetime.datetime = None

    class Config:
        title = "items"
        orm_mode = True
