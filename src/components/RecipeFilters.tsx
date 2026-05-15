import type { TFunction } from 'i18next';
import type { AlcoholFilter, TemperatureFilter } from '../types/recipe';

interface RecipeFiltersProps {
  searchQuery: string;
  temperatureFilter: TemperatureFilter;
  alcoholFilter: AlcoholFilter;
  onSearchChange: (query: string) => void;
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
  searchQuery,
  temperatureFilter,
  alcoholFilter,
  onSearchChange,
  onTemperatureChange,
  onAlcoholChange,
  t,
}: RecipeFiltersProps) {
  return (
    <>
      <div className="mb-6 flex justify-center">
        <label className="w-full max-w-xl">
          <span className="sr-only">{t('search.label')}</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full rounded-full bg-white px-5 py-3 text-[#5a3e36] shadow-sm outline-none ring-1 ring-[#d7c8ba] transition-all duration-300 placeholder:text-[#9c7d6b] focus:ring-2 focus:ring-[#7b4e3d]"
          />
        </label>
      </div>

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
