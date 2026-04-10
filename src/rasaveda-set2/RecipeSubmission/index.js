import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const initialForm = () => ({
  name: "",
  region: "",
  language: "",
  dietaryTag: "",
  ingredients: [""],
  preparationSteps: [""],
});

const DIETARY_OPTIONS = [
  "",
  "Vegetarian",
  "Vegan",
  "Non-Veg",
  "Eggetarian",
  "Jain",
  "Satvik",
];

export default function RecipeSubmission() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [pendingRecipes, setPendingRecipes] = useState([]);
  const [formError, setFormError] = useState("");

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFormError("");
  };

  const setIngredientAt = (index, value) => {
    setFormData((prev) => {
      const next = [...prev.ingredients];
      next[index] = value;
      return { ...prev, ingredients: next };
    });
    setFormError("");
  };

  const addIngredientRow = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredientRow = (index) => {
    setFormData((prev) => {
      if (prev.ingredients.length <= 1) return prev;
      const next = prev.ingredients.filter((_, i) => i !== index);
      return { ...prev, ingredients: next.length ? next : [""] };
    });
  };

  const setStepAt = (index, value) => {
    setFormData((prev) => {
      const next = [...prev.preparationSteps];
      next[index] = value;
      return { ...prev, preparationSteps: next };
    });
    setFormError("");
  };

  const addPrepStepRow = () => {
    setFormData((prev) => ({
      ...prev,
      preparationSteps: [...prev.preparationSteps, ""],
    }));
  };

  const removePrepStepRow = (index) => {
    setFormData((prev) => {
      if (prev.preparationSteps.length <= 1) return prev;
      const next = prev.preparationSteps.filter((_, i) => i !== index);
      return { ...prev, preparationSteps: next.length ? next : [""] };
    });
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setFormError("Please enter a recipe name.");
      return false;
    }
    if (!formData.region.trim()) {
      setFormError("Please enter a region.");
      return false;
    }
    if (!formData.language.trim()) {
      setFormError("Please enter a language.");
      return false;
    }
    if (!formData.dietaryTag) {
      setFormError("Please select a dietary tag.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const filled = formData.ingredients.map((s) => s.trim()).filter(Boolean);
    if (filled.length === 0) {
      setFormError("Add at least one ingredient.");
      return false;
    }
    return true;
  };

  const validateSubmit = () => {
    const filled = formData.preparationSteps.map((s) => s.trim()).filter(Boolean);
    if (filled.length === 0) {
      setFormError("Add at least one preparation step.");
      return false;
    }
    return true;
  };

  const goNext = () => {
    setFormError("");
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setFormError("");
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!validateSubmit()) return;

    const recipe = {
      id: `pending-${Date.now()}`,
      status: "pending",
      submittedAt: new Date().toISOString(),
      name: formData.name.trim(),
      region: formData.region.trim(),
      language: formData.language.trim(),
      dietaryTag: formData.dietaryTag,
      ingredients: formData.ingredients.map((s) => s.trim()).filter(Boolean),
      preparationSteps: formData.preparationSteps.map((s) => s.trim()).filter(Boolean),
    };

    setPendingRecipes((prev) => [recipe, ...prev]);
    setFormData(initialForm());
    setCurrentStep(1);
    setFormError("");
  };

  const stepsMeta = [
    { n: 1, label: "Basic info" },
    { n: 2, label: "Ingredients" },
    { n: 3, label: "Steps & review" },
  ];

  return (
    <div className="rs-page">
      <Link to="/" className="rs-back">
        ← Back
      </Link>

      <header className="rs-header">
        <p className="rs-eyebrow">Feature 12 · Community</p>
        <h1>Recipe submission portal</h1>
        <p className="rs-lede">
          Share a dish in three steps. Submissions stay in a local pending queue until
          moderators review them (demo: stored only in this browser session).
        </p>
      </header>

      <section className="rs-card" aria-label="Submit a recipe">
        <div className="rs-stepper" role="navigation" aria-label="Form progress">
          {stepsMeta.map(({ n, label }) => (
            <div
              key={n}
              className={
                "rs-step-dot-wrap" +
                (n === currentStep ? " is-current" : "") +
                (n < currentStep ? " is-done" : "")
              }
            >
              <div className="rs-step-dot" aria-current={n === currentStep ? "step" : undefined}>
                {n < currentStep ? "✓" : n}
              </div>
              <span className="rs-step-label">{label}</span>
              {n < 3 && <div className="rs-step-connector" aria-hidden />}
            </div>
          ))}
        </div>
        <p className="rs-step-banner">
          Step <strong>{currentStep}</strong> of 3 — {stepsMeta[currentStep - 1].label}
        </p>

        <form className="rs-form" onSubmit={handleFinalSubmit}>
          {formError && (
            <div className="rs-error" role="alert">
              {formError}
            </div>
          )}

          {currentStep === 1 && (
            <div className="rs-fields">
              <label className="rs-label">
                Recipe name <span className="rs-req">*</span>
                <input
                  className="rs-input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Mysore Masala Dosa"
                  autoComplete="off"
                />
              </label>
              <label className="rs-label">
                Region <span className="rs-req">*</span>
                <input
                  className="rs-input"
                  type="text"
                  value={formData.region}
                  onChange={(e) => updateField("region", e.target.value)}
                  placeholder="e.g. Karnataka"
                />
              </label>
              <label className="rs-label">
                Language <span className="rs-req">*</span>
                <input
                  className="rs-input"
                  type="text"
                  value={formData.language}
                  onChange={(e) => updateField("language", e.target.value)}
                  placeholder="e.g. Kannada, English"
                />
              </label>
              <label className="rs-label">
                Dietary tag <span className="rs-req">*</span>
                <select
                  className="rs-input rs-select"
                  value={formData.dietaryTag}
                  onChange={(e) => updateField("dietaryTag", e.target.value)}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {DIETARY_OPTIONS.filter(Boolean).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {currentStep === 2 && (
            <div className="rs-fields">
              <p className="rs-hint">Add one ingredient per line. Empty rows are ignored on submit.</p>
              <ul className="rs-dynamic-list">
                {formData.ingredients.map((ing, i) => (
                  <li key={`ing-${i}`} className="rs-dynamic-row">
                    <input
                      className="rs-input"
                      type="text"
                      value={ing}
                      onChange={(e) => setIngredientAt(i, e.target.value)}
                      placeholder={`Ingredient ${i + 1}`}
                      aria-label={`Ingredient ${i + 1}`}
                    />
                    <button
                      type="button"
                      className="rs-icon-btn"
                      onClick={() => removeIngredientRow(i)}
                      disabled={formData.ingredients.length <= 1}
                      aria-label="Remove ingredient"
                    >
                      −
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" className="rs-btn rs-btn--ghost" onClick={addIngredientRow}>
                + Add ingredient
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="rs-fields">
              <p className="rs-hint">Describe how to cook the dish. Review your answers below before submitting.</p>
              <ol className="rs-dynamic-list rs-steps-list">
                {formData.preparationSteps.map((step, i) => (
                  <li key={`step-${i}`} className="rs-dynamic-row rs-dynamic-row--stack">
                    <span className="rs-step-num">{i + 1}</span>
                    <textarea
                      className="rs-textarea"
                      value={step}
                      onChange={(e) => setStepAt(i, e.target.value)}
                      placeholder={`Step ${i + 1}…`}
                      rows={3}
                      aria-label={`Preparation step ${i + 1}`}
                    />
                    <button
                      type="button"
                      className="rs-icon-btn"
                      onClick={() => removePrepStepRow(i)}
                      disabled={formData.preparationSteps.length <= 1}
                      aria-label="Remove step"
                    >
                      −
                    </button>
                  </li>
                ))}
              </ol>
              <button type="button" className="rs-btn rs-btn--ghost" onClick={addPrepStepRow}>
                + Add step
              </button>

              <div className="rs-review">
                <h2 className="rs-review-title">Review</h2>
                <dl className="rs-review-dl">
                  <dt>Name</dt>
                  <dd>{formData.name.trim() || "—"}</dd>
                  <dt>Region</dt>
                  <dd>{formData.region.trim() || "—"}</dd>
                  <dt>Language</dt>
                  <dd>{formData.language.trim() || "—"}</dd>
                  <dt>Dietary</dt>
                  <dd>{formData.dietaryTag || "—"}</dd>
                  <dt>Ingredients</dt>
                  <dd>
                    <ul className="rs-review-ul">
                      {formData.ingredients
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      {!formData.ingredients.some((s) => s.trim()) && <li>—</li>}
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          )}

          <div className="rs-actions">
            {currentStep > 1 && (
              <button type="button" className="rs-btn rs-btn--ghost" onClick={goBack}>
                Back
              </button>
            )}
            {currentStep < 3 && (
              <button type="button" className="rs-btn rs-btn--primary" onClick={goNext}>
                Next
              </button>
            )}
            {currentStep === 3 && (
              <button type="submit" className="rs-btn rs-btn--primary">
                Submit recipe
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rs-pending-section" aria-labelledby="pending-heading">
        <h2 id="pending-heading" className="rs-pending-title">
          Pending recipes
        </h2>
        <p className="rs-pending-sub">
          Recipes you submit appear here with a pending badge until they are reviewed.
        </p>
        {pendingRecipes.length === 0 ? (
          <p className="rs-empty">No pending submissions yet.</p>
        ) : (
          <ul className="rs-pending-list">
            {pendingRecipes.map((r) => (
              <li key={r.id} className="rs-pending-card">
                <div className="rs-pending-card-head">
                  <h3 className="rs-pending-name">{r.name}</h3>
                  <span className="rs-badge">Pending</span>
                </div>
                <p className="rs-pending-meta">
                  {r.region} · {r.language} · {r.dietaryTag}
                </p>
                <p className="rs-pending-time">
                  Submitted {new Date(r.submittedAt).toLocaleString()}
                </p>
                <div className="rs-pending-body">
                  <div>
                    <span className="rs-pending-label">Ingredients</span>
                    <ul className="rs-pending-ul">
                      {r.ingredients.map((ing) => (
                        <li key={ing}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="rs-pending-label">Steps</span>
                    <ol className="rs-pending-ol">
                      {r.preparationSteps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
