import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Insights from "./components/Insights";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [insights, setInsights] = useState({});

  // Fetch all tasks
  const fetchTasks = async () => {
    const res = await axios.get("http://127.0.0.1:8000/tasks");
    setTasks(res.data);
  };

  // Fetch insights
  const fetchInsights = async () => {
    const res = await axios.get("http://127.0.0.1:8000/insights");
    setInsights(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchInsights();
  }, []);

  return (
    <div className="app-container">
      <h1>🗂️ Task Tracker with Smart Insights</h1>
      <TaskForm refresh={fetchTasks} refreshInsights={fetchInsights} />
      <TaskList tasks={tasks} refresh={fetchTasks} />
      <Insights data={insights} />
    </div>
  );
}

export default App;

