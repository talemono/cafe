import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importamos los archivos de idioma
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationPT from './locales/pt.json';
import translationKO from './locales/ko.json';
import translationFR from './locales/fr.json';

// Importamos las traducciones de recetas
import recipesEN from './locales/recipes/en.json';
import recipesES from './locales/recipes/es.json';
import recipesPT from './locales/recipes/pt.json';
import recipesKO from './locales/recipes/ko.json';
import recipesFR from './locales/recipes/fr.json';

// Recursos para i18next
const resources = {
  en: {
    translation: translationEN.translation,
    recipes: recipesEN
  },
  es: {
    translation: translationES.translation,
    recipes: recipesES
  },
  pt: {
    translation: translationPT.translation,
    recipes: recipesPT
  },
  ko: {
    translation: translationKO.translation,
    recipes: recipesKO
  },
  fr: {
    translation: translationFR.translation,
    recipes: recipesFR
  }
};

// Configuración de localStorage para guardar la preferencia de idioma
const languageDetectorOptions = {
  // Orden en que intentará detectar el idioma
  order: ['localStorage', 'navigator'],
  // Clave en localStorage
  lookupLocalStorage: 'cafeAppLanguage'
};

i18n
  // Usamos el detector de idioma del navegador
  .use(LanguageDetector)
  // Pasamos el módulo i18n a react-i18next
  .use(initReactI18next)
  // Inicializamos i18next
  .init({
    resources,
    fallbackLng: 'es', // Idioma de respaldo
    detection: languageDetectorOptions,
    interpolation: {
      escapeValue: false // No es necesario para React
    }
  });

export default i18n; 