import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function AISuggestions() {
  /*
=========================================================
 FEATURE: AI-Powered Recipe Suggestion
 Difficulty: Hard
=========================================================

 GOAL:
A "You May Also Like" panel that suggests similar regional
dishes based on the current recipe's ingredients and region.

---------------------------------------------------------
 REQUIREMENTS:
1. Static recipes array with ingredients[] and region
2. Selected recipe detail page
3. Similarity score: count matching ingredients + same region
4. Top 3 most similar recipes shown in suggestion panel
5. Each suggestion card shows name, region and match score

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create recipes array with ingredients[] and region
STEP 2 — Add useState for selectedRecipe
STEP 3 — Write a getSimilarRecipes(recipe, allRecipes) function:
         - For each other recipe, count shared ingredients
         - Add bonus point for same region
         - Sort by score descending, return top 3
STEP 4 — Render selected recipe detail
STEP 5 — Render "You May Also Like" panel with top 3 suggestions
STEP 6 — Each suggestion shows name, region, match score

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Recipe selector or list visible
✔ Selecting a recipe shows its details
✔ "You May Also Like" panel shows 3 similar dishes
✔ Suggestions update when selected recipe changes
✔ Match score or shared ingredient count visible
=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>AI-Powered Recipe Suggestion</h1>

      <div className="todo-box">
        <p>Recipe detail + similarity function + You May Also Like panel</p>
      </div>

      <div className="placeholder">🍽️ RecipeDetail (selected recipe)</div>
      <div className="placeholder">🤖 YouMayAlsoLike panel (top 3 similar)</div>
      <div className="placeholder">📊 MatchScore on each suggestion card</div>
    </div>
  );
}
