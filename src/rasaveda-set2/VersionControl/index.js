import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const INITIAL_RECIPE = {
  name: "Rogan Josh",
  description:
    "A slow-cooked aromatic lamb curry from Kashmir, enriched with Kashmiri spices, dried flowers, and slow-rendered fat. A crown jewel of Wazwan cuisine.",
  ingredients: "lamb, kashmiri chili, yogurt, fennel, ginger, cardamom, cloves, cinnamon, bay leaf, dried ginger powder",
  region: "Kashmir",
  cookTime: "90 min",
};

function timestamp() {
  const now = new Date();
  return now.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function makeSummary(prev, next) {
  const FIELDS = ["name", "description", "ingredients", "region", "cookTime"];
  const changed = FIELDS.filter((f) => prev[f] !== next[f]);
  if (changed.length === 0) return "No changes";
  return `Changed: ${changed.join(", ")}`;
}

const FIELDS = [
  { key: "name", label: "Recipe Name", multiline: false },
  { key: "region", label: "Region / Origin", multiline: false },
  { key: "cookTime", label: "Cook Time", multiline: false },
  { key: "description", label: "Description", multiline: true },
  { key: "ingredients", label: "Ingredients (comma-separated)", multiline: true },
];

export default function VersionControl() {
  // STEP 1 — Current editable recipe state
  const [recipe, setRecipe] = useState({ ...INITIAL_RECIPE });

  // STEP 2 — Versions array seeded with v1
  const [versions, setVersions] = useState([
    {
      version: 1,
      savedAt: timestamp(),
      snapshot: { ...INITIAL_RECIPE },
      summary: "Initial version",
    },
  ]);

  // Edit form state mirrors recipe (draft)
  const [draft, setDraft] = useState({ ...INITIAL_RECIPE });

  // UI state
  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "history" | "diff"
  const [saveFlash, setSaveFlash] = useState(false);
  const [compareA, setCompareA] = useState(null);
  const [compareB, setCompareB] = useState(null);
  const [restoreConfirm, setRestoreConfirm] = useState(null);

  // STEP 4 — Save handler: snapshot into versions[]
  function handleSave() {
    const newVersion = versions.length + 1;
    const summary = makeSummary(recipe, draft);
    const snapshot = { ...draft };

    setVersions((prev) => [
      ...prev,
      {
        version: newVersion,
        savedAt: timestamp(),
        snapshot,
        summary,
      },
    ]);
    setRecipe({ ...draft });

    // Flash feedback
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1800);
    setActiveTab("history");
  }

  function handleReset() {
    setDraft({ ...recipe });
  }

  // Restore a version
  function handleRestore(ver) {
    setDraft({ ...ver.snapshot });
    setRecipe({ ...ver.snapshot });
    const newVersion = versions.length + 1;
    setVersions((prev) => [
      ...prev,
      {
        version: newVersion,
        savedAt: timestamp(),
        snapshot: { ...ver.snapshot },
        summary: `Restored from v${ver.version}`,
      },
    ]);
    setRestoreConfirm(null);
    setActiveTab("history");
  }

  // STEP 6 — Select two versions for diff
  function toggleCompare(versionNum) {
    if (compareA === versionNum) {
      setCompareA(compareB);
      setCompareB(null);
    } else if (compareB === versionNum) {
      setCompareB(null);
    } else if (compareA === null) {
      setCompareA(versionNum);
    } else if (compareB === null) {
      setCompareB(versionNum);
    } else {
      setCompareA(compareB);
      setCompareB(versionNum);
    }
  }

  const isDirty = FIELDS.some((f) => draft[f.key] !== recipe[f.key]);

  const versionA = versions.find((v) => v.version === compareA);
  const versionB = versions.find((v) => v.version === compareB);
  const canCompare = compareA !== null && compareB !== null;

  return (
    <div className="vc-page">
      <Link to="/" className="page-back">← Back to Home</Link>

      {/* ── Header ── */}
      <div className="vc-header">
        <div className="vc-header-text">
          <h1>Recipe Version Control</h1>
          <p className="vc-subtitle">
            Track every edit to a recipe — save snapshots, browse history, and compare any two versions side-by-side.
          </p>
        </div>
        <div className="vc-meta-pills">
          <div className="vc-pill">
            <span className="vc-pill-num">{versions.length}</span>
            <span className="vc-pill-label">Versions</span>
          </div>
          <div className="vc-pill">
            <span className="vc-pill-num">{versions[versions.length - 1].savedAt.split(",")[0]}</span>
            <span className="vc-pill-label">Last Saved</span>
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="vc-tabs">
        <button
          className={`vc-tab${activeTab === "edit" ? " active" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          <span className="tab-icon">✏️</span> Edit Recipe
          {isDirty && <span className="unsaved-dot" title="Unsaved changes" />}
        </button>
        <button
          className={`vc-tab${activeTab === "history" ? " active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          <span className="tab-icon">🕓</span> Version History
          <span className="vc-count-badge">{versions.length}</span>
        </button>
        <button
          className={`vc-tab${activeTab === "diff" ? " active" : ""}${canCompare ? " diff-ready" : ""}`}
          onClick={() => setActiveTab("diff")}
        >
          <span className="tab-icon">🔍</span> Compare
          {canCompare && <span className="vc-count-badge green">{compareA} vs {compareB}</span>}
        </button>
      </div>

      {/* ════════════ TAB: EDIT FORM ════════════ */}
      {activeTab === "edit" && (
        <div className="vc-panel edit-panel">
          <div className="edit-panel-header">
            <div>
              <h2 className="panel-title">Edit Recipe</h2>
              <p className="panel-sub">Modify fields below and click Save to create a new version.</p>
            </div>
            {isDirty && (
              <span className="unsaved-label">● Unsaved changes</span>
            )}
          </div>

          <div className="edit-form">
            {FIELDS.map((f) => (
              <div className="form-field" key={f.key}>
                <label className="form-label">{f.label}</label>
                {f.multiline ? (
                  <textarea
                    className="form-textarea"
                    value={draft[f.key]}
                    rows={f.key === "description" ? 4 : 3}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                  />
                ) : (
                  <input
                    className="form-input"
                    type="text"
                    value={draft[f.key]}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                  />
                )}
                {draft[f.key] !== recipe[f.key] && (
                  <span className="field-changed-badge">Modified</span>
                )}
              </div>
            ))}
          </div>

          <div className="edit-actions">
            <button className="btn-reset" onClick={handleReset} disabled={!isDirty}>
              ↺ Reset Changes
            </button>
            <button
              className={`btn-save${saveFlash ? " flash" : ""}`}
              onClick={handleSave}
              disabled={!isDirty}
            >
              {saveFlash ? "✓ Saved!" : "💾 Save as New Version"}
            </button>
          </div>

          {/* Live preview */}
          <div className="recipe-preview">
            <h3 className="preview-title">Live Preview</h3>
            <div className="preview-card">
              <div className="preview-name">{draft.name || "—"}</div>
              <div className="preview-badges">
                <span className="prev-badge">📍 {draft.region || "—"}</span>
                <span className="prev-badge">⏱ {draft.cookTime || "—"}</span>
              </div>
              <p className="preview-desc">{draft.description || "—"}</p>
              <div className="preview-ings">
                {(draft.ingredients || "")
                  .split(",")
                  .map((i) => i.trim())
                  .filter(Boolean)
                  .map((ing, idx) => (
                    <span key={idx} className="ing-chip">{ing}</span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ TAB: VERSION HISTORY ════════════ */}
      {activeTab === "history" && (
        <div className="vc-panel history-panel">
          <div className="history-header">
            <div>
              <h2 className="panel-title">Version History</h2>
              <p className="panel-sub">
                {versions.length} snapshot{versions.length !== 1 ? "s" : ""} saved.
                Select two to compare in the Compare tab.
              </p>
            </div>
            {(compareA !== null || compareB !== null) && (
              <button
                className="btn-clear-compare"
                onClick={() => { setCompareA(null); setCompareB(null); }}
              >
                Clear Selection
              </button>
            )}
          </div>

          <div className="compare-hint">
            {compareA === null && compareB === null
              ? "Click any version to start comparing."
              : compareB === null
              ? `v${compareA} selected — pick a second version to compare.`
              : `v${compareA} and v${compareB} selected. Open the Compare tab.`}
          </div>

          <div className="version-list">
            {[...versions].reverse().map((ver) => {
              const isLatest = ver.version === versions.length;
              const isA = compareA === ver.version;
              const isB = compareB === ver.version;
              const isSelected = isA || isB;
              return (
                <div
                  key={ver.version}
                  className={`version-card${isSelected ? " selected" : ""}${isLatest ? " latest" : ""}`}
                >
                  <div className="vc-left">
                    <div className="ver-num-wrap">
                      <span className="ver-num">v{ver.version}</span>
                      {isLatest && <span className="latest-badge">LATEST</span>}
                      {isA && <span className="cmp-badge a">A</span>}
                      {isB && <span className="cmp-badge b">B</span>}
                    </div>
                    <div className="ver-time">{ver.savedAt}</div>
                    <div className="ver-summary">{ver.summary}</div>
                  </div>

                  <div className="vc-right">
                    <button
                      className={`btn-cmp-select${isSelected ? " active" : ""}`}
                      onClick={() => toggleCompare(ver.version)}
                    >
                      {isSelected ? "✓ Selected" : "Select"}
                    </button>
                    {!isLatest && (
                      <button
                        className="btn-restore"
                        onClick={() => setRestoreConfirm(ver)}
                      >
                        Restore
                      </button>
                    )}
                    {isLatest && (
                      <button
                        className="btn-edit-ver"
                        onClick={() => setActiveTab("edit")}
                      >
                        Edit →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Restore confirmation modal */}
          {restoreConfirm && (
            <div className="modal-overlay" onClick={() => setRestoreConfirm(null)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Restore v{restoreConfirm.version}?</h3>
                <p className="modal-body">
                  This will create a new version identical to <strong>v{restoreConfirm.version}</strong>
                  {" "}(saved {restoreConfirm.savedAt}).
                  The current recipe will be replaced.
                </p>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setRestoreConfirm(null)}>Cancel</button>
                  <button className="btn-confirm" onClick={() => handleRestore(restoreConfirm)}>
                    Yes, Restore
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════ TAB: DIFF VIEWER ════════════ */}
      {activeTab === "diff" && (
        <div className="vc-panel diff-panel">
          <h2 className="panel-title">Side-by-Side Diff</h2>
          <p className="panel-sub">
            Select two versions in the History tab and compare their fields here.
          </p>

          {!canCompare ? (
            <div className="diff-empty">
              <div className="diff-empty-icon">🔍</div>
              <p>No versions selected for comparison.</p>
              <button className="btn-goto-history" onClick={() => setActiveTab("history")}>
                Go to Version History →
              </button>
            </div>
          ) : (
            <>
              {/* Version labels */}
              <div className="diff-labels">
                <div className="diff-label a">
                  <span className="dlabel-badge a">A</span>
                  <span className="dlabel-ver">Version {versionA.version}</span>
                  <span className="dlabel-time">{versionA.savedAt}</span>
                  <span className="dlabel-summary">{versionA.summary}</span>
                </div>
                <div className="diff-vs">VS</div>
                <div className="diff-label b">
                  <span className="dlabel-badge b">B</span>
                  <span className="dlabel-ver">Version {versionB.version}</span>
                  <span className="dlabel-time">{versionB.savedAt}</span>
                  <span className="dlabel-summary">{versionB.summary}</span>
                </div>
              </div>

              {/* STEP 7 — Diff table */}
              <div className="diff-table-wrap">
                <div className="diff-table-header">
                  <div className="dth-field">Field</div>
                  <div className="dth-ver">v{versionA.version}</div>
                  <div className="dth-ver">v{versionB.version}</div>
                  <div className="dth-status">Status</div>
                </div>

                {FIELDS.map((f) => {
                  const valA = versionA.snapshot[f.key] || "";
                  const valB = versionB.snapshot[f.key] || "";
                  const changed = valA !== valB;
                  return (
                    <div
                      key={f.key}
                      className={`diff-row${changed ? " changed" : " unchanged"}`}
                    >
                      <div className="diff-field-name">{f.label}</div>
                      <div className={`diff-val${changed ? " diff-val-a" : ""}`}>
                        {valA || <span className="empty-val">—</span>}
                      </div>
                      <div className={`diff-val${changed ? " diff-val-b" : ""}`}>
                        {valB || <span className="empty-val">—</span>}
                      </div>
                      <div className="diff-status-cell">
                        {changed ? (
                          <span className="status-changed">Modified</span>
                        ) : (
                          <span className="status-same">Unchanged</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Diff summary */}
              <div className="diff-summary">
                {(() => {
                  const changedCount = FIELDS.filter(
                    (f) => versionA.snapshot[f.key] !== versionB.snapshot[f.key]
                  ).length;
                  return changedCount === 0
                    ? "These two versions are identical."
                    : `${changedCount} field${changedCount > 1 ? "s" : ""} differ between v${versionA.version} and v${versionB.version}.`;
                })()}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
