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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function CrossCultureTool() {
  // 📚 Static recipes data
  const recipes = [
    {
      name: "Biryani",
      region: "India",
      community: "Muslim",
      dietary: "Non-Veg",
      ingredients: "Rice, Chicken, Spices",
      technique: "Dum",
      significance: "Festive royal dish",
    },
    {
      name: "Sushi",
      region: "Japan",
      community: "Japanese",
      dietary: "Non-Veg",
      ingredients: "Rice, Fish",
      technique: "Assembly",
      significance: "Cultural staple",
    },
    {
      name: "Dal Tadka",
      region: "India",
      community: "North Indian",
      dietary: "Veg",
      ingredients: "Lentils, Spices",
      technique: "Tadka",
      significance: "Daily comfort food",
    },
  ];

  const [dishA, setDishA] = useState(null);
  const [dishB, setDishB] = useState(null);

  const rows = [
    { label: "Name", key: "name" },
    { label: "Region", key: "region" },
    { label: "Community", key: "community" },
    { label: "Dietary Tag", key: "dietary" },
    { label: "Ingredients", key: "ingredients" },
    { label: "Cooking Technique", key: "technique" },
    { label: "Cultural Significance", key: "significance" },
  ];

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>

      <h1 className="page-title">Cross-Culture Food Comparison Tool</h1>

      <p className="page-sub">
        <strong>Compare two dishes</strong> — Select any two dishes to see similarities and differences.
      </p>

      {/* 🔽 SELECTORS */}
      <div className="selector-row">
        <select
          onChange={(e) =>
            setDishA(recipes.find(r => r.name === e.target.value))
          }
        >
          <option>Select Dish A</option>
          {recipes.map((r) => (
            <option key={r.name}>{r.name}</option>
          ))}
        </select>

        <select
          onChange={(e) =>
            setDishB(recipes.find(r => r.name === e.target.value))
          }
        >
          <option>Select Dish B</option>
          {recipes.map((r) => (
            <option key={r.name}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* 📊 TABLE */}
      {dishA && dishB && (
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {rows.map((row) => {
                const valA = dishA[row.key];
                const valB = dishB[row.key];
                const match = valA === valB;

                return (
                  <tr key={row.key}>
                    <td style={{ fontWeight: "bold", color: "#ff9933" }}>
                      {row.label}
                    </td>

                    <td className={match ? "match" : "diff"}>
                      {valA}
                    </td>

                    <td className={match ? "match" : "diff"}>
                      {valB}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}