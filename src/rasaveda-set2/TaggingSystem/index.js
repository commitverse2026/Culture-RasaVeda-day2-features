import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function TaggingSystem() {
  /*
=========================================================
 FEATURE: Food Culture Tagging System
 Difficulty: Medium
=========================================================

 GOAL:
Admins create tags. Tags appear as clickable pills on
recipe cards. Clicking a tag filters recipes by that tag.

---------------------------------------------------------
 REQUIREMENTS:
1. Static recipes array, each with tags[]
2. Tag creation form — input + category dropdown + Add button
3. All created tags shown as pills
4. Recipe cards show their tags as clickable pills
5. Clicking a tag pill filters all recipes with that tag

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create tags array in useState with sample tags
STEP 2 — Create recipes array with tags[] field
STEP 3 — Add tag creation form
STEP 4 — On create, push new tag into tags array
STEP 5 — Render recipe cards with tag pills
STEP 6 — Add selectedTag state
STEP 7 — Clicking a tag pill sets selectedTag and filters recipes

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Tag creation form visible with category dropdown
✔ Created tags appear in tags list
✔ Recipe cards show tag pills
✔ Clicking a tag pill filters recipe grid
✔ Active tag pill visually highlighted

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Food Culture Tagging System</h1>

      <div className="todo-box">
        <p>Tag creation form + recipe cards with clickable tag pills</p>
      </div>

      <div className="placeholder">🏷️ TagCreationForm</div>
      <div className="placeholder">💊 TagPillsList</div>
      <div className="placeholder">🃏 RecipeCards with tag pills</div>
    </div>
  );
}
