import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function ContributorLeaderboard() {
  /*
=========================================================
 FEATURE: Contributor Leaderboard
 Difficulty: Easy
=========================================================

 GOAL:
Ranked list of top contributors with score badges.
Filterable by state, contribution type and time period.

---------------------------------------------------------
 REQUIREMENTS:
1. Static contributors array with: name, state, score, type, badge
2. Filter bar: state dropdown, type dropdown, period dropdown
3. Sorted by score descending by default
4. Each row shows rank, name, state, score badge, contribution type

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create contributors array with sample data
STEP 2 — Add useState for filters (state, type, period)
STEP 3 — Filter and sort contributors based on selections
STEP 4 — Render filter dropdowns
STEP 5 — Render leaderboard table with rank, name, score badge
STEP 6 — Top 3 rows get gold, silver, bronze highlight

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Leaderboard table visible sorted by score
✔ Filter dropdowns update the list
✔ Top 3 rows highlighted gold, silver, bronze
✔ Score badge visible next to each name
✔ Rank number shown in each row

---------------------------------------------------------
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Contributor Leaderboard</h1>

      <div className="todo-box">
        <p>Filter bar + sorted leaderboard table with gold/silver/bronze top 3</p>
      </div>

      <div className="placeholder">🔽 FilterBar (state / type / period)</div>
      <div className="placeholder">🏆 LeaderboardTable (rank + name + score badge)</div>
    </div>
  );
}
