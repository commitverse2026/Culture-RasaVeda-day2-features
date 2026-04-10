import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function RecipeSubmission() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    region: "",
    language: "",
    dietary: "",
    ingredients: [""],
    steps: [""]
  });

  const [pendingRecipes, setPendingRecipes] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle dynamic list changes
  const handleListChange = (index, value, field) => {
    const updatedList = [...formData[field]];
    updatedList[index] = value;
    setFormData({ ...formData, [field]: updatedList });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (index, field) => {
    const updatedList = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedList });
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    const newRecipe = { ...formData, status: "Pending" };
    setPendingRecipes([...pendingRecipes, newRecipe]);

    // Reset form
    setFormData({
      name: "",
      region: "",
      language: "",
      dietary: "",
      ingredients: [""],
      steps: [""]
    });

    setCurrentStep(1);
  };

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Community Recipe Submission Portal</h1>

      {/* Step Indicator */}
      <h3>Step {currentStep} / 3</h3>

      {/* STEP 1 */}
      {currentStep === 1 && (
        <div>
          <input name="name" placeholder="Recipe Name" value={formData.name} onChange={handleChange} />
          <input name="region" placeholder="Region" value={formData.region} onChange={handleChange} />
          <input name="language" placeholder="Language" value={formData.language} onChange={handleChange} />
          <input name="dietary" placeholder="Dietary Tag" value={formData.dietary} onChange={handleChange} />
        </div>
      )}

      {/* STEP 2 */}
      {currentStep === 2 && (
        <div>
          <h4>Ingredients</h4>
          {formData.ingredients.map((item, index) => (
            <div key={index}>
              <input
                value={item}
                onChange={(e) => handleListChange(index, e.target.value, "ingredients")}
                placeholder={`Ingredient ${index + 1}`}
              />
              <button onClick={() => removeField(index, "ingredients")}>Remove</button>
            </div>
          ))}
          <button onClick={() => addField("ingredients")}>+ Add Ingredient</button>
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 3 && (
        <div>
          <h4>Preparation Steps</h4>
          {formData.steps.map((step, index) => (
            <div key={index}>
              <input
                value={step}
                onChange={(e) => handleListChange(index, e.target.value, "steps")}
                placeholder={`Step ${index + 1}`}
              />
              <button onClick={() => removeField(index, "steps")}>Remove</button>
            </div>
          ))}
          <button onClick={() => addField("steps")}>+ Add Step</button>

          <h4>Review</h4>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Region:</strong> {formData.region}</p>
          <p><strong>Language:</strong> {formData.language}</p>
          <p><strong>Dietary:</strong> {formData.dietary}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        {currentStep > 1 && <button onClick={prevStep}>Back</button>}
        {currentStep < 3 && <button onClick={nextStep}>Next</button>}
        {currentStep === 3 && <button onClick={handleSubmit}>Submit</button>}
      </div>

      {/* Pending Recipes */}
      <div style={{ marginTop: "40px" }}>
        <h2>⏳ Pending Recipes</h2>
        {pendingRecipes.length === 0 ? (
          <p>No recipes submitted yet.</p>
        ) : (
          pendingRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.name} <span className="badge">Pending</span></h3>
              <p>{recipe.region} | {recipe.language} | {recipe.dietary}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
              <p><strong>Steps:</strong> {recipe.steps.join(" → ")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}