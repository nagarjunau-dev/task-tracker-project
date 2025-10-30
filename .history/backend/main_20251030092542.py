from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from backend.database import SessionLocal, engine
from backend import crud, models, schemas




models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Tracker with Smart Insights")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency: get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Create a new task
@app.post("/tasks", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db=db, task=task)

# 📋 Get all tasks (with optional filters)
@app.get("/tasks", response_model=list[schemas.TaskResponse])
def get_tasks(status: str = None, priority: str = None, db: Session = Depends(get_db)):
    return crud.get_tasks(db=db, status=status, priority=priority)

# ✏️ Update task
@app.patch("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = crud.update_task(db=db, task_id=task_id, task_update=task_update)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

# # 💡 Insights endpoint
# @app.get("/insights")
# def get_insights(db: Session = Depends(get_db)):
#     return crud.get_insights(db=db)

@app.get("/insights")
def get_insights(db: Session = Depends(SessionLocal)):
    tasks = db.query(models.Task).all()

    total = len(tasks)
    high_priority = len([t for t in tasks if t.priority.lower() == "high"])
    completed = len([t for t in tasks if t.status.lower() == "completed"])
    due_soon = len([t for t in tasks if t.due_date and (t.due_date - datetime.now().date()).days <= 2])

    # Simple “AI-like” text summary
    if total == 0:
        summary = "You have no tasks yet — time to plan your week!"
    else:
        summary = f"You have {total} tasks"
        if high_priority:
            summary += f", with {high_priority} high priority"
        if due_soon:
            summary += f", and {due_soon} due soon"
        summary += f". {completed} completed so far."

    return {
        "total_tasks": total,
        "high_priority": high_priority,
        "completed": completed,
        "due_soon": due_soon,
        "summary": summary
    }
