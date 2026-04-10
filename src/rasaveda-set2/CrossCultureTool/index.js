import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const recipes = [
  {
    id: "biryani",
    name: "Hyderabadi Biryani",
    region: "Telangana",
    community: "Hyderabadi Muslim",
    dietaryTag: "Non-Vegetarian",
    ingredients: [
      "Basmati rice",
      "Mutton",
      "Yogurt",
      "Saffron",
      "Mint",
      "Fried onions"
    ],
    cookingTechnique: "Dum cooking in sealed handi",
    culturalSignificance:
      "Served during celebrations and weddings as a symbol of layered royal food traditions."
  },
  {
    id: "avial",
    name: "Avial",
    region: "Kerala",
    community: "Malayali",
    dietaryTag: "Vegetarian",
    ingredients: [
      "Raw banana",
      "Yam",
      "Pumpkin",
      "Coconut",
      "Curry leaves",
      "Curd"
    ],
    cookingTechnique: "Slow simmering vegetables with coconut paste",
    culturalSignificance:
      "A festive sadya staple that represents balance, thrift, and seasonal abundance."
  },
  {
    id: "dhokla",
    name: "Khaman Dhokla",
    region: "Gujarat",
    community: "Gujarati",
    dietaryTag: "Vegetarian",
    ingredients: [
      "Gram flour",
      "Yogurt",
      "Green chilli",
      "Mustard seeds",
      "Curry leaves",
      "Sugar"
    ],
    cookingTechnique: "Steaming fermented batter",
    culturalSignificance:
      "A popular snack that reflects Gujarat's preference for light, tangy, and travel-friendly foods."
  },
  {
    id: "thukpa",
    name: "Thukpa",
    region: "Ladakh",
    community: "Tibetan Buddhist",
    dietaryTag: "Can Be Vegetarian",
    ingredients: [
      "Wheat noodles",
      "Carrot",
      "Spring onion",
      "Stock",
      "Garlic",
      "Pepper"
    ],
    cookingTechnique: "Broth simmering with noodles and vegetables",
    culturalSignificance:
      "A warming mountain meal shaped by climate, trade routes, and monastic food traditions."
  },
  {
    id: "sarson",
    name: "Sarson da Saag",
    region: "Punjab",
    community: "Punjabi",
    dietaryTag: "Vegetarian",
    ingredients: [
      "Mustard greens",
      "Spinach",
      "Bathua",
      "Ginger",
      "Makki atta",
      "White butter"
    ],
    cookingTechnique: "Slow cooking greens and hand-mashing",
    culturalSignificance:
      "Closely tied to winter harvest cycles and agrarian home cooking in Punjab."
  }
];

const fields = [
  { key: "name", label: "Name" },
  { key: "region", label: "Region" },
  { key: "community", label: "Community" },
  { key: "dietaryTag", label: "Dietary Tag" },
  { key: "ingredients", label: "Ingredients" },
  { key: "cookingTechnique", label: "Cooking Technique" },
  { key: "culturalSignificance", label: "Cultural Significance" }
];

function formatValue(value) {
  return Array.isArray(value) ? value.join(", ") : value;
}

function normalizeValue(value) {
  return Array.isArray(value)
    ? value.map((item) => item.toLowerCase()).sort().join("|")
    : String(value).toLowerCase().trim();
}

export default function CrossCultureTool() {
  const [dishAId, setDishAId] = useState(recipes[0].id);
  const [dishBId, setDishBId] = useState(recipes[1].id);

  const dishA = useMemo(
    () => recipes.find((recipe) => recipe.id === dishAId) || recipes[0],
    [dishAId]
  );
  const dishB = useMemo(
    () => recipes.find((recipe) => recipe.id === dishBId) || recipes[1],
    [dishBId]
  );

  const comparisonRows = useMemo(() => {
    return fields.map((field) => {
      const valueA = dishA[field.key];
      const valueB = dishB[field.key];
      const matches = normalizeValue(valueA) === normalizeValue(valueB);

      return {
        label: field.label,
        valueA: formatValue(valueA),
        valueB: formatValue(valueB),
        matches
      };
    });
  }, [dishA, dishB]);

  const matchCount = comparisonRows.filter((row) => row.matches).length;

  return (
    <div className="feature-page comparison-page">
      <Link to="/" className="page-back">
        ← Back
      </Link>

      <section className="comparison-hero">
        <div>
          <p className="eyebrow">Shared Roots, Distinct Plates</p>
          <h1>Cross-Culture Food Comparison Tool</h1>
          <p className="hero-copy">
            Compare two dishes side by side to spot shared ingredients,
            regional identity, cooking methods, and cultural meaning.
          </p>
        </div>

        <div className="summary-card">
          <span className="summary-label">Matching Fields</span>
          <strong>{matchCount}</strong>
          <p>
            {matchCount === comparisonRows.length
              ? "These dishes align across every comparison row."
              : `${comparisonRows.length - matchCount} fields reveal meaningful differences.`}
          </p>
        </div>
      </section>

      <section className="selector-panel">
        <div className="selector-grid">
          <label className="selector-field">
            <span>Dish A</span>
            <select
              value={dishAId}
              onChange={(event) => setDishAId(event.target.value)}
            >
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.name}
                </option>
              ))}
            </select>
          </label>

          <label className="selector-field">
            <span>Dish B</span>
            <select
              value={dishBId}
              onChange={(event) => setDishBId(event.target.value)}
            >
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="legend-row">
          <span className="legend-chip match">Matching values</span>
          <span className="legend-chip different">Different values</span>
        </div>
      </section>

      <section className="comparison-table-card">
        <div className="comparison-table">
          <div className="comparison-header comparison-row">
            <span>Field</span>
            <span>{dishA.name}</span>
            <span>{dishB.name}</span>
          </div>

          {comparisonRows.map((row) => (
            <div key={row.label} className="comparison-row">
              <div className="field-label">{row.label}</div>
              <div className={`value-cell ${row.matches ? "match" : "different"}`}>
                {row.valueA}
              </div>
              <div className={`value-cell ${row.matches ? "match" : "different"}`}>
                {row.valueB}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}