import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function MediaContribution() {
  /*
=========================================================
 FEATURE: Photo & Video Contribution Module
 Difficulty: Medium
=========================================================

 GOAL:
Contributors attach photos/videos to recipes.
All uploaded media displays in a gallery on the recipe page.

---------------------------------------------------------
 REQUIREMENTS:
1. Static recipe with a media[] array
2. File upload input accepting images and videos
3. On upload, create an object URL and add to media[]
4. Gallery section showing all uploaded media
5. Clicking a media item opens it in a lightbox

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create recipe object with media[] in useState
STEP 2 — Add file input that accepts image/* and video/*
STEP 3 — On file select, use URL.createObjectURL to preview
STEP 4 — Push new media object into media[]
STEP 5 — Render media gallery grid
STEP 6 — Add useState for lightboxItem
STEP 7 — Clicking a media item sets lightboxItem and shows overlay

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ File upload button visible
✔ Selecting an image/video adds it to the gallery
✔ Gallery grid shows all uploaded media
✔ Video items show a play indicator
✔ Clicking any item opens it in a lightbox overlay

=========================================================
*/
  return (
    <div className="feature-page">
      <Link to="/" className="page-back">← Back</Link>
      <h1>Photo & Video Contribution Module</h1>

      <div className="todo-box">
        <p>File upload + media gallery grid + lightbox on click</p>
      </div>

      <div className="placeholder">📤 FileUploadButton (image + video)</div>
      <div className="placeholder">🖼️ MediaGalleryGrid</div>
      <div className="placeholder">🔲 LightboxOverlay on click</div>
    </div>
  );
}
