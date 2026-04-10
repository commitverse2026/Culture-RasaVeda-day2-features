/** Sample issues for cultural-accuracy tracker (feature-local). */
export const INITIAL_ISSUES = [
  {
    id: "iss-seed-1",
    recipe: "Rogan Josh",
    category: "Wrong Info",
    description:
      "The page lists yogurt as optional; in traditional Kashmiri Pandit versions it is central to the marinade.",
    status: "open",
    resolutionNote: "",
    createdAt: "2026-03-12T10:00:00.000Z",
    resolvedAt: null,
  },
  {
    id: "iss-seed-2",
    recipe: "Bisi Bele Bath",
    category: "Missing Context",
    description:
      "No mention of the dish's association with Karnataka or the typical use of tamarind and jaggery in the masala.",
    status: "open",
    resolutionNote: "",
    createdAt: "2026-03-14T14:30:00.000Z",
    resolvedAt: null,
  },
  {
    id: "iss-seed-3",
    recipe: "Pav Bhaji",
    category: "Other",
    description:
      "Street-food origin (Mumbai) could be cited in the intro for cultural context.",
    status: "resolved",
    resolutionNote:
      "Added a short heritage note linking the dish to Mumbai street stalls and mid-century stall culture.",
    createdAt: "2026-02-01T09:00:00.000Z",
    resolvedAt: "2026-02-03T16:20:00.000Z",
  },
];

export const FLAG_CATEGORIES = [
  "Wrong Info",
  "Missing Context",
  "Offensive",
  "Other",
];
