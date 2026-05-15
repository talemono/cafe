import { useCallback, useState } from 'react';
import { Grid, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RecipeCard from './components/RecipeCard';
import RecipeFilters from './components/RecipeFilters';
import LanguageSelector from './components/LanguageSelector';
import Footer from './components/Footer';
import { recipes } from './data/recipes';
import type { RecipeId } from './data/recipes';
import type { AlcoholFilter, RecipeTextKey, TemperatureFilter, ViewMode } from './types/recipe';

function App() {
  const { t, i18n } = useTranslation();
  const [activeRecipe, setActiveRecipe] = useState<RecipeId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase(i18n.language);

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

    if (normalizedSearchQuery) {
      const searchableText = [
        getRecipeText(recipe.id, 'title'),
        getRecipeText(recipe.id, 'ingredients'),
      ].join(' ').toLocaleLowerCase(i18n.language);

      if (!searchableText.includes(normalizedSearchQuery)) {
        return false;
      }
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

        <RecipeFilters
          searchQuery={searchQuery}
          temperatureFilter={temperatureFilter}
          alcoholFilter={alcoholFilter}
          onSearchChange={setSearchQuery}
          onTemperatureChange={setTemperatureFilter}
          onAlcoholChange={setAlcoholFilter}
          t={t}
        />

        {filteredRecipes.length > 0 ? (
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
        ) : (
          <p className="py-12 text-center text-[#7b4e3d]">
            {t('search.noResults')}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
