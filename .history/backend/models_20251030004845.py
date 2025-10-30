from sqlalchemy import Column, Integer, String, Date, Enum
from sqlalchemy.sql import func
from .database import Base
import enum

# Define possible priorities and statuses
class Priority(str, enum.Enum):
    low = "Low"
    medium = "Medium"
    high = "High"

class Status(str, enum.Enum):
    todo = "To Do"
    in_progress = "In Progress"
    done = "Done"

# Define Task model
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    priority = Column(Enum(Priority), default=Priority.medium)
    status = Column(Enum(Status), default=Status.todo)
    due_date = Column(Date, nullable=True)
