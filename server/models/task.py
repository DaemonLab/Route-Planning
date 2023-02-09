import datetime
from typing import Literal, List
from pydantic import BaseModel, Field

from .route import Location, RouteStep, RouteLocation


class Task(BaseModel):
    item_id: str = Field(..., title="Item ID")
    awb_id: str = Field(..., title="AWB ID")
    task_type: Literal["Delivery", "Pickup"]
    volume: int  = Field(..., title="Volume")
    
    task_location: Location
    edd: int = Field(None, title="EDD Time in Seconds")

    route_steps: List[RouteStep] = []
    route_polyline: List[RouteLocation] = []
    time_taken: int = 0
    time_next: int = -1

    class Config:
        anystr_strip_whitespace = True
        title = "Task"
        orm_mode = True


class TaskLog(BaseModel):

    item_id: str = Field(..., title="Item ID")
    rider_id: str = Field(..., title="Rider ID")

    class Config:
        anystr_strip_whitespace = True
        title = "Task Log"
        orm_mode = True
