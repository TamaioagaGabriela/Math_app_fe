import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ro from './locales/ro.json';
import en from './locales/en.json';
import ua from './locales/ua.json';

i18n.use(initReactI18next).init({
  resources: {
    ro: {
      translation: ro
    },
    en: {
      translation: en
    },
    ua: {
      translation: ua
    }
  },
  lng: 'ro', // Set the default language to Romanian
  fallbackLng: 'en', // Use English as the fallback language
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
