import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function TaggingSystem() {
  // Initial tags
  const initialTags = [
    { id: 1, name: "Vegetarian", category: "Dietary" },
    { id: 2, name: "Non-Vegetarian", category: "Dietary" },
    { id: 3, name: "Spicy", category: "Heat Level" },
    { id: 4, name: "Mild", category: "Heat Level" },
    { id: 5, name: "Festival", category: "Occasion" },
    { id: 6, name: "Street Food", category: "Type" },
    { id: 7, name: "Traditional", category: "Style" },
    { id: 8, name: "Regional", category: "Style" },
  ];

  // Initial recipes with tags
  const initialRecipes = [
    {
      id: 1,
      name: "Butter Chicken",
      region: "Punjab",
      image: "🍗",
      tags: ["Non-Vegetarian", "Spicy", "Traditional"],
      rating: 4.8,
      preparations: 45,
    },
    {
      id: 2,
      name: "Paneer Tikka",
      region: "North India",
      image: "🧀",
      tags: ["Vegetarian", "Spicy", "Street Food"],
      rating: 4.6,
      preparations: 30,
    },
    {
      id: 3,
      name: "Sambar",
      region: "Tamil Nadu",
      image: "🍲",
      tags: ["Vegetarian", "Spicy", "Regional", "Traditional"],
      rating: 4.7,
      preparations: 60,
    },
    {
      id: 4,
      name: "Biryani",
      region: "Hyderabad",
      image: "🍚",
      tags: ["Non-Vegetarian", "Spicy", "Festival", "Traditional"],
      rating: 4.9,
      preparations: 90,
    },
    {
      id: 5,
      name: "Masala Dosa",
      region: "Karnataka",
      image: "🥘",
      tags: ["Vegetarian", "Mild", "Street Food", "Regional"],
      rating: 4.5,
      preparations: 20,
    },
    {
      id: 6,
      name: "Rogan Josh",
      region: "Kashmir",
      image: "🍲",
      tags: ["Non-Vegetarian", "Spicy", "Festival", "Traditional"],
      rating: 4.8,
      preparations: 75,
    },
    {
      id: 7,
      name: "Aloo Gobi",
      region: "Punjab",
      image: "🥔",
      tags: ["Vegetarian", "Mild", "Traditional", "Regional"],
      rating: 4.4,
      preparations: 25,
    },
    {
      id: 8,
      name: "Chole Bhature",
      region: "Delhi",
      image: "🍝",
      tags: ["Vegetarian", "Spicy", "Street Food"],
      rating: 4.7,
      preparations: 35,
    },
  ];

  const [tags, setTags] = useState(initialTags);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagCategory, setNewTagCategory] = useState("Dietary");
  const [showForm, setShowForm] = useState(false);

  const categories = ["Dietary", "Heat Level", "Occasion", "Type", "Style", "Cuisine", "Season"];

  // Add new tag
  const handleAddTag = () => {
    if (!newTagName.trim()) {
      alert("Please enter a tag name");
      return;
    }

    // Check if tag already exists
    if (tags.some((t) => t.name.toLowerCase() === newTagName.toLowerCase())) {
      alert("This tag already exists!");
      return;
    }

    const newTag = {
      id: Math.max(...tags.map((t) => t.id), 0) + 1,
      name: newTagName,
      category: newTagCategory,
    };

    setTags([...tags, newTag]);
    setNewTagName("");
    setShowForm(false);
  };

  // Toggle tag filter
  const toggleTagFilter = (tagName) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  };

  // Filter recipes based on selected tags
  const filteredRecipes =
    selectedTags.length === 0
      ? recipes
      : recipes.filter((recipe) =>
          selectedTags.every((tag) => recipe.tags.includes(tag))
        );

  // Group tags by category
  const tagsByCategory = {};
  tags.forEach((tag) => {
    if (!tagsByCategory[tag.category]) {
      tagsByCategory[tag.category] = [];
    }
    tagsByCategory[tag.category].push(tag);
  });

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">
        ← Back
      </Link>
      <h1>🏷️ Food Culture Tagging System</h1>
      <p className="subtitle">
        Organize recipes with dynamic tags. Filter and explore by dietary preferences, cuisine style, and more.
      </p>

      {/* Tag Creation Section */}
      <section className="tag-creation-section">
        <div className="section-header">
          <h2>Create New Tag</h2>
          <button
            className="toggle-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✕ Cancel" : "+ New Tag"}
          </button>
        </div>

        {showForm && (
          <div className="tag-form">
            <div className="form-row">
              <div className="form-group">
                <label>Tag Name</label>
                <input
                  type="text"
                  placeholder="e.g., Gluten-Free, Authentic, etc."
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newTagCategory}
                  onChange={(e) => setNewTagCategory(e.target.value)}
                  className="form-select"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={handleAddTag} className="add-tag-btn">
              Add Tag
            </button>
          </div>
        )}
      </section>

      {/* Tags By Category Section */}
      <section className="tags-section">
        <h2>Tags Library ({tags.length})</h2>
        <div className="tags-by-category">
          {Object.entries(tagsByCategory).map(([category, categoryTags]) => (
            <div key={category} className="category-group">
              <h3 className="category-title">{category}</h3>
              <div className="tags-pill-list">
                {categoryTags.map((tag) => (
                  <button
                    key={tag.id}
                    className={`tag-pill ${
                      selectedTags.includes(tag.name) ? "active" : ""
                    }`}
                    onClick={() => toggleTagFilter(tag.name)}
                  >
                    <span className="tag-name">{tag.name}</span>
                    <span className="tag-count">
                      {recipes.filter((r) => r.tags.includes(tag.name)).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Info */}
      {selectedTags.length > 0 && (
        <div className="filter-info">
          <span className="filter-label">Active Filters:</span>
          <div className="active-tags">
            {selectedTags.map((tag) => (
              <button
                key={tag}
                className="active-tag-badge"
                onClick={() => toggleTagFilter(tag)}
              >
                {tag} ✕
              </button>
            ))}
          </div>
          <button
            className="clear-filters-btn"
            onClick={() => setSelectedTags([])}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Recipe Cards Section */}
      <section className="recipes-section">
        <div className="recipes-header">
          <h2>
            {selectedTags.length > 0
              ? `Recipes Found (${filteredRecipes.length})`
              : `All Recipes (${filteredRecipes.length})`}
          </h2>
          {selectedTags.length > 0 && (
            <span className="filter-count">
              Showing results for: {selectedTags.join(", ")}
            </span>
          )}
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="no-recipes">
            <p>No recipes found for the selected tags. Try different filters!</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image">{recipe.image}</div>
                <div className="recipe-content">
                  <h3 className="recipe-name">{recipe.name}</h3>
                  <p className="recipe-region">📍 {recipe.region}</p>
                  <div className="recipe-meta">
                    <span className="meta-item">⭐ {recipe.rating}</span>
                    <span className="meta-item">⏱️ {recipe.preparations}min</span>
                  </div>
                  <div className="recipe-tags">
                    {recipe.tags.map((tag) => (
                      <button
                        key={tag}
                        className={`recipe-tag-pill ${
                          selectedTags.includes(tag) ? "selected" : ""
                        }`}
                        onClick={() => toggleTagFilter(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
