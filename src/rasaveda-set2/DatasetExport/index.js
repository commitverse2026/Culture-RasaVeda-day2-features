import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function DatasetExport() {
  /*
=========================================================
 FEATURE: Open Dataset Export
 Difficulty: Medium
=========================================================

 GOAL:
A download page listing recipe data exports in JSON and CSV.
Users can download the full dataset with one click.

---------------------------------------------------------
 REQUIREMENTS:
1. Static recipes array as the dataset
2. Download as JSON — converts array to JSON blob
3. Download as CSV — converts array to CSV string
4. Dataset version history list (static)
5. Each version shows date, record count, format and download button

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create recipes array as the dataset
STEP 2 — Write downloadJSON() function:
         - JSON.stringify the array
         - Create a Blob and trigger download
STEP 3 — Write downloadCSV() function:
         - Convert array to CSV string with headers
         - Create a Blob and trigger download
STEP 4 — Render download page with JSON and CSV buttons
STEP 5 — Render version history list with static entries

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Download JSON button triggers a .json file download
✔ Download CSV button triggers a .csv file download
✔ Downloaded JSON is valid and parseable
✔ Downloaded CSV has correct headers and rows
✔ Version history list visible with date and record count

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Open Dataset Export</h1>

      <div className="todo-box">
        <p>Download JSON + Download CSV buttons + version history list</p>
      </div>

      <div className="placeholder">📥 DownloadJSON button</div>
      <div className="placeholder">📥 DownloadCSV button</div>
      <div className="placeholder">🕓 VersionHistoryList</div>
    </div>
  );
}
