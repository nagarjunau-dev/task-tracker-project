import React, { useEffect, useState } from "react";
import axios from "axios";

function Insights() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/insights");
      setInsights(res.data);
    } catch (err) {
      console.error("Error fetching insights:", err);
    }
  };

  return (
    <div className="insights">
      <h2>📊 Smart Insights</h2>
      {insights ? (
        <div>
          <p>Total Tasks: {insights.total_tasks}</p>
          <p>High Priority: {insights.high_priority}</p>
          <p>Completed: {insights.completed}</p>
          <p>Due Soon: {insights.due_soon}</p>
          <p><strong>Summary:</strong> {insights.summary}</p>
        </div>
      ) : (
        <p>Loading insights...</p>
      )}
    </div>
  );
}

export default Insights;
