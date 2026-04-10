import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function NutritionMapper() {

  // STEP 1 — Nutrition Database
  const nutritionDB = {
    Rice: { cal: 130, protein: 2, carbs: 28, fat: 0 },
    Chicken: { cal: 165, protein: 31, carbs: 0, fat: 4 },
    Spices: { cal: 20, protein: 1, carbs: 4, fat: 0 },
    Fish: { cal: 120, protein: 22, carbs: 0, fat: 3 },
    Seaweed: { cal: 30, protein: 2, carbs: 5, fat: 0 },
    Wheat: { cal: 110, protein: 4, carbs: 23, fat: 1 },
    Tomato: { cal: 20, protein: 1, carbs: 5, fat: 0 },
    Cheese: { cal: 150, protein: 7, carbs: 2, fat: 12 }
  };

  // STEP 2 — Recipes
  const recipes = [
    {
      name: "Biryani",
      ingredients: ["Rice", "Chicken", "Spices"]
    },
    {
      name: "Sushi",
      ingredients: ["Rice", "Fish", "Seaweed"]
    },
    {
      name: "Pasta",
      ingredients: ["Wheat", "Tomato", "Cheese"]
    }
  ];

  // STEP 3 — State
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [servings, setServings] = useState(1);

  // STEP 4 — Calculate Nutrition
  const calculateNutrition = () => {
    if (!selectedRecipe) return null;

    let total = { cal: 0, protein: 0, carbs: 0, fat: 0 };

    selectedRecipe.ingredients.forEach((item) => {
      const data = nutritionDB[item];
      if (data) {
        total.cal += data.cal;
        total.protein += data.protein;
        total.carbs += data.carbs;
        total.fat += data.fat;
      }
    });

    // Multiply by servings
    return {
      cal: total.cal * servings,
      protein: total.protein * servings,
      carbs: total.carbs * servings,
      fat: total.fat * servings
    };
  };

  const nutrition = calculateNutrition();

  // Progress bar helper
  const barStyle = (value) => ({
    width: `${Math.min(value, 100)}%`,
    height: "10px",
    background: "lightgreen",
    marginTop: "5px"
  });

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Nutrition Mapper</h1>

      {/* STEP 5 — Recipe Selector */}
      <div style={{ marginTop: "20px" }}>
        <h3>Select Recipe</h3>
        <select onChange={(e) => {
          const recipe = recipes.find(r => r.name === e.target.value);
          setSelectedRecipe(recipe);
        }}>
          <option value="">Select Recipe</option>
          {recipes.map((r, i) => (
            <option key={i} value={r.name}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* STEP 7 — Serving Selector */}
      <div style={{ marginTop: "20px" }}>
        <h3>Servings</h3>
        <input
          type="number"
          min="1"
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
        />
      </div>

      {/* STEP 6 — Nutrition Card */}
      <div style={{ marginTop: "30px" }}>
        {!nutrition ? (
          <div className="placeholder">
            🍽️ Select a recipe to view nutrition
          </div>
        ) : (
          <div className="card">
            <h2>{selectedRecipe.name} Nutrition</h2>

            <p>Calories: {nutrition.cal}</p>
            <div style={barStyle(nutrition.cal)}></div>

            <p>Protein: {nutrition.protein}g</p>
            <div style={barStyle(nutrition.protein)}></div>

            <p>Carbs: {nutrition.carbs}g</p>
            <div style={barStyle(nutrition.carbs)}></div>

            <p>Fat: {nutrition.fat}g</p>
            <div style={barStyle(nutrition.fat)}></div>
          </div>
        )}
      </div>
    </div>
  );
}