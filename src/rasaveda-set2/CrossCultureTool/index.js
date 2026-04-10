import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function CrossCultureTool() {

  // STEP 1 — Recipes Data
  const recipes = [
    {
      name: "Biryani",
      region: "India",
      community: "Mughlai",
      dietary: "Non-Veg",
      ingredients: ["Rice", "Chicken", "Spices"],
      technique: "Dum Cooking",
      culture: "Festive dish served in celebrations"
    },
    {
      name: "Sushi",
      region: "Japan",
      community: "Japanese",
      dietary: "Non-Veg",
      ingredients: ["Rice", "Fish", "Seaweed"],
      technique: "Raw Preparation",
      culture: "Traditional Japanese delicacy"
    },
    {
      name: "Pasta",
      region: "Italy",
      community: "Italian",
      dietary: "Veg",
      ingredients: ["Wheat", "Tomato", "Cheese"],
      technique: "Boiling",
      culture: "Everyday comfort food"
    }
  ];

  // STEP 2 — State
  const [dishA, setDishA] = useState(null);
  const [dishB, setDishB] = useState(null);

  // STEP 3 — Table Rows
  const rows = [
    { label: "Name", key: "name" },
    { label: "Region", key: "region" },
    { label: "Community", key: "community" },
    { label: "Dietary Tag", key: "dietary" },
    { label: "Ingredients", key: "ingredients" },
    { label: "Cooking Technique", key: "technique" },
    { label: "Cultural Significance", key: "culture" }
  ];

  // STEP 4 — Match / Diff Logic
  const getStyle = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b)
      ? { color: "lightgreen", fontWeight: "bold" }
      : { color: "red" };
  };

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Cross-Culture Food Comparison Tool</h1>

      {/* Dish Selector A */}
      <div style={{ marginTop: "20px" }}>
        <h3>Dish Selector A</h3>
        <select onChange={(e) => {
          const dish = recipes.find(d => d.name === e.target.value);
          setDishA(dish);
        }}>
          <option value="">Select Dish</option>
          {recipes.map((dish, index) => (
            <option key={index} value={dish.name}>
              {dish.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dish Selector B */}
      <div style={{ marginTop: "20px" }}>
        <h3>Dish Selector B</h3>
        <select onChange={(e) => {
          const dish = recipes.find(d => d.name === e.target.value);
          setDishB(dish);
        }}>
          <option value="">Select Dish</option>
          {recipes.map((dish, index) => (
            <option key={index} value={dish.name}>
              {dish.name}
            </option>
          ))}
        </select>
      </div>

      {/* Comparison Table */}
      <div style={{ marginTop: "30px" }}>
        {!dishA || !dishB ? (
          <div className="placeholder">
            📊 Select both dishes to compare
          </div>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Property</th>
                <th>{dishA.name}</th>
                <th>{dishB.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const valA = dishA[row.key];
                const valB = dishB[row.key];

                return (
                  <tr key={index}>
                    <td>{row.label}</td>

                    <td style={getStyle(valA, valB)}>
                      {Array.isArray(valA) ? valA.join(", ") : valA}
                    </td>

                    <td style={getStyle(valB, valA)}>
                      {Array.isArray(valB) ? valB.join(", ") : valB}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}