from pydantic import BaseModel

class Location(BaseModel):
    
    address : str
    latitude : float
    longitude : float
    
    class Config:
        title = 'locations'
        orm_mode = True