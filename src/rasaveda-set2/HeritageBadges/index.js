import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function HeritageBadges() {
  /*
=========================================================
 FEATURE: Food Heritage Badges & Gamification
=========================================================
*/

  // STEP 1 — Badge definitions
  const badgeDefinitions = [
    { name: "First Step", icon: "🌱", criteria: 1 },
    { name: "Home Cook", icon: "🍳", criteria: 3 },
    { name: "Food Explorer", icon: "🍜", criteria: 5 },
    { name: "Heritage Master", icon: "🏆", criteria: 10 }
  ];

  // STEP 2 — User state
  const [user, setUser] = useState({
    name: "Poorva",
    contributionScore: 0,
    earnedBadges: []
  });

  const [highlightBadge, setHighlightBadge] = useState(null);

  // STEP 5 — Simulate contribution
  const handleContribution = () => {
    setUser((prev) => {
      const newScore = prev.contributionScore + 1;

      // STEP 6 — Check new badges
      const newlyEarned = badgeDefinitions.filter(
        (badge) =>
          newScore >= badge.criteria &&
          !prev.earnedBadges.some((b) => b.name === badge.name)
      );

      if (newlyEarned.length > 0) {
        setHighlightBadge(newlyEarned[0].name);

        setTimeout(() => {
          setHighlightBadge(null);
        }, 1000);
      }

      return {
        ...prev,
        contributionScore: newScore,
        earnedBadges: [...prev.earnedBadges, ...newlyEarned]
      };
    });
  };

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>

      <h1>Food Heritage Badges & Gamification</h1>

      {/* STEP 3 — Profile */}
      <div className="todo-box">
        <h2>👤 {user.name}</h2>
        <p>⭐ Contribution Score: {user.contributionScore}</p>
      </div>

      {/* STEP 4 — Earned badges */}
      <div className="todo-box">
        <h3>🏅 Earned Badges</h3>

        {user.earnedBadges.length === 0 ? (
          <p>No badges earned yet</p>
        ) : (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {user.earnedBadges.map((badge, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  background:
                    highlightBadge === badge.name ? "#ffeaa7" : "#f1f2f6",
                  transition: "0.3s"
                }}
              >
                <div style={{ fontSize: "24px" }}>{badge.icon}</div>
                <div>{badge.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STEP 5 — Button */}
      <button
        onClick={handleContribution}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          background: "#2d3436",
          color: "white",
          cursor: "pointer"
        }}
      >
        ➕ Simulate Contribution
      </button>

      {/* STEP 7 — Locked badges */}
      <div className="todo-box">
        <h3>🔒 Locked Badges</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {badgeDefinitions
            .filter((b) => !user.earnedBadges.some((eb) => eb.name === b.name))
            .map((badge, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#dfe6e9",
                  opacity: 0.7
                }}
              >
                <div style={{ fontSize: "24px" }}>{badge.icon}</div>
                <div>{badge.name}</div>
                <small>Need {badge.criteria} contributions</small>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}