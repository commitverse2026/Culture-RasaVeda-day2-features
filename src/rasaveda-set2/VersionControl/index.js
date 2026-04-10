import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function VersionControl() {
  /*
=========================================================
 FEATURE: Recipe Version Control
 Difficulty: Hard
=========================================================

 GOAL:
Every time a recipe is edited, save a snapshot.
Show version history and allow comparing two versions.

---------------------------------------------------------
 REQUIREMENTS:
1. Static recipe object with editable fields
2. Edit form — user can change name, description, ingredients
3. On save, push current state as a new version into versions[]
4. Version history list showing version number, timestamp, summary
5. Select any two versions and show a side-by-side diff

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create initial recipe object in useState
STEP 2 — Create versions array in useState, seed with v1
STEP 3 — Render edit form with current recipe values
STEP 4 — On save, snapshot current recipe into versions[]
STEP 5 — Render version history list
STEP 6 — Allow selecting two versions for comparison
STEP 7 — Render side-by-side diff table

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Recipe edit form visible
✔ Saving creates a new version entry
✔ Version history shows version number and timestamp
✔ Selecting two versions shows what changed side by side
✔ Changed fields highlighted differently from unchanged

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Recipe Version Control</h1>

      <div className="todo-box">
        <p>Edit form + version history list + side-by-side diff view</p>
      </div>

      <div className="placeholder">📝 RecipeEditForm</div>
      <div className="placeholder">🕓 VersionHistoryList</div>
      <div className="placeholder">🔍 DiffViewer (side-by-side comparison)</div>
    </div>
  );
}
