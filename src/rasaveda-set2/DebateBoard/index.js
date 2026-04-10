import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function DebateBoard() {
  /*
=========================================================
 FEATURE: Debate & Dispute Board
 Difficulty: Medium
=========================================================

 GOAL:
Community members open debate threads on dishes.
Moderators can close debates with a resolution note.

---------------------------------------------------------
 REQUIREMENTS:
1. Static debates array with: dish, claim, status, replies[]
2. Debate listing page showing open and closed threads
3. Clicking a debate opens it with all replies
4. Reply form — users can add arguments with citations
5. Close debate button (moderator) adds a resolution note

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create debates array with sample data
STEP 2 — Add useState for selectedDebate
STEP 3 — Render debate list with open/closed status badges
STEP 4 — Clicking a debate opens its thread view
STEP 5 — Render replies with author and argument
STEP 6 — Add reply form with argument and citation fields
STEP 7 — Add "Close Debate" button that prompts for resolution note

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Debate list shows dish name, claim, status badge
✔ Open debates clickable, closed debates greyed out
✔ Thread view shows all replies
✔ Reply form adds new argument to thread
✔ Close button opens resolution input and marks debate closed

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Debate & Dispute Board</h1>

      <div className="todo-box">
        <p>Debate list + thread view + reply form + close debate</p>
      </div>

      <div className="placeholder">📋 DebateList (open/closed badges)</div>
      <div className="placeholder">💬 ThreadView with replies</div>
      <div className="placeholder">📝 ReplyForm</div>
      <div className="placeholder">🔒 CloseDebate button + resolution note</div>
    </div>
  );
}
