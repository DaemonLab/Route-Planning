import datetime
from pydantic import BaseModel, Field
from typing import Literal, List

from .route import Location


class Item(BaseModel):

    item_id: str = Field(..., title="Item ID")
    name: str = Field(..., title="Name")
    description: str = Field(..., title="Description")
    task_type: Literal["Delivery", "Pickup"]

    volume: int = Field(..., title="Volume")
    weight: float = Field(..., title="Weight")

    awb_id: str = Field(..., title="AWB ID")
    task_location: Location = Field(None, title="Task Location")
    scan_time: datetime.datetime = Field(None, title="Scan Time")
    edd: datetime.datetime = Field(None, title="Scan Time")

    class Config:
        anystr_strip_whitespace = True
        title = "Items"
        orm_mode = True

class PickupItems(BaseModel):

    items: List[Item] = []
    num_hours: int = Field(..., title="Number of Hours")

    class Config:
        anystr_strip_whitespace = True
        title = "Pickup Item"
        orm_mode = True