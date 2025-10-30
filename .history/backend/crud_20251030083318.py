from sqlalchemy.orm import Session
from backend.models import Task
from backend.schemas import TaskCreate, TaskUpdate
from datetime import date

#  Create a new task
def create_task(db: Session, task: TaskCreate):
    db_task = Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        due_date=task.due_date,
        status=task.status
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

#  Get all tasks (with optional filters)
def get_tasks(db: Session, status: str = None, priority: str = None):
    query = db.query(Task)
    if status:
        query = query.filter(Task.status == status)
    if priority:
        query = query.filter(Task.priority == priority)
    return query.all()

#  Update task status or priority
def update_task(db: Session, task_id: int, task_update: TaskUpdate):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        return None
    if task_update.status:
        db_task.status = task_update.status
    if task_update.priority:
        db_task.priority = task_update.priority
    db.commit()
    db.refresh(db_task)
    return db_task

# Insights (simple summary)
def get_insights(db: Session):
    total = db.query(Task).count()
    high_priority = db.query(Task).filter(Task.priority == "High").count()
    due_soon = db.query(Task).filter(Task.due_date <= date.today()).count()

    summary = {
        "total_tasks": total,
        "high_priority_tasks": high_priority,
        "due_soon": due_soon,
        "message": f"You have {total} tasks — {high_priority} are High priority and {due_soon} are due soon."
    }
    return summary
