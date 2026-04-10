/** Languages translators can work in (UI + filter key). */
export const TRANSLATION_LANGUAGES = ["Tamil", "Bengali", "Marathi", "Hindi"];

/**
 * Static recipes for the translator workflow.
 * status: "pending_translation" | "translated"
 * targetLanguage: which locale queue this entry belongs to
 */
export const translationQueueRecipes = [
  {
    id: 201,
    name: "Rasam",
    description:
      "Tamarind and tomato soup tempered with mustard seeds, curry leaves, and asafoetida.",
    region: "Tamil Nadu",
    sourceLanguage: "English",
    targetLanguage: "Tamil",
    status: "pending_translation",
  },
  {
    id: 202,
    name: "Pesarattu",
    description:
      "Green moong dal crêpe from Andhra, often served with ginger chutney.",
    region: "Andhra Pradesh",
    sourceLanguage: "English",
    targetLanguage: "Tamil",
    status: "pending_translation",
  },
  {
    id: 203,
    name: "Shukto",
    description:
      "A bittersweet mixed vegetable medley with poppy seed paste and bori.",
    region: "West Bengal",
    sourceLanguage: "English",
    targetLanguage: "Bengali",
    status: "pending_translation",
  },
  {
    id: 204,
    name: "Chingri Malai Curry",
    description: "Prawns cooked in coconut milk with garam masala and green chilies.",
    region: "West Bengal",
    sourceLanguage: "English",
    targetLanguage: "Bengali",
    status: "pending_translation",
  },
  {
    id: 205,
    name: "Puran Poli",
    description: "Sweet flatbread stuffed with chana dal, jaggery, cardamom, and nutmeg.",
    region: "Maharashtra",
    sourceLanguage: "English",
    targetLanguage: "Marathi",
    status: "pending_translation",
  },
  {
    id: 206,
    name: "Bharli Vangi",
    description: "Baby brinjals stuffed with a spiced peanut–sesame masala.",
    region: "Maharashtra",
    sourceLanguage: "English",
    targetLanguage: "Marathi",
    status: "pending_translation",
  },
  {
    id: 207,
    name: "Dum Aloo",
    description: "Baby potatoes in a yogurt-based gravy with Kashmiri red chili.",
    region: "North India",
    sourceLanguage: "English",
    targetLanguage: "Hindi",
    status: "pending_translation",
  },
  {
    id: 208,
    name: "Khichdi",
    description: "One-pot rice and lentil comfort dish with ghee and mild spices.",
    region: "Pan-Indian",
    sourceLanguage: "English",
    targetLanguage: "Hindi",
    status: "pending_translation",
  },
  {
    id: 209,
    name: "Sample — already done",
    description: "Placeholder entry kept translated to verify filtering.",
    region: "Demo",
    sourceLanguage: "English",
    targetLanguage: "Tamil",
    status: "translated",
    translatedTitle: "மாதிரி மொழிபெயர்ப்பு",
    translatedDescription: "இது ஏற்கனவே முடிக்கப்பட்ட ஒரு மாதிரி பதிவு.",
  },
];
