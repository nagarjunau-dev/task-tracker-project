import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: "", priority: "" });

  const fetchTasks = async () => {
    try {
      let url = "http://127.0.0.1:8000/tasks";
      const params = [];

      if (filter.status) params.push(`status=${filter.status}`);
      if (filter.priority) params.push(`priority=${filter.priority}`);
      if (params.length) url += `?${params.join("&")}`;

      const res = await axios.get(url);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleUpdate = async (id, updated) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/tasks/${id}`, updated);
      fetchTasks();
      alert("✅ Task updated!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Could not update task");
    }
  };

  return (
    <div
      style={{
        marginTop: "1.5rem",
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3>📋 Task List</h3>

      {/* Filter Controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={fetchTasks}>Refresh</button>
      </div>

      {/* Task Cards */}
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "8px",
            }}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>
              <strong>Priority:</strong>{" "}
              <select
                value={task.priority}
                onChange={(e) =>
                  handleUpdate(task.id, { priority: e.target.value })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>{" "}
              | <strong>Status:</strong>{" "}
              <select
                value={task.status}
                onChange={(e) =>
                  handleUpdate(task.id, { status: e.target.value })
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </p>
            <p>
              <strong>Due:</strong>{" "}
              {task.due_date ? task.due_date.slice(0, 10) : "No date"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
