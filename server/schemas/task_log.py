from pydantic import BaseModel

class TaskLog(BaseModel):
    item_id  : str
    rider_id : str
    
    class Config:
        title = 'task_logs'
        orm_mode = True