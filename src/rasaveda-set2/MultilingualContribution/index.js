import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  TRANSLATION_LANGUAGES,
  translationQueueRecipes as initialQueue,
} from "../../data/translationQueue";
import "./styles.css";

export default function MultilingualContribution() {
  const [recipes, setRecipes] = useState(() =>
    initialQueue.map((r) => ({ ...r }))
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    TRANSLATION_LANGUAGES[0]
  );
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  const pendingForLanguage = useMemo(
    () =>
      recipes.filter(
        (r) =>
          r.status === "pending_translation" &&
          r.targetLanguage === selectedLanguage
      ),
    [recipes, selectedLanguage]
  );

  const selectedRecipe = useMemo(
    () => recipes.find((r) => r.id === selectedId) ?? null,
    [recipes, selectedId]
  );

  const openForm = (recipe) => {
    setSelectedId(recipe.id);
    setForm({ title: "", description: "" });
  };

  const closeForm = () => {
    setSelectedId(null);
    setForm({ title: "", description: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRecipe || !form.title.trim() || !form.description.trim()) {
      return;
    }
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === selectedRecipe.id
          ? {
              ...r,
              status: "translated",
              translatedTitle: form.title.trim(),
              translatedDescription: form.description.trim(),
            }
          : r
      )
    );
    closeForm();
  };

  return (
    <div className="feature-page ml-feature">
      <Link to="/" className="page-back">
        ← Back
      </Link>
      <h1>Multilingual Contribution</h1>
      <p className="ml-lead">
        Pick a recipe pending translation in your language, then submit the
        localized title and description.
      </p>

      <section className="ml-section" aria-labelledby="lang-heading">
        <h2 id="lang-heading" className="ml-section-title">
          Target language
        </h2>
        <div className="ml-lang-row" role="group" aria-label="Translation language">
          {TRANSLATION_LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              className={
                lang === selectedLanguage ? "ml-lang-btn is-active" : "ml-lang-btn"
              }
              onClick={() => {
                setSelectedLanguage(lang);
                setSelectedId(null);
                setForm({ title: "", description: "" });
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </section>

      <section className="ml-section" aria-labelledby="queue-heading">
        <h2 id="queue-heading" className="ml-section-title">
          Pending for {selectedLanguage}
          <span className="ml-count">{pendingForLanguage.length}</span>
        </h2>
        {pendingForLanguage.length === 0 ? (
          <p className="ml-empty">No recipes waiting in this language queue.</p>
        ) : (
          <ul className="ml-recipe-list">
            {pendingForLanguage.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  className="ml-recipe-card"
                  onClick={() => openForm(r)}
                >
                  <span className="ml-recipe-name">{r.name}</span>
                  <span className="ml-recipe-meta">
                    {r.region} · {r.sourceLanguage}
                  </span>
                  <span className="ml-recipe-teaser">{r.description}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {selectedRecipe && (
        <div className="ml-modal-overlay" role="presentation">
          <div
            className="ml-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ml-form-title"
          >
            <div className="ml-modal-head">
              <h2 id="ml-form-title">Translate: {selectedRecipe.name}</h2>
              <button
                type="button"
                className="ml-modal-close"
                onClick={closeForm}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="ml-source-block">
              <p className="ml-source-label">Source</p>
              <p className="ml-source-title">{selectedRecipe.name}</p>
              <p className="ml-source-desc">{selectedRecipe.description}</p>
            </div>
            <form className="ml-form" onSubmit={handleSubmit}>
              <label className="ml-field">
                <span>Translated title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder={`Title in ${selectedLanguage}`}
                  required
                  autoComplete="off"
                />
              </label>
              <label className="ml-field">
                <span>Translated description</span>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder={`Description in ${selectedLanguage}`}
                  rows={5}
                  required
                />
              </label>
              <div className="ml-form-actions">
                <button type="button" className="ml-btn ghost" onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className="ml-btn primary">
                  Submit translation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
