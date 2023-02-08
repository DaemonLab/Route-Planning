from pydantic import BaseModel, Field
from typing import List


from .route import RouteLocation
from .task import Task


class Rider(BaseModel):

    rider_id: str = Field(..., title="Rider ID")
    name: str = Field(..., title="Name")
    age: int = Field(..., title="Age")
    bag_volume: int = Field(..., title="Bag Volume")

    tasks: List[Task] = []
    task_index: int = Field(..., title="Task Index")

    class Config:
        title = "riders"
        orm_mode = True
