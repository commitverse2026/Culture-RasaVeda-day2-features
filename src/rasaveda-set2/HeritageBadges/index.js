import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function HeritageBadges() {
  // STEP 1: Badge definitions with criteria thresholds
  const badgeDefinitions = [
    {
      id: 1,
      name: "🌱 Seed Saver",
      icon: "🌱",
      criteria: 1,
      description: "Submit your first traditional recipe",
      color: "#4CAF50"
    },
    {
      id: 2,
      name: "🍚 Rice Cultivator",
      icon: "🍚",
      criteria: 3,
      description: "Submit 3 traditional recipes",
      color: "#FF9800"
    },
    {
      id: 3,
      name: "🌶️ Spice Master",
      icon: "🌶️",
      criteria: 5,
      description: "Submit 5 traditional recipes",
      color: "#F44336"
    },
    {
      id: 4,
      name: "🍛 Curry Legend",
      icon: "🍛",
      criteria: 10,
      description: "Submit 10 traditional recipes",
      color: "#9C27B0"
    },
    {
      id: 5,
      name: "👑 Heritage Guardian",
      icon: "👑",
      criteria: 20,
      description: "Submit 20 traditional recipes",
      color: "#FFD700"
    }
  ];

  // STEP 2: Create user state with score and earned badges
  const [user, setUser] = useState({
    name: "Prashant Kumar",
    contributionScore: 0,
    earnedBadges: [],
    recentBadge: null // Track newly earned badge for animation
  });

  // STEP 6: Check and award badges when score changes
  useEffect(() => {
    checkAndAwardBadges();
  }, [user.contributionScore]);

  const checkAndAwardBadges = () => {
    const newEarnedBadges = [...user.earnedBadges];
    let newlyEarned = null;

    // Check each badge definition
    badgeDefinitions.forEach(badge => {
      // If user hasn't earned this badge yet and meets the criteria
      if (!newEarnedBadges.some(b => b.id === badge.id) && 
          user.contributionScore >= badge.criteria) {
        newEarnedBadges.push(badge);
        newlyEarned = badge;
      }
    });

    // Update state if new badges were earned
    if (newEarnedBadges.length > user.earnedBadges.length) {
      setUser(prev => ({
        ...prev,
        earnedBadges: newEarnedBadges,
        recentBadge: newlyEarned
      }));

      // Clear recent badge highlight after 3 seconds
      setTimeout(() => {
        setUser(prev => ({ ...prev, recentBadge: null }));
      }, 3000);
    }
  };

  // STEP 5: Simulate contribution button
  const simulateContribution = () => {
    setUser(prev => ({
      ...prev,
      contributionScore: prev.contributionScore + 1
    }));
  };

  // Calculate next badge progress
  const getNextBadge = () => {
    const earnedIds = user.earnedBadges.map(b => b.id);
    const nextBadge = badgeDefinitions.find(b => !earnedIds.includes(b.id));
    return nextBadge;
  };

  const nextBadge = getNextBadge();
  const progressToNextBadge = nextBadge 
    ? Math.min(100, (user.contributionScore / nextBadge.criteria) * 100)
    : 100;
  const contributionsNeeded = nextBadge 
    ? nextBadge.criteria - user.contributionScore 
    : 0;

  return (
    <div className="feature-page badges-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>🏆 Food Heritage Badges & Gamification</h1>

      {/* STEP 3: User Profile with score */}
      <div className="user-profile-card">
        <div className="user-avatar">
          <span className="avatar-icon">👨🍳</span>
        </div>
        <div className="user-info">
          <h2>{user.name}</h2>
          <div className="score-container">
            <div className="score-label">
              <span>📊 Contribution Score</span>
              <span className="score-value">{user.contributionScore}</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressToNextBadge}%` }}
              />
            </div>
            {nextBadge && (
              <div className="next-badge-info">
                <span>{contributionsNeeded} more contribution{contributionsNeeded !== 1 ? 's' : ''} to earn {nextBadge.icon} {nextBadge.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STEP 4: Earned Badges Grid */}
      <div className="badges-section">
        <h2>🏅 Earned Badges ({user.earnedBadges.length}/{badgeDefinitions.length})</h2>
        {user.earnedBadges.length === 0 ? (
          <div className="no-badges">
            <p>No badges earned yet. Start contributing to earn your first badge! 🌱</p>
          </div>
        ) : (
          <div className="badges-grid">
            {user.earnedBadges.map((badge, index) => (
              <div 
                key={badge.id} 
                className={`badge-card earned ${user.recentBadge?.id === badge.id ? 'new-badge' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="badge-icon" style={{ backgroundColor: badge.color }}>
                  <span className="badge-emoji">{badge.icon}</span>
                </div>
                <div className="badge-info">
                  <h3>{badge.name}</h3>
                  <p>{badge.description}</p>
                  <div className="badge-criteria">
                    ✅ Achieved at {badge.criteria} contributions
                  </div>
                </div>
                {user.recentBadge?.id === badge.id && (
                  <div className="new-badge-tag">NEW!</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Locked Badges Section */}
      <div className="badges-section">
        <h2>🔒 Locked Badges</h2>
        <div className="badges-grid locked-grid">
          {badgeDefinitions
            .filter(badge => !user.earnedBadges.some(b => b.id === badge.id))
            .map((badge) => (
              <div key={badge.id} className="badge-card locked">
                <div className="badge-icon locked-icon" style={{ backgroundColor: "#e0e0e0" }}>
                  <span className="badge-emoji">🔒</span>
                </div>
                <div className="badge-info">
                  <h3>{badge.name}</h3>
                  <p>{badge.description}</p>
                  <div className="badge-criteria">
                    🎯 Need {badge.criteria} contributions
                  </div>
                  <div className="progress-to-unlock">
                    <div className="mini-progress-bar">
                      <div 
                        className="mini-progress-fill" 
                        style={{ 
                          width: `${Math.min(100, (user.contributionScore / badge.criteria) * 100)}%`,
                          backgroundColor: badge.color 
                        }}
                      />
                    </div>
                    <span>{user.contributionScore}/{badge.criteria}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* STEP 5: Simulate Contribution Button */}
      <div className="simulate-section">
        <button onClick={simulateContribution} className="simulate-btn">
          ➕ Simulate Contribution
        </button>
        <p className="simulate-hint">
          Click to add one contribution. Watch your score grow and earn badges!
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="achievement-stats">
        <h3>📊 Achievement Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{user.contributionScore}</div>
            <div className="stat-label">Total Contributions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{user.earnedBadges.length}</div>
            <div className="stat-label">Badges Earned</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {Math.round((user.earnedBadges.length / badgeDefinitions.length) * 100)}%
            </div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}