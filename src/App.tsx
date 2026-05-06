import { useCallback, useState } from 'react';
import { Grid, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RecipeCard from './components/RecipeCard';
import LanguageSelector from './components/LanguageSelector';
import Footer from './components/Footer';
import { recipes } from './data/recipes';
import type { RecipeId } from './data/recipes';
import type { RecipeTextKey, ViewMode } from './types/recipe';

type TemperatureFilter = 'all' | 'hot' | 'cold';
type AlcoholFilter = 'all' | 'with' | 'without';

function App() {
  const { t, i18n } = useTranslation();
  const [activeRecipe, setActiveRecipe] = useState<RecipeId | null>(null);
  const [temperatureFilter, setTemperatureFilter] = useState<TemperatureFilter>('all');
  const [alcoholFilter, setAlcoholFilter] = useState<AlcoholFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const savedViewMode = localStorage.getItem('viewMode');
    return savedViewMode === 'grid' || savedViewMode === 'list' ? savedViewMode : 'grid';
  });

  const toggleViewMode = () => {
    const newMode = viewMode === 'grid' ? 'list' : 'grid';
    setViewMode(newMode);
    localStorage.setItem('viewMode', newMode);
    setActiveRecipe(null);
  };

  const toggleRecipe = (recipeId: RecipeId) => {
    setActiveRecipe((currentRecipe) => currentRecipe === recipeId ? null : recipeId);
  };

  const getRecipeText = useCallback((recipeId: RecipeId, key: RecipeTextKey) => {
    const translatedText = i18n.t(`${recipeId}.${key}`, {
      ns: 'recipes',
      returnObjects: false,
      defaultValue: '',
    });

    return typeof translatedText === 'string' ? translatedText : '';
  }, [i18n]);

  const filteredRecipes = recipes.filter((recipe) => {
    if (
      temperatureFilter !== 'all' &&
      ((temperatureFilter === 'hot' && !recipe.isHot) ||
        (temperatureFilter === 'cold' && recipe.isHot))
    ) {
      return false;
    }

    if (
      alcoholFilter !== 'all' &&
      ((alcoholFilter === 'with' && !recipe.hasAlcohol) ||
        (alcoholFilter === 'without' && recipe.hasAlcohol))
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#f4f0e8] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center text-[#5a3e36]">
            ☕ {t('title')}
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleViewMode}
              className="px-3 py-2 bg-[#7b4e3d] text-white rounded-md flex items-center transition-all duration-300 hover:bg-[#5a3e36]"
              aria-label={viewMode === 'list' ? t('viewMode.grid') : t('viewMode.list')}
              title={viewMode === 'list' ? t('viewMode.grid') : t('viewMode.list')}
            >
              {viewMode === 'list' ? (
                <Grid className="w-5 h-5" />
              ) : (
                <List className="w-5 h-5" />
              )}
            </button>
            <LanguageSelector />
          </div>
        </div>

        <div className="flex flex-wrap justify-center mb-4 space-x-4">
          <button
            onClick={() => setTemperatureFilter('all')}
            className={`px-6 py-2 rounded-full transition-all duration-300 mb-2 ${
              temperatureFilter === 'all'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            {t('filters.all')}
          </button>
          <button
            onClick={() => setTemperatureFilter('hot')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 mb-2 ${
              temperatureFilter === 'hot'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            <span>{t('filters.hot')}</span>
            <span>🔥</span>
          </button>
          <button
            onClick={() => setTemperatureFilter('cold')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 mb-2 ${
              temperatureFilter === 'cold'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            <span>{t('filters.cold')}</span>
            <span>❄️</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center mb-8 space-x-4">
          <button
            onClick={() => setAlcoholFilter('all')}
            className={`px-6 py-2 rounded-full transition-all duration-300 mb-2 ${
              alcoholFilter === 'all'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            {t('filters.allAlcohol')}
          </button>
          <button
            onClick={() => setAlcoholFilter('with')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 mb-2 ${
              alcoholFilter === 'with'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            <span>{t('filters.withAlcohol')}</span>
            <span>🍸</span>
          </button>
          <button
            onClick={() => setAlcoholFilter('without')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 mb-2 ${
              alcoholFilter === 'without'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            <span>{t('filters.withoutAlcohol')}</span>
            <span>🍵</span>
          </button>
        </div>

        <div className={`transition-all duration-500 transform ${
          viewMode === 'list'
            ? 'grid grid-cols-1 gap-6'
            : 'grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 w-full grid-auto-rows-min'
        }`}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isActive={activeRecipe === recipe.id}
              viewMode={viewMode}
              onToggle={toggleRecipe}
              getRecipeText={getRecipeText}
              t={t}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
