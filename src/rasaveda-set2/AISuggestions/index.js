// AISuggestions.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// STEP 1: Static recipes array with ingredients[] and region
const allRecipes = [
  {
    id: 1,
    name: "Margherita Pizza",
    region: "Italy",
    ingredients: ["tomato", "mozzarella", "basil", "olive oil", "flour"],
    description: "Classic Neapolitan pizza with fresh basil and mozzarella.",
    image: "🍕",
  },
  {
    id: 2,
    name: "Pad Thai",
    region: "Thailand",
    ingredients: ["rice noodles", "shrimp", "tofu", "bean sprouts", "peanuts", "egg", "tamarind"],
    description: "Stir-fried rice noodle dish with sweet and tangy flavors.",
    image: "🍜",
  },
  {
    id: 3,
    name: "Sushi Roll",
    region: "Japan",
    ingredients: ["rice", "nori", "fish", "avocado", "cucumber", "soy sauce"],
    description: "Fresh seaweed rolls with fish and vegetables.",
    image: "🍣",
  },
  {
    id: 4,
    name: "Tacos al Pastor",
    region: "Mexico",
    ingredients: ["pork", "pineapple", "corn tortilla", "onion", "cilantro", "lime"],
    description: "Marinated pork tacos with pineapple and fresh salsa.",
    image: "🌮",
  },
  {
    id: 5,
    name: "Miso Soup",
    region: "Japan",
    ingredients: ["dashi", "miso paste", "tofu", "seaweed", "green onion"],
    description: "Traditional Japanese soup with umami flavor.",
    image: "🥣",
  },
  {
    id: 6,
    name: "Pasta Carbonara",
    region: "Italy",
    ingredients: ["pasta", "eggs", "pecorino", "pancetta", "black pepper"],
    description: "Creamy Roman pasta dish without cream.",
    image: "🍝",
  },
  {
    id: 7,
    name: "Green Curry",
    region: "Thailand",
    ingredients: ["coconut milk", "green curry paste", "chicken", "eggplant", "basil", "bamboo shoots"],
    description: "Spicy and creamy Thai curry with aromatic herbs.",
    image: "🍛",
  },
  {
    id: 8,
    name: "Guacamole",
    region: "Mexico",
    ingredients: ["avocado", "lime", "onion", "cilantro", "tomato", "jalapeno"],
    description: "Fresh avocado dip with lime and cilantro.",
    image: "🥑",
  },
];

export default function AISuggestions() {
  // STEP 2: useState for selectedRecipe
  const [selectedRecipe, setSelectedRecipe] = useState(allRecipes[0]);

  // STEP 3: Similarity score function
  const getSimilarRecipes = (recipe, recipes) => {
    return recipes
      .filter((r) => r.id !== recipe.id) // exclude current recipe
      .map((otherRecipe) => {
        // Count matching ingredients
        const sharedIngredients = otherRecipe.ingredients.filter((ingredient) =>
          recipe.ingredients.includes(ingredient)
        );
        const ingredientMatchCount = sharedIngredients.length;
        
        // Bonus point for same region
        const regionBonus = otherRecipe.region === recipe.region ? 1 : 0;
        
        // Total similarity score
        const similarityScore = ingredientMatchCount + regionBonus;
        
        return {
          ...otherRecipe,
          similarityScore,
          sharedIngredientCount: ingredientMatchCount,
        };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore) // sort by score descending
      .slice(0, 3); // return top 3
  };

  const similarRecipes = getSimilarRecipes(selectedRecipe, allRecipes);

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>AI-Powered Recipe Suggestion</h1>

      {/* Recipe Selector */}
      <div className="recipe-selector">
        <h3>Select a Recipe:</h3>
        <div className="recipe-buttons">
          {allRecipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className={selectedRecipe.id === recipe.id ? "active" : ""}
            >
              {recipe.image} {recipe.name}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 4: Selected Recipe Detail */}
      <div className="recipe-detail">
        <h2>📖 Recipe Details</h2>
        <div className="detail-card">
          <div className="recipe-icon-large">{selectedRecipe.image}</div>
          <h3>{selectedRecipe.name}</h3>
          <p className="region">🌍 Region: {selectedRecipe.region}</p>
          <p className="description">{selectedRecipe.description}</p>
          <div className="ingredients">
            <strong>🥕 Ingredients:</strong>
            <ul>
              {selectedRecipe.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* STEP 5 & 6: "You May Also Like" panel with top 3 suggestions */}
      <div className="you-may-also-like">
        <h2>🤖 You May Also Like</h2>
        {similarRecipes.length === 0 ? (
          <p>No similar recipes found.</p>
        ) : (
          <div className="suggestions-grid">
            {similarRecipes.map((recipe) => (
              <div key={recipe.id} className="suggestion-card">
                <div className="suggestion-icon">{recipe.image}</div>
                <h4>{recipe.name}</h4>
                <p className="region">🌍 {recipe.region}</p>
                <div className="match-score">
                  <span className="score-badge">
                    Match Score: {recipe.similarityScore}
                  </span>
                  <span className="shared-ingredients">
                    ({recipe.sharedIngredientCount} shared ingredients)
                  </span>
                </div>
                <button
                  className="view-recipe-btn"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  View Recipe
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="info-note">
        <p>
          💡 <strong>How similarity works:</strong> Score = matching ingredients + 
          bonus (1 point if same region). Higher score = more similar!
        </p>
      </div>
    </div>
  );
}