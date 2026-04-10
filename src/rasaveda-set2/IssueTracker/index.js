import React, { useState } from "react";
import "./styles.css";

export default function IssueTracker() {
  // STEP 1 — Sample Issues Data
  const initialIssues = [
    {
      id: 1,
      recipe: "Puran Poli",
      category: "Wrong Info",
      description: "The jaggery quantity is incorrect.",
      status: "open",
      resolutionNote: ""
    },
    {
      id: 2,
      recipe: "Biryani",
      category: "Missing Context",
      description: "No regional variation mentioned.",
      status: "resolved",
      resolutionNote: "Added Hyderabadi and Lucknowi versions."
    }
  ];

  // STEP 2 — State
  const [issues, setIssues] = useState(initialIssues);
  const [category, setCategory] = useState("Wrong Info");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  // STEP 4 — Submit Issue
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    const newIssue = {
      id: Date.now(),
      recipe: "Unknown Recipe", // Can be dynamic later
      category,
      description,
      status: "open",
      resolutionNote: ""
    };

    setIssues([newIssue, ...issues]);
    setDescription("");
  };

  // STEP 7 — Resolve Issue
  const handleResolve = (id) => {
    const note = prompt("Enter resolution note:");
    if (!note) return;

    const updatedIssues = issues.map((issue) =>
      issue.id === id
        ? { ...issue, status: "resolved", resolutionNote: note }
        : issue
    );

    setIssues(updatedIssues);
  };

  // Filter Logic
  const filteredIssues = issues.filter((issue) => {
    if (filter === "open") return issue.status === "open";
    if (filter === "resolved") return issue.status === "resolved";
    return true;
  });

  return (
    <div className="issue-container">
      <h1>⚠ Cultural Accuracy Issue Tracker</h1>

      {/* ================= FORM ================= */}
      <form className="issue-form" onSubmit={handleSubmit}>
        <h2>Report an Issue</h2>

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Wrong Info</option>
          <option>Missing Context</option>
          <option>Offensive</option>
          <option>Other</option>
        </select>

        <label>Description:</label>
        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit Issue</button>
      </form>

      {/* ================= FILTER ================= */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("open")}>Open</button>
        <button onClick={() => setFilter("resolved")}>Resolved</button>
      </div>

      {/* ================= DASHBOARD ================= */}
      <div className="issue-dashboard">
        <h2>Moderator Dashboard</h2>

        {filteredIssues.length === 0 && <p>No issues found.</p>}

        {filteredIssues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <h3>{issue.recipe}</h3>

            <p><strong>Category:</strong> {issue.category}</p>
            <p>{issue.description}</p>

            <span className={`badge ${issue.status}`}>
              {issue.status}
            </span>

            {issue.status === "open" && (
              <button onClick={() => handleResolve(issue.id)}>
                Resolve
              </button>
            )}

            {issue.status === "resolved" && (
              <p className="resolution">
                <strong>Resolution:</strong> {issue.resolutionNote}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}