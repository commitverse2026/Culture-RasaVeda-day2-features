import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function HeritageBadges() {
  /*
=========================================================
 FEATURE: Food Heritage Badges & Gamification
 Difficulty: Medium
=========================================================

 GOAL:
Show earned badges on user profiles. Auto-award badges
when contribution milestones are reached.

---------------------------------------------------------
 REQUIREMENTS:
1. Static user object with contributionScore and badges[]
2. Badge definitions: name, icon, criteria (e.g. 5 recipes)
3. Profile page showing earned badges with icons and names
4. "Simulate Contribution" button that increments score
5. When score crosses a threshold, auto-award the badge

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create badges definitions array with criteria thresholds
STEP 2 — Create user state with score and earnedBadges[]
STEP 3 — Render user profile with score display
STEP 4 — Render earned badges with icons
STEP 5 — "Simulate Contribution" button increments score
STEP 6 — After each increment, check if any new badge is earned
STEP 7 — If threshold crossed, add badge to earnedBadges

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ User profile shows name and contribution score
✔ Earned badges visible with icon and name
✔ "Simulate Contribution" button increments score
✔ Reaching a threshold auto-awards a new badge
✔ New badge appears with a highlight animation

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Food Heritage Badges & Gamification</h1>

      <div className="todo-box">
        <p>User profile + earned badges + simulate contribution button</p>
      </div>

      <div className="placeholder">👤 UserProfile (name + score)</div>
      <div className="placeholder">🏅 EarnedBadges grid</div>
      <div className="placeholder">🔒 LockedBadges (criteria shown)</div>
      <div className="placeholder">➕ Simulate Contribution button</div>
    </div>
  );
}
