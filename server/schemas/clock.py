from pydantic import BaseModel
import datetime

class Clock(BaseModel):
    
    calibirate : bool
    clock_start : datetime.datetime
    factor : int
    scanned : bool 
    dispatched : bool
    
    class Config:
        title = 'clock'
        orm_mode = True