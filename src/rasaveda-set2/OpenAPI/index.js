import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/recipes",
    description: "Retrieve a paginated list of all Indian recipes with optional filters.",
    request: {
      headers: { "X-API-Key": "rva_your_api_key_here" },
      queryParams: { page: 1, limit: 20, cuisine: "punjabi", diet: "vegetarian" },
    },
    response: {
      status: 200,
      body: {
        success: true,
        page: 1,
        total: 142,
        recipes: [
          { id: "rec_001", name: "Dal Makhani", cuisine: "Punjabi", diet: "vegetarian", cookTime: "45 min" },
          { id: "rec_002", name: "Rogan Josh", cuisine: "Kashmiri", diet: "non-vegetarian", cookTime: "90 min" },
        ],
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/recipes/:id",
    description: "Fetch full details of a single recipe including ingredients, steps, and cultural history.",
    request: {
      headers: { "X-API-Key": "rva_your_api_key_here" },
      pathParams: { id: "rec_001" },
    },
    response: {
      status: 200,
      body: {
        success: true,
        recipe: {
          id: "rec_001",
          name: "Dal Makhani",
          cuisine: "Punjabi",
          region: "North India",
          diet: "vegetarian",
          cookTime: "45 min",
          ingredients: ["black lentils", "butter", "cream", "tomatoes", "spices"],
          steps: ["Soak lentils overnight", "Pressure cook lentils", "Prepare tadka", "Simmer with cream"],
          history: "A staple of Punjabi cuisine, popularized by Kundan Lal Gujral at Moti Mahal, Delhi.",
        },
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/cuisines",
    description: "List all documented regional cuisines of India with state and cultural metadata.",
    request: {
      headers: { "X-API-Key": "rva_your_api_key_here" },
    },
    response: {
      status: 200,
      body: {
        success: true,
        total: 36,
        cuisines: [
          { id: "cus_001", name: "Punjabi", region: "North India", state: "Punjab", knownFor: ["Dal Makhani", "Sarson ka Saag"] },
          { id: "cus_002", name: "Chettinad", region: "South India", state: "Tamil Nadu", knownFor: ["Chettinad Chicken", "Kuzhi Paniyaram"] },
        ],
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/ingredients",
    description: "Search and explore Indian culinary ingredients including spices, herbs, and grains.",
    request: {
      headers: { "X-API-Key": "rva_your_api_key_here" },
      queryParams: { search: "turmeric", category: "spice" },
    },
    response: {
      status: 200,
      body: {
        success: true,
        results: [
          { id: "ing_001", name: "Turmeric", localName: "Haldi", category: "spice", flavor: "earthy", uses: ["curries", "milk", "pickles"], origin: "South Asia" },
        ],
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/festivals",
    description: "Retrieve festival-specific food traditions and associated recipes across India.",
    request: {
      headers: { "X-API-Key": "rva_your_api_key_here" },
      queryParams: { festival: "diwali", region: "west" },
    },
    response: {
      status: 200,
      body: {
        success: true,
        festival: "Diwali",
        region: "West India",
        dishes: [
          { name: "Kaju Katli", type: "sweet", state: "Maharashtra" },
          { name: "Chakli", type: "snack", state: "Gujarat" },
        ],
      },
    },
  },
  {
    method: "POST",
    path: "/api/v1/recipes",
    description: "Submit a new community recipe to the RasaVeda database for review and publication.",
    request: {
      headers: { "X-API-Key": "rva_your_api_key_here", "Content-Type": "application/json" },
      body: {
        name: "Mysore Pak",
        cuisine: "Karnataka",
        region: "South India",
        diet: "vegetarian",
        cookTime: "30 min",
        ingredients: ["besan", "ghee", "sugar", "cardamom"],
        steps: ["Prepare sugar syrup", "Roast besan in ghee", "Combine and pour into mold", "Cool and cut"],
        contributor: "community_user",
      },
    },
    response: {
      status: 201,
      body: {
        success: true,
        message: "Recipe submitted successfully and is pending review.",
        submissionId: "sub_9f3c2a",
        estimatedReview: "24-48 hours",
      },
    },
  },
  {
    method: "POST",
    path: "/api/v1/search",
    description: "Full-text semantic search across recipes, ingredients, cuisines, and cultural notes.",
    request: {
      headers: { "X-API-Key": "rva_your_api_key_here", "Content-Type": "application/json" },
      body: { query: "spicy street food Mumbai", filters: { diet: "vegan", maxCookTime: 30 } },
    },
    response: {
      status: 200,
      body: {
        success: true,
        query: "spicy street food Mumbai",
        results: [
          { type: "recipe", id: "rec_088", name: "Pav Bhaji", score: 0.97 },
          { type: "recipe", id: "rec_112", name: "Misal Pav", score: 0.91 },
          { type: "ingredient", id: "ing_044", name: "Pav Bhaji Masala", score: 0.85 },
        ],
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/techniques",
    description: "Explore traditional Indian cooking techniques like dum, tadka, baghar, and tawa cooking.",
    request: {
      headers: { "X-API-Key": "rva_your_api_key_here" },
      queryParams: { category: "slow-cooking" },
    },
    response: {
      status: 200,
      body: {
        success: true,
        techniques: [
          { id: "tec_001", name: "Dum Pukht", description: "Slow cooking in a sealed vessel", origin: "Awadhi cuisine", recipes: ["Biryani", "Dum Aloo"] },
          { id: "tec_002", name: "Tandoor", description: "Clay oven cooking at high heat", origin: "Punjabi cuisine", recipes: ["Naan", "Tandoori Chicken"] },
        ],
      },
    },
  },
];

function generateApiKey(name, email) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const segments = [8, 4, 4, 4, 12];
  const uuid = segments
    .map((len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(""))
    .join("-");
  return `rva_${uuid}`;
}

export default function OpenAPI() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState({});
  const [form, setForm] = useState({ name: "", email: "" });
  const [formError, setFormError] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleEndpoint = (i) => setExpandedIndex(expandedIndex === i ? null : i);

  const setTab = (i, tab) => setActiveTab((prev) => ({ ...prev, [i]: tab }));

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setFormError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setFormError("Please enter a valid email address.");
    const key = generateApiKey(form.name, form.email);
    setGeneratedKey(key);
    setSubmitted(true);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setGeneratedKey("");
    setForm({ name: "", email: "" });
    setCopied(false);
  };

  const getMethodCount = (method) => ENDPOINTS.filter((e) => e.method === method).length;

  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back to Home</Link>

      {/* ── Hero Header ── */}
      <div className="oa-hero">
        <div className="oa-hero-left">
          <div className="oa-badge">PUBLIC API</div>
          <h1 className="oa-title">Open Recipe API</h1>
          <p className="oa-subtitle">
            Access India's largest open culinary dataset — recipes, ingredients, cuisines, festivals,
            and cooking techniques — all through a simple, developer-friendly REST API.
          </p>
          <div className="oa-stats">
            <div className="oa-stat">
              <span className="oa-stat-num">{ENDPOINTS.length}</span>
              <span className="oa-stat-label">Endpoints</span>
            </div>
            <div className="oa-stat">
              <span className="oa-stat-num">{getMethodCount("GET")}</span>
              <span className="oa-stat-label">GET</span>
            </div>
            <div className="oa-stat">
              <span className="oa-stat-num">{getMethodCount("POST")}</span>
              <span className="oa-stat-label">POST</span>
            </div>
            <div className="oa-stat">
              <span className="oa-stat-num">v1</span>
              <span className="oa-stat-label">Version</span>
            </div>
          </div>
        </div>
        <div className="oa-hero-right">
          <div className="oa-code-preview">
            <div className="oa-code-bar">
              <span className="oa-code-dot" style={{ background: "#ff5f57" }} />
              <span className="oa-code-dot" style={{ background: "#febc2e" }} />
              <span className="oa-code-dot" style={{ background: "#28c840" }} />
              <span className="oa-code-label">Quick Start</span>
            </div>
            <pre className="oa-code-body">{`curl -X GET \\
  "https://api.rasaveda.in/v1/recipes" \\
  -H "X-API-Key: rva_your_key_here" \\
  -H "Accept: application/json"`}</pre>
          </div>
        </div>
      </div>

      {/* ── Base URL Banner ── */}
      <div className="oa-base-url">
        <span className="oa-base-label">Base URL</span>
        <code className="oa-base-code">https://api.rasaveda.in/v1</code>
        <span className="oa-base-tag">REST · JSON · UTF-8</span>
      </div>

      {/* ── Endpoints Section ── */}
      <section className="oa-section">
        <h2 className="oa-section-title">API Endpoints</h2>
        <p className="oa-section-sub">Click any endpoint to expand request &amp; response examples.</p>

        <div className="oa-endpoint-list">
          {ENDPOINTS.map((ep, i) => {
            const isOpen = expandedIndex === i;
            const tab = activeTab[i] || "request";
            return (
              <div key={i} className={`oa-endpoint ${isOpen ? "oa-endpoint--open" : ""}`}>
                <button className="oa-endpoint-header" onClick={() => toggleEndpoint(i)}>
                  <div className="oa-endpoint-left">
                    <span className={`oa-method oa-method--${ep.method.toLowerCase()}`}>{ep.method}</span>
                    <code className="oa-path">{ep.path}</code>
                  </div>
                  <div className="oa-endpoint-right">
                    <span className="oa-desc-short">{ep.description}</span>
                    <span className="oa-chevron">{isOpen ? "▲" : "▼"}</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="oa-endpoint-body">
                    <p className="oa-full-desc">{ep.description}</p>
                    <div className="oa-tabs">
                      <button
                        className={`oa-tab ${tab === "request" ? "oa-tab--active" : ""}`}
                        onClick={() => setTab(i, "request")}
                      >
                        Request
                      </button>
                      <button
                        className={`oa-tab ${tab === "response" ? "oa-tab--active" : ""}`}
                        onClick={() => setTab(i, "response")}
                      >
                        Response
                      </button>
                    </div>

                    {tab === "request" && (
                      <div className="oa-json-block">
                        <div className="oa-json-header">
                          <span>Request Example</span>
                          <span className="oa-json-lang">JSON</span>
                        </div>
                        <pre className="oa-json">{JSON.stringify(ep.request, null, 2)}</pre>
                      </div>
                    )}

                    {tab === "response" && (
                      <div className="oa-json-block">
                        <div className="oa-json-header">
                          <span>
                            Response Example
                            <span className={`oa-status-badge oa-status--${ep.response.status < 300 ? "ok" : "err"}`}>
                              {ep.response.status}
                            </span>
                          </span>
                          <span className="oa-json-lang">JSON</span>
                        </div>
                        <pre className="oa-json">{JSON.stringify(ep.response.body, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── API Key Registration ── */}
      <section className="oa-section">
        <h2 className="oa-section-title">Get Your API Key</h2>
        <p className="oa-section-sub">
          Register below to receive a free API key. No credit card required — start exploring
          India's culinary data instantly.
        </p>

        <div className="oa-key-wrapper">
          <div className="oa-key-left">
            <div className="oa-perks">
              <div className="oa-perk">
                <span className="oa-perk-icon">🚀</span>
                <div>
                  <strong>Instant Access</strong>
                  <p>Your key is generated immediately — no waiting.</p>
                </div>
              </div>
              <div className="oa-perk">
                <span className="oa-perk-icon">🔓</span>
                <div>
                  <strong>Free Tier</strong>
                  <p>1,000 requests / day at no cost.</p>
                </div>
              </div>
              <div className="oa-perk">
                <span className="oa-perk-icon">📦</span>
                <div>
                  <strong>All Endpoints</strong>
                  <p>Full access to recipes, cuisines, and more.</p>
                </div>
              </div>
              <div className="oa-perk">
                <span className="oa-perk-icon">🛡️</span>
                <div>
                  <strong>Rate Limited</strong>
                  <p>Fair usage policy protects the community.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="oa-key-right">
            {!submitted ? (
              <form className="oa-form" onSubmit={handleSubmit} noValidate>
                <h3 className="oa-form-title">Register for API Access</h3>

                <div className="oa-field">
                  <label className="oa-label" htmlFor="api-name">Full Name</label>
                  <input
                    id="api-name"
                    name="name"
                    type="text"
                    className="oa-input"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={handleFormChange}
                    autoComplete="name"
                  />
                </div>

                <div className="oa-field">
                  <label className="oa-label" htmlFor="api-email">Email Address</label>
                  <input
                    id="api-email"
                    name="email"
                    type="email"
                    className="oa-input"
                    placeholder="e.g. priya@example.com"
                    value={form.email}
                    onChange={handleFormChange}
                    autoComplete="email"
                  />
                </div>

                {formError && <p className="oa-form-error">{formError}</p>}

                <button type="submit" className="oa-submit-btn">
                  Generate API Key →
                </button>

                <p className="oa-form-note">
                  By registering you agree to the RasaVeda API Terms of Service.
                </p>
              </form>
            ) : (
              <div className="oa-key-result">
                <div className="oa-key-success-icon">✓</div>
                <h3 className="oa-key-result-title">Your API Key is Ready!</h3>
                <p className="oa-key-result-sub">
                  Welcome, <strong>{form.name}</strong>! Keep this key safe — treat it like a password.
                </p>

                <div className="oa-key-display">
                  <code className="oa-key-code">{generatedKey}</code>
                  <button
                    className={`oa-copy-btn ${copied ? "oa-copy-btn--copied" : ""}`}
                    onClick={handleCopy}
                    title="Copy to clipboard"
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>

                <div className="oa-key-usage">
                  <p className="oa-key-usage-title">How to use your key:</p>
                  <pre className="oa-key-usage-code">{`// Pass as a header with every request
X-API-Key: ${generatedKey}`}</pre>
                </div>

                <button className="oa-reset-btn" onClick={handleReset}>
                  Register Another Key
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Auth & Rate Limit Info ── */}
      <section className="oa-section oa-info-section">
        <div className="oa-info-grid">
          <div className="oa-info-card">
            <h3>Authentication</h3>
            <p>Pass your API key as a header on every request:</p>
            <code className="oa-inline-code">X-API-Key: rva_your_key</code>
          </div>
          <div className="oa-info-card">
            <h3>Rate Limits</h3>
            <p>Free tier: <strong>1,000 req/day</strong> · <strong>60 req/min</strong></p>
            <p>Rate limit headers are included in every response.</p>
          </div>
          <div className="oa-info-card">
            <h3>Response Format</h3>
            <p>All responses are JSON with a <code className="oa-inline-code">success</code> boolean and data payload.</p>
          </div>
          <div className="oa-info-card">
            <h3>Versioning</h3>
            <p>Current version: <strong>v1</strong>. Version is part of the URL path. Older versions remain supported for 12 months.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
