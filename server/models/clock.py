import datetime
from typing import Field

from pydantic import BaseModel


class Clock(BaseModel):

    is_calibrated: bool = Field(False, title = "Is Calibrated")
    clock_start: datetime.datetime = Field(..., title = "Clock Start Time")
    factor: int = Field(..., title = "Multiplication Factor")
    is_scanned: bool = Field(False, title = "Is Scanned")
    Is_dispatched: bool = Field(False, title = "Is Dispatched")

    class Config:
        title = "clock"
        orm_mode = True
