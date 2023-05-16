import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslate from "public/locales/en/translation.json";
import jpTranslate from "public/locales/ja/translation.json";

const resources = {
  en: {translation: enTranslate},
  ja: {translation: jpTranslate}
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en',
    supportedLngs: ["en", "ja"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    debug: false
  })

export default i18next;
