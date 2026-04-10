import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function DatasetExport() {
  // STEP 1: Static recipes array as the dataset
  const recipes = [
    { 
      id: 1, 
      name: "Biryani", 
      region: "Hyderabad", 
      cuisine: "Mughlai",
      ingredients: "Rice, Chicken, Spices, Yogurt",
      prepTime: "60 mins",
      difficulty: "Medium"
    },
    { 
      id: 2, 
      name: "Masala Dosa", 
      region: "South India", 
      cuisine: "South Indian",
      ingredients: "Rice, Lentils, Potato, Onion",
      prepTime: "30 mins",
      difficulty: "Medium"
    },
    { 
      id: 3, 
      name: "Butter Chicken", 
      region: "North India", 
      cuisine: "Punjabi",
      ingredients: "Chicken, Butter, Cream, Tomatoes",
      prepTime: "45 mins",
      difficulty: "Medium"
    },
    { 
      id: 4, 
      name: "Rogan Josh", 
      region: "Kashmir", 
      cuisine: "Kashmiri",
      ingredients: "Lamb, Yogurt, Spices, Saffron",
      prepTime: "90 mins",
      difficulty: "Hard"
    },
    { 
      id: 5, 
      name: "Dhokla", 
      region: "Gujarat", 
      cuisine: "Gujarati",
      ingredients: "Gram flour, Yogurt, Spices",
      prepTime: "25 mins",
      difficulty: "Easy"
    }
  ];

  // STEP 2: Download as JSON
  const downloadJSON = () => {
    // Convert array to JSON string with pretty formatting
    const jsonData = JSON.stringify(recipes, null, 2);
    
    // Create a Blob with JSON content
    const blob = new Blob([jsonData], { type: "application/json" });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `recipe-dataset-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // STEP 3: Download as CSV
  const downloadCSV = () => {
    // Define CSV headers
    const headers = ["ID", "Name", "Region", "Cuisine", "Ingredients", "Prep Time", "Difficulty"];
    
    // Convert each recipe to CSV row
    const csvRows = recipes.map(recipe => [
      recipe.id,
      `"${recipe.name}"`,
      `"${recipe.region}"`,
      `"${recipe.cuisine}"`,
      `"${recipe.ingredients}"`,
      recipe.prepTime,
      recipe.difficulty
    ]);
    
    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...csvRows.map(row => row.join(","))
    ].join("\n");
    
    // Add BOM for UTF-8 support (handles special characters)
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `recipe-dataset-${new Date().toISOString().split('T')[0]}.csv`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // STEP 5: Version history data (static)
  const versionHistory = [
    {
      id: 1,
      version: "v2.0",
      date: "2024-03-15",
      recordCount: 5,
      format: "JSON, CSV",
      description: "Added new regional recipes and preparation times"
    },
    {
      id: 2,
      version: "v1.5",
      date: "2024-02-28",
      recordCount: 3,
      format: "JSON, CSV",
      description: "Initial dataset with basic recipes"
    },
    {
      id: 3,
      version: "v1.0",
      date: "2024-02-15",
      recordCount: 3,
      format: "JSON",
      description: "First public release"
    }
  ];

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Open Dataset Export</h1>

      {/* Dataset Information */}
      <div className="dataset-info">
        <h2>Current Dataset</h2>
        <p><strong>Total Recipes:</strong> {recipes.length}</p>
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
      </div>

      {/* STEP 4: Download buttons */}
      <div className="download-section">
        <h2>Download Full Dataset</h2>
        <div className="button-group">
          <button onClick={downloadJSON} className="btn-json">
            📥 Download as JSON
          </button>
          <button onClick={downloadCSV} className="btn-csv">
            📊 Download as CSV
          </button>
        </div>
      </div>

      {/* STEP 5: Version history list */}
      <div className="version-history">
        <h2>📚 Dataset Version History</h2>
        <div className="version-list">
          {versionHistory.map((version) => (
            <div key={version.id} className="version-card">
              <div className="version-header">
                <div>
                  <h3>{version.version}</h3>
                  <span className="version-date">{version.date}</span>
                </div>
                <span className="record-badge">{version.recordCount} recipes</span>
              </div>
              
              <p className="version-description">{version.description}</p>
              
              <div className="version-footer">
                <span className="format-badge">📄 {version.format}</span>
                <button 
                  onClick={() => {
                    if (version.format.includes("JSON")) {
                      // For older versions, you might have static data
                      alert(`Download ${version.version} would trigger here`);
                    }
                  }}
                  className="btn-download-version"
                >
                  Download {version.version}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview of dataset */}
      <div className="dataset-preview">
        <h2>Preview (First 3 recipes)</h2>
        <div className="preview-table-container">
          <table className="preview-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Region</th>
                <th>Cuisine</th>
                <th>Prep Time</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {recipes.slice(0, 3).map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td>{recipe.region}</td>
                  <td>{recipe.cuisine}</td>
                  <td>{recipe.prepTime}</td>
                  <td>{recipe.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}