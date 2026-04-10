import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const contributors = [
  {
    id: 1,
    name: "Ananya Kulkarni",
    state: "Maharashtra",
    type: "Recipes",
    badge: "Preserver",
    period: "This Month",
    score: 980,
    streak: 19,
    highlight: "Documented 24 temple-prasad recipes with regional notes."
  },
  {
    id: 2,
    name: "Harpreet Singh",
    state: "Punjab",
    type: "Stories",
    badge: "Historian",
    period: "This Quarter",
    score: 940,
    streak: 15,
    highlight: "Added oral histories from farming families across Malwa."
  },
  {
    id: 3,
    name: "Meenakshi Iyer",
    state: "Tamil Nadu",
    type: "Translations",
    badge: "Polyglot",
    period: "This Month",
    score: 910,
    streak: 21,
    highlight: "Translated heritage recipes into Tamil, English, and Hindi."
  },
  {
    id: 4,
    name: "Arjun Das",
    state: "West Bengal",
    type: "Media",
    badge: "Archivist",
    period: "This Year",
    score: 860,
    streak: 11,
    highlight: "Uploaded high-quality plating and process photography."
  },
  {
    id: 5,
    name: "Nandini Rao",
    state: "Karnataka",
    type: "Research",
    badge: "Scholar",
    period: "This Quarter",
    score: 830,
    streak: 16,
    highlight: "Cross-verified ingredient histories with local archives."
  },
  {
    id: 6,
    name: "Rizwan Ali",
    state: "Uttar Pradesh",
    type: "Recipes",
    badge: "Trailblazer",
    period: "This Month",
    score: 780,
    streak: 12,
    highlight: "Contributed lesser-known Awadhi household recipes."
  },
  {
    id: 7,
    name: "Tsering Dolma",
    state: "Ladakh",
    type: "Research",
    badge: "Mountain Keeper",
    period: "This Year",
    score: 760,
    streak: 9,
    highlight: "Mapped high-altitude grain practices and seasonal food use."
  },
  {
    id: 8,
    name: "Devika Menon",
    state: "Kerala",
    type: "Media",
    badge: "Visual Teller",
    period: "This Quarter",
    score: 735,
    streak: 13,
    highlight: "Captured step-by-step media for festive sadya traditions."
  },
  {
    id: 9,
    name: "Kiran Patel",
    state: "Gujarat",
    type: "Translations",
    badge: "Bridge Builder",
    period: "This Year",
    score: 710,
    streak: 8,
    highlight: "Improved accessibility with transliteration and glossary help."
  }
];

const periods = ["All Time", "This Month", "This Quarter", "This Year"];
const typeOptions = ["All Types", ...new Set(contributors.map((item) => item.type))];
const stateOptions = ["All States", ...new Set(contributors.map((item) => item.state))];
const podiumStyles = ["gold", "silver", "bronze"];

export default function ContributorLeaderboard() {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedPeriod, setSelectedPeriod] = useState("All Time");

  const filteredContributors = useMemo(() => {
    return contributors
      .filter((contributor) => {
        const stateMatch =
          selectedState === "All States" || contributor.state === selectedState;
        const typeMatch =
          selectedType === "All Types" || contributor.type === selectedType;
        const periodMatch =
          selectedPeriod === "All Time" || contributor.period === selectedPeriod;

        return stateMatch && typeMatch && periodMatch;
      })
      .sort((left, right) => right.score - left.score);
  }, [selectedPeriod, selectedState, selectedType]);

  const topContributors = filteredContributors.slice(0, 3);
  const remainingContributors = filteredContributors.slice(3);
  const totalScore = filteredContributors.reduce(
    (sum, contributor) => sum + contributor.score,
    0
  );

  return (
    <div className="feature-page leaderboard-page">
      <Link to="/" className="page-back">
        ← Back
      </Link>

      <section className="leaderboard-hero">
        <div>
          <p className="eyebrow">Community Recognition</p>
          <h1>Contributor Leaderboard</h1>
          <p className="hero-copy">
            Celebrate the people documenting recipes, translating traditions,
            preserving stories, and enriching India&apos;s culinary archive.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-label">Visible Contributors</span>
            <strong>{filteredContributors.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Combined Score</span>
            <strong>{totalScore}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Top Badge</span>
            <strong>{topContributors[0] ? topContributors[0].badge : "No Match"}</strong>
          </div>
        </div>
      </section>

      <section className="filters-panel">
        <div className="filter-heading">
          <h2>Refine Rankings</h2>
          <p>Filter by region, contribution type, or recognition window.</p>
        </div>

        <div className="filter-grid">
          <label className="filter-field">
            <span>State</span>
            <select
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value)}
            >
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>Contribution Type</span>
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>Time Period</span>
            <select
              value={selectedPeriod}
              onChange={(event) => setSelectedPeriod(event.target.value)}
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {filteredContributors.length > 0 ? (
        <>
          <section className="podium-grid">
            {topContributors.map((contributor, index) => (
              <article
                key={contributor.id}
                className={`podium-card ${podiumStyles[index]}`}
              >
                <div className="podium-rank">#{index + 1}</div>
                <div className="podium-body">
                  <div className="podium-headline">
                    <h3>{contributor.name}</h3>
                    <span className="badge-pill">{contributor.badge}</span>
                  </div>
                  <p className="podium-meta">
                    {contributor.state} · {contributor.type} · {contributor.period}
                  </p>
                  <p className="podium-highlight">{contributor.highlight}</p>
                </div>
                <div className="podium-score">
                  <span>Score</span>
                  <strong>{contributor.score}</strong>
                </div>
              </article>
            ))}
          </section>

          <section className="leaderboard-table-card">
            <div className="table-heading">
              <div>
                <h2>Full Rankings</h2>
                <p>Sorted automatically by contribution score.</p>
              </div>
              <div className="legend">
                <span className="legend-chip">Top 3 highlighted</span>
              </div>
            </div>

            <div className="leaderboard-table">
              <div className="table-header table-row">
                <span>Rank</span>
                <span>Contributor</span>
                <span>Type</span>
                <span>Score</span>
                <span>Streak</span>
              </div>

              {filteredContributors.map((contributor, index) => (
                <div
                  key={contributor.id}
                  className={`table-row ${index < 3 ? `rank-${index + 1}` : ""}`}
                >
                  <span className="rank-pill">#{index + 1}</span>

                  <div className="contributor-cell">
                    <strong>{contributor.name}</strong>
                    <small>
                      {contributor.state} · {contributor.badge}
                    </small>
                  </div>

                  <span>{contributor.type}</span>
                  <span className="score-pill">{contributor.score}</span>
                  <span>{contributor.streak} day streak</span>
                </div>
              ))}
            </div>

            {remainingContributors.length === 0 ? (
              <p className="table-note">
                Your current filters only surface the podium contributors.
              </p>
            ) : null}
          </section>
        </>
      ) : (
        <section className="empty-state">
          <h2>No contributors match these filters</h2>
          <p>Try widening the time period or selecting a different category.</p>
        </section>
      )}
    </div>
  );
}
