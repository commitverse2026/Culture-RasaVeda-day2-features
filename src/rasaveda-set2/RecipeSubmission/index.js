import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function RecipeSubmission() {
  /*
=========================================================
 FEATURE: Community Recipe Submission Portal
 Difficulty: Medium
=========================================================

 GOAL:
A multi-step form where users can submit a new recipe.
Submitted recipes go into "pending" state.

---------------------------------------------------------
 REQUIREMENTS:
1. Multi-step form — 3 steps:
   Step 1: Basic Info  (name, region, language, dietary tag)
   Step 2: Ingredients (list of ingredient inputs)
   Step 3: Steps       (preparation steps + review)
2. Next / Back buttons to navigate between steps
3. On final submit, add recipe to a local "pending" list
4. Show submitted recipes in a "Pending Recipes" section

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Add useState for currentStep (1, 2, or 3)
STEP 2 — Add useState for formData object
STEP 3 — Render form fields based on currentStep
STEP 4 — Next button advances step, Back button goes back
STEP 5 — On submit, push recipe into pendingRecipes array
STEP 6 — Show pendingRecipes list below the form

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Step indicator shows which step user is on (1/2/3)
✔ Step 1 fields: name, region, language, dietary tag
✔ Step 2 fields: ingredients (add/remove rows)
✔ Step 3 fields: preparation steps + summary review
✔ Submit adds recipe to pending list with "Pending" badge
✔ Pending recipes list visible below form

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Community Recipe Submission Portal</h1>

      <div className="todo-box">
        <p>Multi-step form (3 steps) + pending recipes list</p>
      </div>

      <div className="placeholder">📋 StepIndicator (Step 1 / 2 / 3)</div>
      <div className="placeholder">📝 Step1 — Basic Info</div>
      <div className="placeholder">🧂 Step2 — Ingredients</div>
      <div className="placeholder">👨‍🍳 Step3 — Preparation Steps + Review</div>
      <div className="placeholder">⏳ PendingRecipesList</div>
    </div>
  );
}
