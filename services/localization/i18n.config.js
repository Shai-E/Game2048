import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {resources} from './languages';

i18n.use(initReactI18next).init({
  // debug: true,
  resources,
  compatibilityJSON: 'v3',
  // lng: 'en', // if you're using a language detector, do not define the lng option
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
