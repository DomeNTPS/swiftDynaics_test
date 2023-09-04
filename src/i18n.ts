import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation, initReactI18next } from "react-i18next";
import TranslationEN from "../public/locales/en/translation.json";
import TranslationTH from "../public/locales/th/translation.json";

// const resources = {
//   en: {
//     translation: TranslationEN,
//   },
//   th: {
//     translation: TranslationTH,
//   },
// };

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // resources,
    // resources: {
    //   en: {
    //     translation: {
    //       "key": "hello world"
    //     }
    //   }
    // },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
