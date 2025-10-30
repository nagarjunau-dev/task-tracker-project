import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import InsightsPanel from "./components/InsightsPanel";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh(!refresh); // refresh insights after adding task
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial" }}>
      <h1>📝 Task Tracker</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <InsightsPanel key={refresh} />
    </div>
  );
}

export default App;















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import TaskForm from "./components/TaskForm";
// import TaskList from "./components/TaskList";
// import Insights from "./components/Insights";
// import "./App.css";
// import InsightsPanel from "./components/InsightsPanel";


// function App() {
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     const res = await axios.get("http://127.0.0.1:8000/tasks");
//     setTasks(res.data);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="container">
//       <h1>🧠 Task Tracker with Smart Insights</h1>
//       <TaskForm refresh={fetchTasks} />
//       <TaskList tasks={tasks} refresh={fetchTasks} />
//       <Insights />
//     </div>
//   );
// }

// export default App;


