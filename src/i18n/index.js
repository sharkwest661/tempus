// src/i18n/index.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./locales/en.json";
import az from "./locales/az.json";

// Detect device language
const deviceLanguage = getLocales()[0]?.languageCode || "en";

const resources = {
  en: {
    translation: en,
  },
  az: {
    translation: az,
  },
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: "v3",
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Load saved language preference
AsyncStorage.getItem("language")
  .then((savedLanguage) => {
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  })
  .catch((error) => {
    console.error("Error loading language preference:", error);
  });

export default i18n;
