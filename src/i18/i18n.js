import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import enTranslation from "./locales/en/translation.json";
import ptTranslation from "./locales/pt/translation.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: { ...enTranslation },
      pt: { ...ptTranslation },
    },
    lng: "en",
  });

export default i18n;