import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// URLs de imágenes de banderas para cada idioma
const flags: Record<string, string> = {
  en: 'https://flagcdn.com/w40/us.png',
  es: 'https://flagcdn.com/w40/ar.png',
  pt: 'https://flagcdn.com/w40/br.png',
  ko: 'https://flagcdn.com/w40/kr.png',
  fr: 'https://flagcdn.com/w40/fr.png'
};

// Nombres nativos de cada idioma
const nativeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  ko: '한국어',
  fr: 'Français'
};

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Actualizar el idioma actual cuando cambie
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  // Lista de idiomas disponibles
  const languages = [
    { code: 'en', name: nativeNames.en },
    { code: 'es', name: nativeNames.es },
    { code: 'pt', name: nativeNames.pt },
    { code: 'ko', name: nativeNames.ko },
    { code: 'fr', name: nativeNames.fr }
  ];

  // Cambiar idioma
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
      .then(() => {
        // Guardar el idioma en localStorage manualmente para asegurar que se guarda
        localStorage.setItem('cafeAppLanguage', lng);
        setCurrentLang(lng);
        setIsOpen(false);
      })
      .catch(err => console.error("Error al cambiar idioma:", err));
  };

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Obtener el idioma actual o usar español como respaldo
  const displayLanguage = languages.find(lang => lang.code === currentLang) || languages[1];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[44px] h-[44px] sm:w-auto sm:h-auto sm:px-4 py-2 bg-white text-[#7b4e3d] rounded-full flex items-center justify-center sm:justify-start hover:bg-[#f0e8d9] transition-all duration-300 sm:max-w-[120px] overflow-hidden"
      >
        <span className="sm:hidden text-xl">🌐</span>
        <img 
          src={flags[currentLang] || flags.es} 
          alt={currentLang}
          className="w-6 h-4 object-cover flex-shrink-0 hidden sm:block"
        />
        <span className="ml-2 truncate hidden sm:inline">{displayLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`block px-4 py-2 text-sm w-full text-left hover:bg-[#f4f0e8] ${
                  currentLang === language.code ? 'bg-[#f4f0e8] font-medium' : ''
                }`}
              >
                <img 
                  src={flags[language.code]} 
                  alt={language.code}
                  className="w-6 h-4 object-cover inline-block mr-2"
                />
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 