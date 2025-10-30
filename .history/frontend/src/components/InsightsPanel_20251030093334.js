import React, { useEffect, useState } from "react";
import axios from "axios";

const InsightsPanel = () => {
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/insights");
        setInsights(res.data);
      } catch (err) {
        setError("Unable to fetch insights");
        console.error(err);
      }
    };
    fetchInsights();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!insights) return <p>Loading insights...</p>;

  return (
    <div style={{
      backgroundColor: "#f9f9f9",
      padding: "1rem",
      marginTop: "1rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <h3>📊 Smart Insights</h3>
      <p>{insights.summary}</p>
      <ul>
        <li>Total Tasks: {insights.total_tasks}</li>
        <li>High Priority: {insights.high_priority}</li>
        <li>Completed: {insights.completed}</li>
        <li>Due Soon: {insights.due_soon}</li>
      </ul>
    </div>
  );
};

export default InsightsPanel;
