import React from "react";
import axios from "axios";

function TaskList({ tasks, refresh }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/tasks/${id}`);
    refresh();
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`http://127.0.0.1:8000/tasks/${id}`, { status: newStatus });
    refresh();
  };

  return (
    <div className="task-list">
      <h2>📋 Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
              <div>
                <strong>{task.title}</strong> — {task.priority}
                <br />
                {task.description}
                <br />
                Due: {task.due_date}
              </div>
              <div className="actions">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <button onClick={() => handleDelete(task.id)}>🗑 Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
