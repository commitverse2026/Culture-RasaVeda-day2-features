import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function RecipeSubmission() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    region: "",
    language: "",
    dietary: "",
    ingredients: [""],
    steps: [""],
  });

  const [pending, setPending] = useState([]);

  // 🧠 handlers
  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const updateList = (key, index, value) => {
    const updated = [...form[key]];
    updated[index] = value;
    setForm({ ...form, [key]: updated });
  };

  const addRow = (key) => {
    setForm({ ...form, [key]: [...form[key], ""] });
  };

  const handleSubmit = () => {
    setPending([...pending, { ...form, status: "Pending" }]);

    // reset form
    setForm({
      name: "",
      region: "",
      language: "",
      dietary: "",
      ingredients: [""],
      steps: [""],
    });

    setStep(1);
  };

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>

      <h1>Community Recipe Submission Portal</h1>

      <div className="todo-box">
        Step {step} of 3
      </div>

      {/* 🔹 STEP 1 */}
      {step === 1 && (
        <div className="card">
          <h3>Basic Info</h3>

          <input
            placeholder="Recipe Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <input
            placeholder="Region"
            value={form.region}
            onChange={(e) => updateField("region", e.target.value)}
          />

          <input
            placeholder="Language"
            value={form.language}
            onChange={(e) => updateField("language", e.target.value)}
          />

          <input
            placeholder="Dietary Tag (Veg / Non-Veg)"
            value={form.dietary}
            onChange={(e) => updateField("dietary", e.target.value)}
          />
        </div>
      )}

      {/* 🔹 STEP 2 */}
      {step === 2 && (
        <div className="card">
          <h3>Ingredients</h3>

          {form.ingredients.map((ing, i) => (
            <input
              key={i}
              placeholder={`Ingredient ${i + 1}`}
              value={ing}
              onChange={(e) =>
                updateList("ingredients", i, e.target.value)
              }
            />
          ))}

          <button onClick={() => addRow("ingredients")}>
            + Add Ingredient
          </button>
        </div>
      )}

      {/* 🔹 STEP 3 */}
      {step === 3 && (
        <div className="card">
          <h3>Preparation Steps</h3>

          {form.steps.map((s, i) => (
            <input
              key={i}
              placeholder={`Step ${i + 1}`}
              value={s}
              onChange={(e) =>
                updateList("steps", i, e.target.value)
              }
            />
          ))}

          <button onClick={() => addRow("steps")}>
            + Add Step
          </button>

          {/* 🔍 REVIEW */}
          <div style={{ marginTop: "1rem" }}>
            <h4>Review</h4>
            <p><strong>{form.name}</strong> ({form.region})</p>
            <p>{form.dietary}</p>
          </div>
        </div>
      )}

      {/* 🔘 NAV BUTTONS */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>Back</button>
        )}

        {step < 3 ? (
          <button onClick={() => setStep(step + 1)}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>

      {/* ⏳ PENDING LIST */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Pending Recipes</h3>

        {pending.map((r, i) => (
          <div key={i} className="card">
            <strong>{r.name}</strong> — {r.region}
            <span className="tag">Pending</span>
          </div>
        ))}
      </div>
    </div>
  );
}