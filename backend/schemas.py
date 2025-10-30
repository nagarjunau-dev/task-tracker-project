from pydantic import BaseModel
from datetime import date
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    due_date: date
    status: str

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None

class TaskResponse(TaskBase):
    id: int

    class Config:
        orm_mode = True
