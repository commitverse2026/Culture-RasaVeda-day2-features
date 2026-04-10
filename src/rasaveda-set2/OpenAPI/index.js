import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function OpenAPI() {
  /*
=========================================================
 FEATURE: Open Recipe API
 Difficulty: Hard
=========================================================

 GOAL:
A public API documentation page. Developers can register
to get an API key and see all available endpoints.

---------------------------------------------------------
 REQUIREMENTS:
1. API docs page listing all endpoints with method and description
2. Each endpoint expandable to show request/response example
3. API key registration form — name + email → generates a fake key
4. Generated key displayed after registration
5. Copy key button

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create endpoints array with method, path, description, example
STEP 2 — Render endpoint list with expand/collapse per endpoint
STEP 3 — Show request and response JSON on expand
STEP 4 — Add API key registration form (name + email)
STEP 5 — On submit, generate a fake UUID as API key
STEP 6 — Display generated key with a Copy button

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Endpoint list visible with GET/POST method badges
✔ Clicking an endpoint expands request/response examples
✔ Registration form with name and email fields
✔ Submitting generates and displays a fake API key
✔ Copy button copies key to clipboard

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Open Recipe API Docs</h1>

      <div className="todo-box">
        <p>Endpoint list with expand/collapse + API key registration form</p>
      </div>

      <div className="placeholder">📡 EndpointList (GET/POST badges + expand)</div>
      <div className="placeholder">📄 RequestResponseExample (on expand)</div>
      <div className="placeholder">🔑 APIKeyRegistrationForm</div>
      <div className="placeholder">📋 GeneratedKeyDisplay with Copy button</div>
    </div>
  );
}
