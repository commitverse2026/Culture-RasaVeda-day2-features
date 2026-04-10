import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function SubstitutionEngine() {
  /*
=========================================================
 FEATURE: Ingredient Substitution Engine
 Difficulty: Medium
=========================================================

 GOAL:
On a recipe detail page, show a "Find Substitute" modal
that suggests alternatives for each ingredient.

---------------------------------------------------------
 REQUIREMENTS:
1. Static recipe with ingredients list
2. Each ingredient has a "Find Substitute" button
3. Clicking opens a modal showing substitute options
4. Each substitute shows: name + context note
5. Suggestion form — users can submit a new substitute

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create recipe object with ingredients[]
STEP 2 — Create substitutes map { ingredientName: [subs] }
STEP 3 — Add useState for modalOpen and selectedIngredient
STEP 4 — Render recipe detail with ingredient list
STEP 5 — Clicking "Find Substitute" opens modal
STEP 6 — Modal shows substitutes for that ingredient
STEP 7 — Add suggestion form inside modal

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Recipe ingredients list visible
✔ Each ingredient has a "Find Substitute" button
✔ Modal opens with substitute options and context notes
✔ Suggestion form lets user submit a new substitute
✔ Submitted substitute appears in the modal list


=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Ingredient Substitution Engine</h1>

      <div className="todo-box">
        <p>Recipe ingredients + Find Substitute modal + suggestion form</p>
      </div>

      <div className="placeholder">🧂 IngredientsList with "Find Substitute" buttons</div>
      <div className="placeholder">🔲 SubstituteModal</div>
      <div className="placeholder">📝 SuggestionForm inside modal</div>
    </div>
  );
}
