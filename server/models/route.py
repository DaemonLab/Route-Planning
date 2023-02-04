from pydantic import BaseModel, Field


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


class RouteDetail(BaseModel):

    time_taken: int = Field(..., title="Time Taken")
    distance: int = Field(..., title="Distance")
    speed_limit: int = Field(..., title="Speed Limit")
    instruction: str = Field(..., title="Instruction")

    class Config:
        anystr_strip_whitespace = True
        title = "RouteDetail"
        orm_mode = True

class LocationDetail(BaseModel):

    address: str = Field(..., title="Address")
    area: str = Field(..., title="Area or Locality")
    awb_id: str
    lat: float = Field(..., title="Latitude")
    lng: float = Field(..., title="Longitude")    

    class Config:
        anystr_strip_whitespace = True
        title = "LocationDetail"
        orm_mode = True
