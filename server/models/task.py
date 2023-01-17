from typing import Literal

from pydantic import BaseModel, Field

from .route import Location


class Task(BaseModel):
    item_id: str = Field(..., title="Item ID")
    task_type: Literal["Deliver", "Pickup"]
    task_location: Location

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