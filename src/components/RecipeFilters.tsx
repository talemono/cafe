import type { TFunction } from 'i18next';
import type { AlcoholFilter, TemperatureFilter } from '../types/recipe';

interface RecipeFiltersProps {
  temperatureFilter: TemperatureFilter;
  alcoholFilter: AlcoholFilter;
  onTemperatureChange: (filter: TemperatureFilter) => void;
  onAlcoholChange: (filter: AlcoholFilter) => void;
  t: TFunction;
}

const getFilterButtonClass = (isActive: boolean) => (
  `px-6 py-2 rounded-full transition-all duration-300 mb-2 ${
    isActive
      ? 'bg-[#7b4e3d] text-white'
      : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
  }`
);

const getIconFilterButtonClass = (isActive: boolean) => (
  `${getFilterButtonClass(isActive)} flex items-center space-x-2`
);

function RecipeFilters({
  temperatureFilter,
  alcoholFilter,
  onTemperatureChange,
  onAlcoholChange,
  t,
}: RecipeFiltersProps) {
  return (
    <>
      <div className="flex flex-wrap justify-center mb-4 space-x-4">
        <button
          onClick={() => onTemperatureChange('all')}
          className={getFilterButtonClass(temperatureFilter === 'all')}
        >
          {t('filters.all')}
        </button>
        <button
          onClick={() => onTemperatureChange('hot')}
          className={getIconFilterButtonClass(temperatureFilter === 'hot')}
        >
          <span>{t('filters.hot')}</span>
          <span>🔥</span>
        </button>
        <button
          onClick={() => onTemperatureChange('cold')}
          className={getIconFilterButtonClass(temperatureFilter === 'cold')}
        >
          <span>{t('filters.cold')}</span>
          <span>❄️</span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center mb-8 space-x-4">
        <button
          onClick={() => onAlcoholChange('all')}
          className={getFilterButtonClass(alcoholFilter === 'all')}
        >
          {t('filters.allAlcohol')}
        </button>
        <button
          onClick={() => onAlcoholChange('with')}
          className={getIconFilterButtonClass(alcoholFilter === 'with')}
        >
          <span>{t('filters.withAlcohol')}</span>
          <span>🍸</span>
        </button>
        <button
          onClick={() => onAlcoholChange('without')}
          className={getIconFilterButtonClass(alcoholFilter === 'without')}
        >
          <span>{t('filters.withoutAlcohol')}</span>
          <span>🍵</span>
        </button>
      </div>
    </>
  );
}

export default RecipeFilters;
