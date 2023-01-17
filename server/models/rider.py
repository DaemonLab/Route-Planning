from pydantic import BaseModel, Field

from .route import Location


class Rider(BaseModel):

    rider_id: str = Field(..., title="Rider ID")
    name: str = Field(..., title="Name")
    age: int = Field(..., title="Age")
    bag_volume: float = Field(..., title="Bag Volume")
    current_location: Location = None
    current_route: list = []
    current_index: int = Field(..., title="Current Index")
    route_information: list = []
    tasks: list = []

    class Config:
        title = "riders"
        orm_mode = True
