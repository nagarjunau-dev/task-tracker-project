from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
ffrom backend.database import SessionLocal, engine

import models, crud, schemas


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

# 💡 Insights endpoint
@app.get("/insights")
def get_insights(db: Session = Depends(get_db)):
    return crud.get_insights(db=db)
