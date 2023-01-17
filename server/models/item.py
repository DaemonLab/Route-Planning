import datetime
from typing import Literal

from pydantic import BaseModel, Field

from .route import Location


class Item(BaseModel):

    item_id: str = Field(..., title="Item ID")
    name: str = Field(..., title="Name")
    description: str = Field(..., title="Description")
    task_type: Literal["Deliver", "Pickup"]
    is_completed: bool = Field(False, title="Is Completed")

    volume: float = Field(..., title="Volume")
    weight: float = Field(..., title="Weight")

    task_location: Location
    scan_time: datetime.datetime = Field(None, title="Scan Time")
    edd: datetime.datetime = Field(None, title="Expected Delivery Date")

    class Config:
        anystr_strip_whitespace = True
        title = "Items"
        orm_mode = True
