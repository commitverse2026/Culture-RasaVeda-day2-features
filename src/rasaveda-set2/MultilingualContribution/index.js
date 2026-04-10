import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function MultilingualContribution() {
  /*
=========================================================
 FEATURE: Multilingual Contribution Support
 Difficulty: Medium
=========================================================

 GOAL:
Translators can browse recipes pending translation,
pick one and submit a translated version.

---------------------------------------------------------
 REQUIREMENTS:
1. Static recipes array with status: "pending_translation"
2. Language selector — Tamil, Bengali, Marathi, Hindi
3. Translator dashboard listing pending recipes
4. Clicking a recipe opens a translation form
5. On submit, recipe status updates to "translated"

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create recipes array, some with pending_translation status
STEP 2 — Add useState for selectedLanguage
STEP 3 — Render language selector
STEP 4 — Filter and render pending recipes for that language
STEP 5 — Clicking a recipe opens a translation form
STEP 6 — On submit, update recipe status to "translated"

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Language selector visible
✔ Pending recipes list updates by language
✔ Clicking a recipe shows its translation form
✔ Submitting marks recipe as translated
✔ Translated recipes disappear from pending list

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Multilingual Contribution Support</h1>

      <div className="todo-box">
        <p>Language selector + pending recipes list + translation form</p>
      </div>

      <div className="placeholder">🌐 LanguageSelector</div>
      <div className="placeholder">📋 PendingRecipesList</div>
      <div className="placeholder">📝 TranslationForm</div>
    </div>
  );
}
