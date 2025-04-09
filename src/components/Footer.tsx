import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  // Reemplaza estas URLs con las tuyas
  const githubUrl = "https://github.com/talemono";
  const twitterUrl = "https://x.com/ChaloMorann";
  const buyMeACoffeeUrl = "https://patreon.com/dpto";
  const cafecitoUrl = "https://cafecito.app/dpto";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-5 mt-10">
      <hr className="border-t border-gray-300 mb-3" />
      <div className="mb-2 space-x-6 flex flex-wrap justify-center items-center gap-4">
        <a href={cafecitoUrl} rel='noopener' target='_blank' className="inline-block">
          <img 
            srcSet='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x' 
            src='https://cdn.cafecito.app/imgs/buttons/button_5.png' 
            alt='Invitame un café en cafecito.app' 
            className="h-8"
          />
        </a>
        <a
          href={buyMeACoffeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {t('footer.buyMeACoffee')}
        </a>
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