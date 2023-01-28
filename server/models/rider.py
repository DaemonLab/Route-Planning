from pydantic import BaseModel, Field
from typing import List


from .route import Location , RouteLocation ,  RouteDetail
from .task import Task


class Rider(BaseModel):

    rider_id: str = Field(..., title="Rider ID")
    name: str = Field(..., title="Name")
    age: int = Field(..., title="Age")
    bag_volume: float = Field(..., title="Bag Volume")
    current_location: RouteLocation = None
    current_route: List[RouteLocation] = []
    route_details: List[RouteDetail]
    route_index: int = Field(..., title="Route Index")
    tasks: List[Task] = []
    task_index: int = Field(..., title="Task Index")

    class Config:
        title = "riders"
        orm_mode = True
