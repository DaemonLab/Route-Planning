from pydantic import BaseModel


class Location(BaseModel):
    
    address : str
    lat : float
    lng : float
    
    class Config:
        title = "locations"
        orm_mode = True
