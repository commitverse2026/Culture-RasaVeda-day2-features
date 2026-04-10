import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function MultilingualContribution() {

  // STEP 1 — Recipes array
  const [recipes, setRecipes] = useState([
    { id: 1, name: "Puran Poli", language: "Marathi", status: "pending_translation" },
    { id: 2, name: "Appam", language: "Tamil", status: "pending_translation" },
    { id: 3, name: "Rasgulla", language: "Bengali", status: "pending_translation" },
    { id: 4, name: "Khichdi", language: "Hindi", status: "translated" }
  ]);

  // STEP 2 — State
  const [selectedLanguage, setSelectedLanguage] = useState("Tamil");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [translation, setTranslation] = useState("");

  // STEP 4 — Filter pending recipes
  const pendingRecipes = recipes.filter(
    (r) =>
      r.status === "pending_translation" &&
      r.language === selectedLanguage
  );

  // STEP 6 — Submit handler
  const handleSubmit = () => {
    if (!translation || !selectedRecipe) return;

    const updatedRecipes = recipes.map((r) =>
      r.id === selectedRecipe.id
        ? { ...r, status: "translated" }
        : r
    );

    setRecipes(updatedRecipes);
    setSelectedRecipe(null);
    setTranslation("");
  };

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Multilingual Contribution Support</h1>

      <div className="todo-box">
        <p>Language selector + pending recipes list + translation form</p>
      </div>

      {/* STEP 3 — Language Selector */}
      <div className="placeholder">
        🌐 LanguageSelector
        <br /><br />
        <select
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            setSelectedRecipe(null);
          }}
        >
          <option>Tamil</option>
          <option>Bengali</option>
          <option>Marathi</option>
          <option>Hindi</option>
        </select>
      </div>

      {/* STEP 4 — Pending Recipes */}
      <div className="placeholder">
        📋 PendingRecipesList

        {pendingRecipes.length === 0 ? (
          <p style={{ marginTop: "10px" }}>No pending recipes</p>
        ) : (
          pendingRecipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                marginTop: "10px",
                padding: "8px",
                border: "1px solid rgba(255,153,51,0.2)",
                cursor: "pointer"
              }}
              onClick={() => setSelectedRecipe(recipe)}
            >
              {recipe.name}
            </div>
          ))
        )}
      </div>

      {/* STEP 5 — Translation Form */}
      <div className="placeholder">
        📝 TranslationForm

        {selectedRecipe ? (
          <>
            <p style={{ marginTop: "10px" }}>
              Translating: <b>{selectedRecipe.name}</b>
            </p>

            <textarea
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              placeholder="Enter translated version..."
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "8px",
                background: "#1a0d05",
                color: "#f5e6cc",
                border: "1px solid rgba(255,153,51,0.2)"
              }}
            />

            <button
              onClick={handleSubmit}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                background: "#FF9933",
                border: "none",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
          </>
        ) : (
          <p style={{ marginTop: "10px" }}>
            Select a recipe to translate
          </p>
        )}
      </div>
    </div>
  );
}