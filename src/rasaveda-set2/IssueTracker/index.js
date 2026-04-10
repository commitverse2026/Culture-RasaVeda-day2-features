import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { INITIAL_ISSUES, FLAG_CATEGORIES } from "./issuesSeed";
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
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  const [filter, setFilter] = useState("open");
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState(FLAG_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState("");

  const [resolveTarget, setResolveTarget] = useState(null);
  const [resolutionDraft, setResolutionDraft] = useState("");
  const [resolveError, setResolveError] = useState("");

  const filtered = useMemo(() => {
    if (filter === "all") return issues;
    return issues.filter((i) => i.status === filter);
  }, [issues, filter]);

  const openCount = useMemo(() => issues.filter((i) => i.status === "open").length, [issues]);
  const resolvedCount = useMemo(
    () => issues.filter((i) => i.status === "resolved").length,
    [issues]
  );

  const submitFlag = (e) => {
    e.preventDefault();
    setFormError("");
    if (!recipeName.trim()) {
      setFormError("Enter the recipe name you are flagging.");
      return;
    }
    if (!description.trim()) {
      setFormError("Describe the inaccuracy or concern.");
      return;
    }

    const row = {
      id: `iss-${Date.now()}`,
      recipe: recipeName.trim(),
      category,
      description: description.trim(),
      status: "open",
      resolutionNote: "",
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };

    setIssues((prev) => [row, ...prev]);
    setRecipeName("");
    setCategory(FLAG_CATEGORIES[0]);
    setDescription("");
    setToast("Issue submitted for moderator review.");
    window.setTimeout(() => setToast(""), 3200);
  };

  const openResolve = (issue) => {
    setResolveTarget(issue);
    setResolutionDraft("");
    setResolveError("");
  };

  const closeResolveModal = () => {
    setResolveTarget(null);
    setResolutionDraft("");
    setResolveError("");
  };

  const confirmResolve = () => {
    const note = resolutionDraft.trim();
    if (!note) {
      setResolveError("Add a short resolution note for the record.");
      return;
    }
    setIssues((prev) =>
      prev.map((i) =>
        i.id === resolveTarget.id
          ? {
              ...i,
              status: "resolved",
              resolutionNote: note,
              resolvedAt: new Date().toISOString(),
            }
          : i
      )
    );
    closeResolveModal();
    setToast("Issue marked resolved.");
    window.setTimeout(() => setToast(""), 2800);
  };

  return (
    <div className="it-page">
      <Link to="/" className="it-back">
        ← Back
      </Link>

      <header className="it-header">
        <p className="it-eyebrow">Feature 7 · Cultural accuracy</p>
        <h1>Issue tracker</h1>
        <p className="it-lede">
          Flag inaccuracies on recipe pages. Moderators review open reports, attach a resolution note, and
          close the loop — all in this demo workspace.
        </p>
      </header>

      {toast && (
        <div className="it-toast" role="status">
          {toast}
        </div>
      )}

      <div className="it-layout">
        <section className="it-card it-card--form" aria-labelledby="flag-heading">
          <h2 id="flag-heading" className="it-card-title">
            Report an issue
          </h2>
          <p className="it-card-sub">
            Which recipe is affected, what kind of problem is it, and what should reviewers know?
          </p>
          <form className="it-form" onSubmit={submitFlag}>
            {formError && (
              <div className="it-error" role="alert">
                {formError}
              </div>
            )}
            <label className="it-label">
              Recipe name
              <input
                className="it-input"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="e.g. Hyderabadi Biryani"
                autoComplete="off"
              />
            </label>
            <label className="it-label">
              Category
              <select
                className="it-input it-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {FLAG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="it-label">
              Description
              <textarea
                className="it-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Be specific: which line, claim, or omission is wrong?"
                rows={5}
              />
            </label>
            <button type="submit" className="it-btn it-btn--primary">
              Submit issue
            </button>
          </form>
        </section>

        <section className="it-card it-card--dash" aria-labelledby="dash-heading">
          <div className="it-dash-head">
            <div>
              <h2 id="dash-heading" className="it-card-title">
                Moderator dashboard
              </h2>
              <p className="it-card-sub it-card-sub--tight">
                {openCount} open · {resolvedCount} resolved · {issues.length} total
              </p>
            </div>
          </div>

          <div className="it-filters" role="tablist" aria-label="Filter by status">
            {[
              { key: "open", label: "Open" },
              { key: "resolved", label: "Resolved" },
              { key: "all", label: "All" },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={filter === key}
                className={"it-filter" + (filter === key ? " is-active" : "")}
                onClick={() => setFilter(key)}
              >
                {label}
                {key === "open" && openCount > 0 && (
                  <span className="it-filter-count">{openCount}</span>
                )}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="it-empty">No issues in this view.</p>
          ) : (
            <ul className="it-issue-list">
              {filtered.map((issue) => (
                <li key={issue.id} className="it-issue">
                  <div className="it-issue-top">
                    <span className={"it-status it-status--" + issue.status}>{issue.status}</span>
                    <span className="it-cat-pill">{issue.category}</span>
                  </div>
                  <h3 className="it-recipe">{issue.recipe}</h3>
                  <p className="it-desc">{issue.description}</p>
                  <p className="it-meta">
                    Reported {new Date(issue.createdAt).toLocaleString()}
                    {issue.resolvedAt && (
                      <>
                        {" "}
                        · Resolved {new Date(issue.resolvedAt).toLocaleString()}
                      </>
                    )}
                  </p>
                  {issue.status === "resolved" && issue.resolutionNote && (
                    <div className="it-resolution">
                      <span className="it-resolution-label">Resolution</span>
                      <p className="it-resolution-text">{issue.resolutionNote}</p>
                    </div>
                  )}
                  {issue.status === "open" && (
                    <button
                      type="button"
                      className="it-btn it-btn--ghost it-btn--sm"
                      onClick={() => openResolve(issue)}
                    >
                      Resolve
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {resolveTarget && (
        <div className="it-modal-root" role="dialog" aria-modal="true" aria-labelledby="resolve-title">
          <div className="it-modal-backdrop" onClick={closeResolveModal} aria-hidden />
          <div className="it-modal">
            <h2 id="resolve-title" className="it-modal-title">
              Resolve issue
            </h2>
            <p className="it-modal-recipe">
              <strong>{resolveTarget.recipe}</strong> — {resolveTarget.category}
            </p>
            <label className="it-label">
              Resolution note
              <textarea
                className="it-textarea"
                value={resolutionDraft}
                onChange={(e) => setResolutionDraft(e.target.value)}
                placeholder="What was changed or decided? This is shown with the resolved badge."
                rows={4}
                autoFocus
              />
            </label>
            {resolveError && (
              <div className="it-error it-error--compact" role="alert">
                {resolveError}
              </div>
            )}
            <div className="it-modal-actions">
              <button type="button" className="it-btn it-btn--ghost" onClick={closeResolveModal}>
                Cancel
              </button>
              <button type="button" className="it-btn it-btn--primary" onClick={confirmResolve}>
                Mark resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
