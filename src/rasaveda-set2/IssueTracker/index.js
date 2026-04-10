import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const initialIssues = [
  {
    id: 1,
    recipe: "Hyderabadi Biryani",
    category: "Wrong Info",
    description: "The spice mix mentions turmeric, which is not used in this family version.",
    status: "open",
    resolutionNote: ""
  },
  {
    id: 2,
    recipe: "Avial",
    category: "Missing Context",
    description: "Please add note about temple-feast and sadya variations across Kerala.",
    status: "open",
    resolutionNote: ""
  },
  {
    id: 3,
    recipe: "Sarson da Saag",
    category: "Other",
    description: "The article would benefit from a note on winter harvest traditions.",
    status: "resolved",
    resolutionNote: "Moderator added seasonal context and updated the cultural background section."
  }
];

const recipeOptions = [
  "Hyderabadi Biryani",
  "Avial",
  "Khaman Dhokla",
  "Thukpa",
  "Sarson da Saag"
];

const categoryOptions = ["Wrong Info", "Missing Context", "Offensive", "Other"];
const filterOptions = ["All", "Open", "Resolved"];

export default function IssueTracker() {
  const [issues, setIssues] = useState(initialIssues);
  const [recipe, setRecipe] = useState(recipeOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [description, setDescription] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredIssues = useMemo(() => {
    if (activeFilter === "All") {
      return issues;
    }

    return issues.filter(
      (issue) => issue.status === activeFilter.toLowerCase()
    );
  }, [activeFilter, issues]);

  const openIssues = issues.filter((issue) => issue.status === "open").length;
  const resolvedIssues = issues.filter((issue) => issue.status === "resolved").length;

  function handleSubmit(event) {
    event.preventDefault();

    if (!description.trim()) {
      return;
    }

    const newIssue = {
      id: Date.now(),
      recipe,
      category,
      description: description.trim(),
      status: "open",
      resolutionNote: ""
    };

    setIssues((currentIssues) => [newIssue, ...currentIssues]);
    setDescription("");
    setActiveFilter("Open");
  }

  function handleResolve(issueId) {
    const resolutionNote = window.prompt("Add a resolution note for this issue:");

    if (!resolutionNote || !resolutionNote.trim()) {
      return;
    }

    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === issueId
          ? {
              ...issue,
              status: "resolved",
              resolutionNote: resolutionNote.trim()
            }
          : issue
      )
    );
  }

  return (
    <div className="feature-page issue-tracker-page">
      <Link to="/" className="page-back">
        ← Back
      </Link>

      <section className="tracker-hero">
        <div>
          <p className="eyebrow">Moderation Workflow</p>
          <h1>Issue Tracker for Cultural Accuracy</h1>
          <p className="hero-copy">
            Let contributors flag questionable food history, missing context,
            or culturally sensitive concerns, then help moderators resolve them clearly.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span>Open Issues</span>
            <strong>{openIssues}</strong>
          </div>
          <div className="stat-card">
            <span>Resolved</span>
            <strong>{resolvedIssues}</strong>
          </div>
        </div>
      </section>

      <section className="tracker-grid">
        <form className="submission-card" onSubmit={handleSubmit}>
          <div className="section-heading">
            <h2>Submit an Issue</h2>
            <p>Flag inaccurate, incomplete, or sensitive content for moderator review.</p>
          </div>

          <label className="form-field">
            <span>Recipe</span>
            <select value={recipe} onChange={(event) => setRecipe(event.target.value)}>
              {recipeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Description</span>
            <textarea
              rows="5"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the issue clearly so moderators can verify and resolve it."
            />
          </label>

          <button type="submit" className="submit-button" disabled={!description.trim()}>
            Submit Issue
          </button>
        </form>

        <section className="dashboard-card">
          <div className="dashboard-top">
            <div className="section-heading">
              <h2>Moderator Dashboard</h2>
              <p>Review open issues, resolve them with a note, and inspect past decisions.</p>
            </div>

            <div className="filter-chips">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-chip ${activeFilter === option ? "active" : ""}`}
                  onClick={() => setActiveFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="issues-list">
            {filteredIssues.map((issue) => (
              <article key={issue.id} className="issue-card">
                <div className="issue-card-top">
                  <div>
                    <h3>{issue.recipe}</h3>
                    <p className="issue-meta">{issue.category}</p>
                  </div>
                  <span className={`status-badge ${issue.status}`}>
                    {issue.status === "open" ? "Open" : "Resolved"}
                  </span>
                </div>

                <p className="issue-description">{issue.description}</p>

                {issue.status === "resolved" ? (
                  <div className="resolution-note">
                    <strong>Resolution Note</strong>
                    <p>{issue.resolutionNote}</p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="resolve-button"
                    onClick={() => handleResolve(issue.id)}
                  >
                    Resolve
                  </button>
                )}
              </article>
            ))}

            {filteredIssues.length === 0 ? (
              <div className="empty-state">
                <h3>No issues in this filter</h3>
                <p>Try another filter or submit a new moderation item.</p>
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </div>
  );
}
