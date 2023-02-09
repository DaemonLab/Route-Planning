from pydantic import BaseModel, Field
from typing import List

class Location(BaseModel):
    
    address: str = Field(..., title="Address")
    lat: float = Field(..., title="Latitude")
    lng: float = Field(..., title="Longitude")

    class Config:
        anystr_strip_whitespace = True
        title = "Location"
        orm_mode = True

class RouteLocation(BaseModel):
    lat: float = Field(..., title="Latitude")
    lng: float = Field(..., title="Longitude")

    class Config:
        anystr_strip_whitespace = True
        title = "RouteLocation"
        orm_mode = True


class RouteStep(BaseModel):

    distance: int = Field(..., title="Distance")
    time_taken: int = Field(..., title="Time Taken")
    instruction: str = Field(..., title="Instruction")
    polyline: List[RouteLocation] = []

    class Config:
        anystr_strip_whitespace = True
        title = "RouteStep"
        orm_mode = True

