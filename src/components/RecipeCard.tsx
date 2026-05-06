import { memo } from 'react';
import type { TFunction } from 'i18next';
import type { Recipe, RecipeId } from '../data/recipes';
import type { RecipeTextKey, ViewMode } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isActive: boolean;
  viewMode: ViewMode;
  onToggle: (id: RecipeId) => void;
  getRecipeText: (id: RecipeId, key: RecipeTextKey) => string;
  t: TFunction;
}

const RecipeCard = memo(({
  recipe,
  isActive,
  viewMode,
  onToggle,
  getRecipeText,
  t,
}: RecipeCardProps) => {
  const isGridExpanded = isActive && viewMode === 'grid';

  return (
    <div
      className={`bg-[#fff8f0] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform ${
        isGridExpanded
          ? 'col-span-2 row-span-2 scale-105 z-10 relative p-4 sm:p-6'
          : viewMode === 'grid'
            ? 'hover:scale-[1.02] p-2 sm:p-3'
            : 'hover:scale-105 p-4 sm:p-6'
      }`}
      onClick={() => onToggle(recipe.id)}
    >
      <div className="w-full">
        <div className={`flex items-center justify-center ${
          isGridExpanded
            ? 'mb-4 text-4xl'
            : viewMode === 'grid'
              ? 'mb-1 text-xl xs:text-2xl sm:text-3xl'
              : 'mb-4 text-4xl'
        }`}>
          {recipe.emoji}
        </div>
        <h2 className={`font-semibold text-[#7b4e3d] text-center ${
          isGridExpanded
            ? 'text-xl mb-4'
            : viewMode === 'grid'
              ? 'text-xs xs:text-sm sm:text-base mb-1'
              : 'text-xl mb-4'
        }`}>
          {getRecipeText(recipe.id, 'title')}
        </h2>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            isActive ? 'max-h-[800px]' : 'max-h-0'
          }`}
        >
          <div className={`space-y-1 sm:space-y-2 text-[#5a3e36] ${
            isGridExpanded
              ? 'text-sm sm:text-base'
              : viewMode === 'grid' ? 'text-[10px] xs:text-xs sm:text-sm' : 'text-sm sm:text-base'
          }`}>
            <p><strong>{t('recipe.ingredients')}:</strong> {getRecipeText(recipe.id, 'ingredients')}</p>
            <p><strong>{t('recipe.coffeeGrams')}:</strong> {getRecipeText(recipe.id, 'grams')}</p>
            <p><strong>{t('recipe.proportions')}:</strong> {getRecipeText(recipe.id, 'proportions')}</p>
            <p><strong>{t('recipe.preparation')}:</strong> {getRecipeText(recipe.id, 'preparation')}</p>
            <p className="italic"><strong>{t('recipe.proTip')}:</strong> {getRecipeText(recipe.id, 'proTip')}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RecipeCard;
