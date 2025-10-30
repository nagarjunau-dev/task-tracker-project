import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskAdded }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/tasks", task);
      alert("✅ Task added successfully!");
      setTask({
        title: "",
        description: "",
        priority: "Medium",
        due_date: "",
        status: "Pending",
      });
      onTaskAdded(); // refresh tasks or insights
    } catch (error) {
      console.error("Error adding task:", error);
      alert("❌ Failed to add task.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: "#f4f4f4",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h3>Add New Task</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input
        type="date"
        name="due_date"
        value={task.due_date}
        onChange={handleChange}
      />
      <select name="status" value={task.status} onChange={handleChange}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
