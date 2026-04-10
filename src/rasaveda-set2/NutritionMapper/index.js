import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function NutritionMapper() {
  /*
=========================================================
 FEATURE: Nutrition Mapper for Traditional Dishes
 Difficulty: Medium
=========================================================

 GOAL:
Show a nutrition info card on each recipe showing
calories, protein, carbs and fat per serving.

---------------------------------------------------------
 REQUIREMENTS:
1. Static nutrition database mapping ingredient → values
2. Static recipes with ingredients[]
3. Calculate total nutrition by summing ingredient values
4. Nutrition card shows: calories, protein, carbs, fat
5. Selecting a different serving size scales the values

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create nutritionDB object { ingredientName: { cal, protein, carbs, fat } }
STEP 2 — Create recipes array with ingredients[]
STEP 3 — Add useState for selectedRecipe and servings
STEP 4 — Calculate total nutrition for selected recipe
STEP 5 — Render recipe selector dropdown
STEP 6 — Render nutrition card with calculated values
STEP 7 — Add serving size selector that scales values

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Recipe selector dropdown visible
✔ Nutrition card shows calories, protein, carbs, fat
✔ Values update when recipe is changed
✔ Serving size selector scales all values correctly
✔ Each nutrient shown with a progress bar

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Nutrition Mapper for Traditional Dishes</h1>

      <div className="todo-box">
        <p>Recipe selector + nutrition card with serving size scaler</p>
      </div>

      <div className="placeholder">🍽️ RecipeSelector dropdown</div>
      <div className="placeholder">🥗 NutritionCard (cal / protein / carbs / fat)</div>
      <div className="placeholder">📊 NutrientProgressBars</div>
      <div className="placeholder">⚖️ ServingSizeSelector</div>
    </div>
  );
}
