import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  // Reemplaza estas URLs con las tuyas
  const githubUrl = "https://github.com/talemono";
  const twitterUrl = "https://x.com/ChaloMorann";
  const donateUrl = "[TU_ENLACE_DONAR]";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-5 mt-10">
      <hr className="border-t border-gray-300 mb-3" />
      <div className="mb-2 space-x-6">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {t('footer.github')}
        </a>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {t('footer.twitter')}
        </a>
        <a
          href={donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {t('footer.donate')}
        </a>
        <a
          href="mailto:dpto9b@gmail.com"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {t('footer.contact')}
        </a>
      </div>
      <p className="text-xs text-gray-600 mt-3">
        &copy; {currentYear}. {t('footer.copyright')}
      </p>
    </footer>
  );
};

export default Footer; 