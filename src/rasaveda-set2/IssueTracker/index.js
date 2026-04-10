import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function IssueTracker() {
  /*
=========================================================
 FEATURE: Issue Tracker for Cultural Accuracy
 Difficulty: Medium
=========================================================

 GOAL:
Users flag inaccuracies on recipe pages.
Moderators review and resolve open issues.

---------------------------------------------------------
 REQUIREMENTS:
1. Static issues array with: recipe, category, description, status
2. Issue submission panel — category dropdown + description field
3. On submit, add new issue to issues list with "open" status
4. Moderator dashboard showing all open issues
5. "Resolve" button closes the issue with a resolution note

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create issues array with sample data
STEP 2 — Add useState for issues and form fields
STEP 3 — Render issue submission form with:
         - Category: Wrong Info / Missing Context / Offensive / Other
         - Description textarea
STEP 4 — On submit, push new issue into issues with status: "open"
STEP 5 — Render moderator dashboard with open issues list
STEP 6 — Each issue has a "Resolve" button
STEP 7 — Clicking Resolve prompts for resolution note, updates status to "resolved"

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Issue submission form visible with category and description
✔ Submitting adds issue to the open issues list
✔ Open issues dashboard shows all pending issues
✔ Resolve button prompts for resolution note
✔ Resolved issues show "Resolved" badge and resolution note
✔ Open vs resolved issues filterable

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Issue Tracker for Cultural Accuracy</h1>

      <div className="todo-box">
        <p>Issue submission form + open issues dashboard + resolve action</p>
      </div>

      <div className="placeholder">🚩 IssueSubmissionForm (category + description)</div>
      <div className="placeholder">📋 OpenIssuesDashboard</div>
      <div className="placeholder">✅ ResolveButton + resolution note</div>
    </div>
  );
}
