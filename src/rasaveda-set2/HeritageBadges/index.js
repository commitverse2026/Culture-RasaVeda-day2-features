import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function HeritageBadges() {

  // STEP 1 — Badge Definitions
  const badgeList = [
    { id: 1, name: "Starter Chef", icon: "🍳", threshold: 5 },
    { id: 2, name: "Recipe Contributor", icon: "📜", threshold: 10 },
    { id: 3, name: "Heritage Guardian", icon: "🏺", threshold: 20 },
    { id: 4, name: "Master Culinary Artist", icon: "👨‍🍳", threshold: 30 }
  ];

  // STEP 2 — User State
  const [user, setUser] = useState({
    name: "Gauri",
    contributionScore: 0,
    earnedBadges: []
  });

  // STEP 5 — Simulate Contribution
  const handleContribution = () => {
    const newScore = user.contributionScore + 1;

    // STEP 6 — Check for new badges
    const newBadges = badgeList.filter(
      (badge) =>
        newScore >= badge.threshold &&
        !user.earnedBadges.some((b) => b.id === badge.id)
    );

    // STEP 7 — Update state
    setUser((prev) => ({
      ...prev,
      contributionScore: newScore,
      earnedBadges: [...prev.earnedBadges, ...newBadges]
    }));
  };

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>

      <h1>🏅 Food Heritage Badges & Gamification</h1>

      {/* STEP 3 — Profile */}
      <div className="profile-card">
        <h2>👤 {user.name}</h2>
        <p>Contribution Score: <strong>{user.contributionScore}</strong></p>
      </div>

      {/* STEP 4 — Earned Badges */}
      <div className="badges-section">
        <h3>🏆 Earned Badges</h3>
        <div className="badges-grid">
          {user.earnedBadges.length === 0 ? (
            <p>No badges earned yet</p>
          ) : (
            user.earnedBadges.map((badge) => (
              <div key={badge.id} className="badge earned">
                <span className="icon">{badge.icon}</span>
                <p>{badge.name}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Locked Badges */}
      <div className="badges-section">
        <h3>🔒 Locked Badges</h3>
        <div className="badges-grid">
          {badgeList
            .filter(
              (badge) =>
                !user.earnedBadges.some((b) => b.id === badge.id)
            )
            .map((badge) => (
              <div key={badge.id} className="badge locked">
                <span className="icon">{badge.icon}</span>
                <p>{badge.name}</p>
                <small>Unlock at {badge.threshold} points</small>
              </div>
            ))}
        </div>
      </div>

      {/* STEP 5 — Button */}
      <button className="contribute-btn" onClick={handleContribution}>
        ➕ Simulate Contribution
      </button>
    </div>
  );
}