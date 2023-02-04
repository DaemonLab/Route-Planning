import datetime
from pydantic import Field
from pydantic import BaseModel


class Clock(BaseModel):

    day_start: datetime.datetime = Field(..., title = "Warehouse Day Start Time")
    clock_start: datetime.datetime = Field(..., title = "Clock Start Time")
    is_scanned: bool = Field(False, title = "Is Scanned")
    is_dispatched: bool = Field(False, title = "Is Dispatched")

    class Config:
        title = "clock"
        orm_mode = True
