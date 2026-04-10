import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const RECIPES = [
  {
    id: 1,
    name: "Rogan Josh",
    region: "Kashmir",
    cuisine: "Kashmiri",
    dietaryTag: "Non-Veg",
    cookTime: "90 min",
    description: "A slow-cooked aromatic lamb curry enriched with Kashmiri spices and dried flowers.",
    ingredients: ["lamb", "kashmiri chili", "yogurt", "fennel", "ginger", "cardamom", "cloves", "cinnamon"],
    tags: ["slow-cook", "festive", "winter"],
  },
  {
    id: 2,
    name: "Dum Aloo",
    region: "Kashmir",
    cuisine: "Kashmiri",
    dietaryTag: "Veg",
    cookTime: "45 min",
    description: "Baby potatoes fried golden and simmered in a spiced yogurt gravy.",
    ingredients: ["baby potatoes", "kashmiri chili", "yogurt", "fennel", "ginger", "cardamom", "cloves"],
    tags: ["vegetarian", "festive"],
  },
  {
    id: 3,
    name: "Butter Chicken",
    region: "Punjab",
    cuisine: "North Indian",
    dietaryTag: "Non-Veg",
    cookTime: "60 min",
    description: "Tender tandoor-kissed chicken in a velvety tomato-butter-cream sauce.",
    ingredients: ["chicken", "tomato", "butter", "cream", "ginger", "garlic", "cardamom", "cinnamon", "cumin"],
    tags: ["creamy", "popular", "mughlai"],
  },
  {
    id: 4,
    name: "Sarson Ka Saag",
    region: "Punjab",
    cuisine: "North Indian",
    dietaryTag: "Veg",
    cookTime: "75 min",
    description: "Mustard greens slow-cooked with spices, served with makki di roti and white butter.",
    ingredients: ["mustard greens", "spinach", "ginger", "garlic", "butter", "cumin", "onion"],
    tags: ["winter", "traditional"],
  },
  {
    id: 5,
    name: "Masala Dosa",
    region: "Karnataka",
    cuisine: "South Indian",
    dietaryTag: "Veg",
    cookTime: "40 min",
    description: "Paper-thin fermented rice crepe wrapped around spiced potato masala.",
    ingredients: ["rice", "urad dal", "potato", "mustard seeds", "curry leaves", "turmeric", "onion", "ginger"],
    tags: ["breakfast", "crispy", "fermented"],
  },
  {
    id: 6,
    name: "Bisi Bele Bath",
    region: "Karnataka",
    cuisine: "South Indian",
    dietaryTag: "Veg",
    cookTime: "55 min",
    description: "Karnataka's beloved one-pot rice and lentil dish with tamarind and spices.",
    ingredients: ["rice", "toor dal", "tamarind", "mustard seeds", "curry leaves", "turmeric", "onion", "ghee"],
    tags: ["one-pot", "comfort", "traditional"],
  },
  {
    id: 7,
    name: "Hyderabadi Biryani",
    region: "Telangana",
    cuisine: "Hyderabadi",
    dietaryTag: "Non-Veg",
    cookTime: "120 min",
    description: "Fragrant basmati layered with marinated meat and saffron, sealed and dum-cooked.",
    ingredients: ["basmati rice", "chicken", "yogurt", "saffron", "cardamom", "cloves", "cinnamon", "onion", "ginger", "garlic"],
    tags: ["festive", "dum", "royal"],
  },
  {
    id: 8,
    name: "Pesarattu",
    region: "Telangana",
    cuisine: "Andhra",
    dietaryTag: "Veg",
    cookTime: "30 min",
    description: "Protein-rich green moong dal crepes topped with ginger and served with chutney.",
    ingredients: ["green moong dal", "rice", "ginger", "cumin", "onion", "curry leaves"],
    tags: ["breakfast", "protein-rich", "healthy"],
  },
  {
    id: 9,
    name: "Pav Bhaji",
    region: "Maharashtra",
    cuisine: "Maharashtrian",
    dietaryTag: "Veg",
    cookTime: "40 min",
    description: "Tangy mashed vegetable medley served sizzling with butter-toasted pav buns.",
    ingredients: ["potato", "tomato", "onion", "butter", "pav bhaji masala", "peas", "capsicum", "ginger", "garlic"],
    tags: ["street food", "popular", "quick"],
  },
  {
    id: 10,
    name: "Puran Poli",
    region: "Maharashtra",
    cuisine: "Maharashtrian",
    dietaryTag: "Veg",
    cookTime: "60 min",
    description: "Sweet flatbread stuffed with jaggery-sweetened chana dal, served with ghee.",
    ingredients: ["wheat flour", "chana dal", "jaggery", "cardamom", "ghee", "turmeric"],
    tags: ["festive", "sweet", "traditional"],
  },
  {
    id: 11,
    name: "Laal Maas",
    region: "Rajasthan",
    cuisine: "Rajasthani",
    dietaryTag: "Non-Veg",
    cookTime: "90 min",
    description: "Bold mutton curry blazing with mathania chilies and yogurt, a Rajput warrior dish.",
    ingredients: ["mutton", "mathania chili", "yogurt", "garlic", "ginger", "cardamom", "cloves", "cinnamon", "onion"],
    tags: ["spicy", "festive", "royal"],
  },
  {
    id: 12,
    name: "Dal Baati Churma",
    region: "Rajasthan",
    cuisine: "Rajasthani",
    dietaryTag: "Veg",
    cookTime: "80 min",
    description: "Sun-baked wheat balls with five-lentil dal and sweetened churma — Rajasthan's pride.",
    ingredients: ["wheat flour", "toor dal", "chana dal", "ghee", "jaggery", "cardamom", "cumin", "turmeric"],
    tags: ["festive", "traditional", "baked"],
  },
  {
    id: 13,
    name: "Macher Jhol",
    region: "West Bengal",
    cuisine: "Bengali",
    dietaryTag: "Non-Veg",
    cookTime: "45 min",
    description: "Light, golden fish curry fragrant with mustard oil and panch phoron spices.",
    ingredients: ["rohu fish", "mustard oil", "turmeric", "cumin", "tomato", "ginger", "potato", "onion"],
    tags: ["light", "everyday", "bengali"],
  },
  {
    id: 14,
    name: "Mishti Doi",
    region: "West Bengal",
    cuisine: "Bengali",
    dietaryTag: "Veg",
    cookTime: "480 min",
    description: "Caramelized sweet yogurt set overnight in terracotta pots — Bengali dessert art.",
    ingredients: ["full-fat milk", "jaggery", "yogurt culture", "cardamom"],
    tags: ["dessert", "fermented", "sweet"],
  },
  {
    id: 15,
    name: "Thepla",
    region: "Gujarat",
    cuisine: "Gujarati",
    dietaryTag: "Veg",
    cookTime: "30 min",
    description: "Spiced fenugreek flatbread, Gujarat's beloved travel companion and everyday snack.",
    ingredients: ["wheat flour", "fenugreek leaves", "yogurt", "turmeric", "cumin", "sesame seeds", "ginger"],
    tags: ["snack", "travel", "healthy"],
  },
  {
    id: 16,
    name: "Undhiyu",
    region: "Gujarat",
    cuisine: "Gujarati",
    dietaryTag: "Veg",
    cookTime: "75 min",
    description: "A Makar Sankranti winter special cooked upside-down with seasonal vegetables.",
    ingredients: ["purple yam", "raw banana", "eggplant", "fenugreek", "coconut", "sesame seeds", "ginger", "garlic"],
    tags: ["festive", "winter", "traditional"],
  },
];

function getSimilarRecipes(selected, allRecipes) {
  const maxScore = selected.ingredients.length + 3;
  return allRecipes
    .filter((r) => r.id !== selected.id)
    .map((r) => {
      const sharedIngredients = selected.ingredients.filter((ing) =>
        r.ingredients.includes(ing)
      );
      const regionBonus = r.region === selected.region ? 2 : 0;
      const dietBonus = r.dietaryTag === selected.dietaryTag ? 1 : 0;
      const score = sharedIngredients.length + regionBonus + dietBonus;
      const matchPct = Math.min(100, Math.round((score / maxScore) * 100));
      return { ...r, score, sharedIngredients, matchPct };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

const DIET_COLORS = {
  Veg: { bg: "rgba(76,175,80,0.15)", border: "rgba(76,175,80,0.5)", text: "#81c784" },
  "Non-Veg": { bg: "rgba(244,67,54,0.15)", border: "rgba(244,67,54,0.5)", text: "#e57373" },
};

export default function AISuggestions() {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDiet, setFilterDiet] = useState("All");

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.region.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase());
      const matchDiet = filterDiet === "All" || r.dietaryTag === filterDiet;
      return matchSearch && matchDiet;
    });
  }, [search, filterDiet]);

  const selected = RECIPES.find((r) => r.id === selectedId) || null;
  const suggestions = useMemo(
    () => (selected ? getSimilarRecipes(selected, RECIPES) : []),
    [selected]
  );

  return (
    <div className="feature-page ai-page">
      <Link to="/" className="page-back">← Back to Home</Link>

      <div className="ai-header">
        <div className="ai-header-text">
          <h1>AI-Powered Recipe Suggestions</h1>
          <p className="ai-subtitle">
            Discover similar regional dishes using ingredient-based similarity scoring.
            Select any recipe to reveal your personalised "You May Also Like" panel.
          </p>
        </div>
        <div className="ai-stats">
          <div className="stat-pill">
            <span className="stat-num">{RECIPES.length}</span>
            <span className="stat-label">Recipes</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">
              {[...new Set(RECIPES.map((r) => r.region))].length}
            </span>
            <span className="stat-label">Regions</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">AI</span>
            <span className="stat-label">Similarity</span>
          </div>
        </div>
      </div>

      {/* How it works banner */}
      <div className="how-it-works">
        <span className="hiw-step"><span className="hiw-icon">🍽️</span> Select a recipe</span>
        <span className="hiw-arrow">→</span>
        <span className="hiw-step"><span className="hiw-icon">🤖</span> AI scores similarity</span>
        <span className="hiw-arrow">→</span>
        <span className="hiw-step"><span className="hiw-icon">✨</span> Discover top 3 matches</span>
      </div>

      <div className="ai-layout">
        {/* LEFT PANEL — Recipe Browser */}
        <div className="browser-panel">
          <div className="browser-controls">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="recipe-search"
                type="text"
                placeholder="Search by name, region or cuisine…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-btn" onClick={() => setSearch("")}>✕</button>
              )}
            </div>
            <div className="diet-filters">
              {["All", "Veg", "Non-Veg"].map((d) => (
                <button
                  key={d}
                  className={`diet-btn${filterDiet === d ? " active" : ""}`}
                  onClick={() => setFilterDiet(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <p className="result-count">
            {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} found
            {selectedId && (
              <span className="selected-badge">
                ✓ {RECIPES.find((r) => r.id === selectedId)?.name} selected
              </span>
            )}
          </p>

          <div className="recipe-grid">
            {filtered.map((r) => {
              const isSelected = r.id === selectedId;
              const dc = DIET_COLORS[r.dietaryTag];
              return (
                <button
                  key={r.id}
                  className={`recipe-card${isSelected ? " selected" : ""}`}
                  onClick={() => setSelectedId(r.id)}
                >
                  <div className="rc-top">
                    <span className="rc-name">{r.name}</span>
                    <span
                      className="rc-diet"
                      style={{ color: dc.text, background: dc.bg, border: `1px solid ${dc.border}` }}
                    >
                      {r.dietaryTag === "Veg" ? "🌿 Veg" : "🍖 Non-Veg"}
                    </span>
                  </div>
                  <div className="rc-meta">
                    <span className="rc-region">📍 {r.region}</span>
                    <span className="rc-time">⏱ {r.cookTime}</span>
                  </div>
                  <p className="rc-desc">{r.description}</p>
                  {isSelected && <div className="selected-indicator">Selected ✓</div>}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">🍴</span>
              <p>No recipes match your search.</p>
              <button className="clear-all-btn" onClick={() => { setSearch(""); setFilterDiet("All"); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANEL — Detail + Suggestions */}
        <div className="detail-panel">
          {!selected ? (
            <div className="detail-empty">
              <div className="de-icon">🤖</div>
              <h2>Select a Recipe</h2>
              <p>Click any recipe card on the left to see its details and get AI-powered similar dish suggestions.</p>
              <div className="de-hint">
                <span>Tip:</span> The AI scores similarity using shared ingredients, same region, and dietary match.
              </div>
            </div>
          ) : (
            <>
              {/* Recipe Detail Card */}
              <div className="recipe-detail">
                <div className="rd-header">
                  <div>
                    <h2 className="rd-name">{selected.name}</h2>
                    <div className="rd-badges">
                      <span className="badge badge-region">📍 {selected.region}</span>
                      <span className="badge badge-cuisine">🍴 {selected.cuisine}</span>
                      <span
                        className="badge"
                        style={{
                          color: DIET_COLORS[selected.dietaryTag].text,
                          background: DIET_COLORS[selected.dietaryTag].bg,
                          border: `1px solid ${DIET_COLORS[selected.dietaryTag].border}`,
                        }}
                      >
                        {selected.dietaryTag === "Veg" ? "🌿 Veg" : "🍖 Non-Veg"}
                      </span>
                      <span className="badge badge-time">⏱ {selected.cookTime}</span>
                    </div>
                  </div>
                </div>
                <p className="rd-desc">{selected.description}</p>
                <div className="rd-ingredients">
                  <h4 className="rd-section-title">Ingredients</h4>
                  <div className="ingredient-chips">
                    {selected.ingredients.map((ing) => (
                      <span key={ing} className="ing-chip">{ing}</span>
                    ))}
                  </div>
                </div>
                <div className="rd-tags">
                  {selected.tags.map((t) => (
                    <span key={t} className="tag-pill">#{t}</span>
                  ))}
                </div>
              </div>

              {/* You May Also Like */}
              <div className="suggestions-section">
                <div className="sug-header">
                  <h3 className="sug-title">
                    <span className="sug-icon">✨</span>
                    You May Also Like
                  </h3>
                  <span className="sug-sub">AI-scored by ingredient overlap, region & diet</span>
                </div>

                <div className="suggestion-cards">
                  {suggestions.map((sug, idx) => {
                    const dc = DIET_COLORS[sug.dietaryTag];
                    const medals = ["🥇", "🥈", "🥉"];
                    return (
                      <div key={sug.id} className="suggestion-card">
                        <div className="sc-rank">{medals[idx]}</div>
                        <div className="sc-body">
                          <div className="sc-top">
                            <div>
                              <span className="sc-name">{sug.name}</span>
                              <div className="sc-meta">
                                <span className="sc-region">📍 {sug.region}</span>
                                <span
                                  className="sc-diet"
                                  style={{ color: dc.text }}
                                >
                                  {sug.dietaryTag === "Veg" ? "🌿" : "🍖"} {sug.dietaryTag}
                                </span>
                              </div>
                            </div>
                            <div className="sc-score-wrap">
                              <span className="sc-score-num">{sug.matchPct}%</span>
                              <span className="sc-score-label">match</span>
                            </div>
                          </div>

                          {/* Match bar */}
                          <div className="match-bar-track">
                            <div
                              className="match-bar-fill"
                              style={{ width: `${sug.matchPct}%` }}
                            />
                          </div>

                          {/* Shared ingredients */}
                          {sug.sharedIngredients.length > 0 && (
                            <div className="sc-shared">
                              <span className="sc-shared-label">Shared:</span>
                              {sug.sharedIngredients.slice(0, 5).map((ing) => (
                                <span key={ing} className="sc-ing-chip">{ing}</span>
                              ))}
                              {sug.sharedIngredients.length > 5 && (
                                <span className="sc-ing-more">+{sug.sharedIngredients.length - 5}</span>
                              )}
                            </div>
                          )}

                          {/* Why suggested */}
                          <div className="sc-reasons">
                            {sug.sharedIngredients.length > 0 && (
                              <span className="reason-tag">
                                🧂 {sug.sharedIngredients.length} shared ingredient{sug.sharedIngredients.length !== 1 ? "s" : ""}
                              </span>
                            )}
                            {sug.region === selected.region && (
                              <span className="reason-tag region-reason">📍 Same region</span>
                            )}
                            {sug.dietaryTag === selected.dietaryTag && (
                              <span className="reason-tag diet-reason">
                                {sug.dietaryTag === "Veg" ? "🌿" : "🍖"} Same diet
                              </span>
                            )}
                          </div>

                          <p className="sc-desc">{sug.description}</p>

                          <button
                            className="sc-explore-btn"
                            onClick={() => setSelectedId(sug.id)}
                          >
                            Explore this recipe →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {suggestions.length === 0 && (
                  <div className="no-suggestions">
                    No similar recipes found for this selection.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
