import React, { useState } from "react";
import axios from "axios";

function TaskForm({ refresh, refreshInsights }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/tasks", form);
    setForm({ title: "", description: "", priority: "Medium", due_date: "", status: "Pending" });
    refresh();
    refreshInsights();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input type="date" name="due_date" value={form.due_date} onChange={handleChange} required />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
