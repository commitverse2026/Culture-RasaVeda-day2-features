import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function SubstitutionEngine() {
  // 🧾 Recipe
  const recipe = {
    name: "Paneer Butter Masala",
    ingredients: ["Paneer", "Butter", "Cream", "Tomato"],
  };

  // 🔁 Substitutes map
  const [subs, setSubs] = useState({
    Paneer: [
      { name: "Tofu", note: "Vegan alternative" },
      { name: "Cottage Cheese", note: "Similar texture" },
    ],
    Butter: [
      { name: "Ghee", note: "Richer flavor" },
      { name: "Oil", note: "Lighter option" },
    ],
    Cream: [
      { name: "Coconut Milk", note: "Vegan substitute" },
    ],
    Tomato: [
      { name: "Tomato Puree", note: "Smoother texture" },
    ],
  });

  const [selected, setSelected] = useState(null);
  const [newSub, setNewSub] = useState("");
  const [note, setNote] = useState("");

  // ➕ Add new substitute
  const addSubstitute = () => {
    if (!newSub) return;

    const updated = {
      ...subs,
      [selected]: [
        ...(subs[selected] || []),
        { name: newSub, note },
      ],
    };

    setSubs(updated);
    setNewSub("");
    setNote("");
  };

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>

      <h1>Ingredient Substitution Engine</h1>

      <div className="todo-box">
        Find substitutes for ingredients + suggest your own
      </div>

      {/* 🧂 INGREDIENT LIST */}
      <div className="card">
        <h3>{recipe.name}</h3>

        {recipe.ingredients.map((ing) => (
          <div key={ing} className="ingredient-row">
            <span>{ing}</span>

            <button onClick={() => setSelected(ing)}>
              Find Substitute
            </button>
          </div>
        ))}
      </div>

      {/* 🔲 MODAL */}
      {selected && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Substitutes for {selected}</h3>

            {/* 📋 LIST */}
            {(subs[selected] || []).map((s, i) => (
              <div key={i} className="card">
                <strong>{s.name}</strong>
                <p style={{ opacity: 0.6 }}>{s.note}</p>
              </div>
            ))}

            {/* 📝 ADD FORM */}
            <h4>Add Suggestion</h4>

            <input
              placeholder="Substitute name"
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
            />

            <input
              placeholder="Note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <button onClick={addSubstitute}>Add</button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}