import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function TaggingSystem() {
  // STEP 1 — TAG STATE
  const [tags, setTags] = useState([
    { name: "Spicy", category: "Taste" },
    { name: "Sweet", category: "Taste" },
    { name: "Festival", category: "Occasion" },
  ]);

  // STEP 2 — RECIPES
  const [recipes] = useState([
    {
      id: 1,
      name: "Paneer Butter Masala",
      tags: ["Spicy"],
    },
    {
      id: 2,
      name: "Gulab Jamun",
      tags: ["Sweet", "Festival"],
    },
    {
      id: 3,
      name: "Biryani",
      tags: ["Spicy", "Festival"],
    },
  ]);

  // STEP 6 — SELECTED TAG
  const [selectedTag, setSelectedTag] = useState("");

  // FORM STATE
  const [tagName, setTagName] = useState("");
  const [category, setCategory] = useState("Taste");

  // STEP 4 — ADD TAG
  const handleAddTag = () => {
    if (!tagName.trim()) return;

    setTags([...tags, { name: tagName, category }]);
    setTagName("");
  };

  // STEP 7 — FILTER RECIPES
  const filteredRecipes = selectedTag
    ? recipes.filter((r) => r.tags.includes(selectedTag))
    : recipes;

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>

      <h1>Food Culture Tagging System</h1>

      {/* FORM */}
      <div className="form-box">
        <input
          type="text"
          placeholder="Enter tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Taste">Taste</option>
          <option value="Occasion">Occasion</option>
          <option value="Region">Region</option>
        </select>

        <button onClick={handleAddTag}>Add Tag</button>
      </div>

      {/* TAG PILLS LIST */}
      <div className="tags-container">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`tag-pill ${
              selectedTag === tag.name ? "active" : ""
            }`}
            onClick={() =>
              setSelectedTag(
                selectedTag === tag.name ? "" : tag.name
              )
            }
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* RECIPES */}
      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.name}</h3>

            <div className="recipe-tags">
              {recipe.tags.map((tag, i) => (
                <span
                  key={i}
                  className="tag-pill small"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}