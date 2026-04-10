import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./pages/Navbar";

// Features from rasaveda-set2
import AISuggestions from "./rasaveda-set2/AISuggestions";
import ContributorLeaderboard from "./rasaveda-set2/ContributorLeaderboard";
import CrossCultureTool from "./rasaveda-set2/CrossCultureTool";
import DatasetExport from "./rasaveda-set2/DatasetExport";
import DebateBoard from "./rasaveda-set2/DebateBoard";
import HeritageBadges from "./rasaveda-set2/HeritageBadges";
import IssueTracker from "./rasaveda-set2/IssueTracker";
import MediaContribution from "./rasaveda-set2/MediaContribution";
import MultilingualContribution from "./rasaveda-set2/MultilingualContribution";
import NutritionMapper from "./rasaveda-set2/NutritionMapper";
import OpenAPI from "./rasaveda-set2/OpenAPI";
import RecipeSubmission from "./rasaveda-set2/RecipeSubmission";
import SubstitutionEngine from "./rasaveda-set2/SubstitutionEngine";
import TaggingSystem from "./rasaveda-set2/TaggingSystem";
import VersionControl from "./rasaveda-set2/VersionControl";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Updated Routes for Set 2 */}
        <Route path="/ai-suggestions" element={<AISuggestions />} />
        <Route path="/leaderboard" element={<ContributorLeaderboard />} />
        <Route path="/cross-culture" element={<CrossCultureTool />} />
        <Route path="/export" element={<DatasetExport />} />
        <Route path="/debate" element={<DebateBoard />} />
        <Route path="/badges" element={<HeritageBadges />} />
        <Route path="/issues" element={<IssueTracker />} />
        <Route path="/media-upload" element={<MediaContribution />} />
        <Route path="/multilingual" element={<MultilingualContribution />} />
        <Route path="/nutrition" element={<NutritionMapper />} />
        <Route path="/api-docs" element={<OpenAPI />} />
        <Route path="/submit-recipe" element={<RecipeSubmission />} />
        <Route path="/substitutions" element={<SubstitutionEngine />} />
        <Route path="/tags" element={<TaggingSystem />} />
        <Route path="/history" element={<VersionControl />} />
        
      </Routes>
    </BrowserRouter>
  );
}

