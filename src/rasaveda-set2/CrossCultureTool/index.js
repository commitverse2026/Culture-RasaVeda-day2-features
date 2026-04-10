import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function CrossCultureTool() {
  /*
=========================================================
 FEATURE: Cross-Culture Food Comparison Tool
 Difficulty: Medium
=========================================================

 GOAL:
Select any two dishes and view a side-by-side comparison
table covering ingredients, region, dietary tags and more.

---------------------------------------------------------
 REQUIREMENTS:
1. Static recipes array with full details
2. Two dropdown selectors — Dish A and Dish B
3. Side-by-side comparison table with rows:
   - Name, Region, Community, Dietary Tag,
   - Ingredients, Cooking Technique, Cultural Significance
4. Matching values highlighted in green, differences in red

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create recipes array with all fields
STEP 2 — Add useState for dishA and dishB
STEP 3 — Render two dropdown selectors
STEP 4 — Define comparison rows array
STEP 5 — Render comparison table with two columns
STEP 6 — For each row, compare dishA and dishB values
STEP 7 — Apply green style if values match, red if different

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Two dropdown selectors visible
✔ Selecting dishes populates the comparison table
✔ Table shows all comparison rows
✔ Matching fields highlighted green
✔ Different fields highlighted red

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Cross-Culture Food Comparison Tool</h1>

      <div className="todo-box">
        <p>Two dish selectors + side-by-side comparison table with match highlights</p>
      </div>

      <div className="placeholder">🔽 DishSelector A + DishSelector B</div>
      <div className="placeholder">📊 ComparisonTable (match = green, diff = red)</div>
    </div>
  );
}
