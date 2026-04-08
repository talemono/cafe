import { useState, memo } from 'react';
import type { TFunction } from 'i18next';
import { Grid, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import Footer from './components/Footer';

interface Recipe {
  id: string;
  title: string;
  emoji: string;
  ingredients: string;
  grams: string;
  proportions: string;
  preparation: string;
  proTip: string;
  isHot: boolean;
  hasAlcohol?: boolean;
}

type RecipeTranslationKey = keyof Pick<
  Recipe,
  'title' | 'ingredients' | 'grams' | 'proportions' | 'preparation' | 'proTip'
>;

const recipes: Recipe[] = [
  {
    id: 'espresso',
    title: 'Espresso',
    emoji: '☕️🌟',
    ingredients: 'Café molido + Agua caliente',
    grams: '7-9g',
    proportions: '7-9g de café / 25-30ml de agua',
    preparation: 'Extraer en 25-30 segundos',
    proTip: 'Usa café fresco y agua filtrada',
    isHot: true
  },
  {
    id: 'americano',
    title: 'Americano',
    emoji: '☕️💧',
    ingredients: 'Espresso + Agua caliente',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + 60-90ml agua',
    preparation: 'Espresso primero, luego añadir agua',
    proTip: 'Sirve en taza grande para clientes que prefieren café suave',
    isHot: true
  },
  {
    id: 'latte',
    title: 'Latte',
    emoji: '☕️🥛✨',
    ingredients: 'Espresso + Leche vaporizada + Espuma',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + 150-180ml leche + 1cm espuma',
    preparation: 'Espresso → leche → latte art',
    proTip: 'Temperatura leche: 60-65°C',
    isHot: true
  },
  {
    id: 'cappuccino',
    title: 'Cappuccino',
    emoji: '☕️🥛✨',
    ingredients: 'Espresso + Leche vaporizada + Espuma',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + 60ml leche + 60ml espuma',
    preparation: 'Espresso → leche → espolvorear cacao/canela',
    proTip: 'Usa leche entera para espuma cremosa',
    isHot: true
  },
  {
    id: 'macchiato',
    title: 'Macchiato',
    emoji: '☕️🥛✨',
    ingredients: 'Espresso + Espuma',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + 1 cucharada de espuma',
    preparation: 'Espresso → "manchar" con espuma',
    proTip: 'Sirve en taza pequeña (60-90ml)',
    isHot: true
  },
  {
    id: 'flat-white',
    title: 'Flat White',
    emoji: '☕️🌊',
    ingredients: 'Espresso + Leche microespumada',
    grams: '14-18g (2 shots)',
    proportions: '2 shots espresso (60ml) + 100-120ml leche',
    preparation: 'Espresso → leche integrada (sin espuma gruesa)',
    proTip: 'Ideal para sabor intenso y textura sedosa',
    isHot: true
  },
  {
    id: 'mocha',
    title: 'Mocha',
    emoji: '☕️🍫🥛',
    ingredients: 'Espresso + Chocolate + Leche',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + 15g chocolate + 100ml leche',
    preparation: 'Mezcla espresso con chocolate → añade leche → decora con crema',
    proTip: 'Chocolate de alta calidad mejora el sabor',
    isHot: true
  },
  {
    id: 'cortado',
    title: 'Cortado',
    emoji: '☕️🥛',
    ingredients: 'Espresso + Leche caliente',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + 30ml leche',
    preparation: 'Espresso → leche caliente (sin espuma)',
    proTip: 'Equilibra acidez del café con leche',
    isHot: true
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew',
    emoji: '☕️❄️',
    ingredients: 'Café molido + Agua fría',
    grams: '100g',
    proportions: '1:4 (café:agua) → 100g café + 400ml agua',
    preparation: 'Reposar 12-24h en frío → filtrar',
    proTip: 'Sirve con hielo y jarabe de vainilla',
    isHot: false
  },
  {
    id: 'iced-latte',
    title: 'Iced Latte',
    emoji: '☕️🥛❄️',
    ingredients: 'Espresso + Leche fría + Hielo',
    grams: '14-18g (2 shots)',
    proportions: '2 shots espresso (60ml) + 150ml leche + hielo',
    preparation: 'Espresso → hielo → leche → agitar',
    proTip: 'Usa leche espesa (ej: entera o de avena)',
    isHot: false
  },
  {
    id: 'affogato',
    title: 'Affogato',
    emoji: '☕️🍨',
    ingredients: 'Espresso + Helado de vainilla',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + 1 bola de helado',
    preparation: 'Vierte espresso sobre el helado',
    proTip: 'Sirve inmediatamente para contraste térmico',
    isHot: false
  },
  {
    id: 'long-black',
    title: 'Long Black',
    emoji: '☕️💧✨',
    ingredients: 'Agua caliente + Espresso',
    grams: '7-9g',
    proportions: '60-90ml agua caliente + 1-2 shots espresso (30-60ml)',
    preparation: 'Vierte agua caliente primero, luego añade espresso',
    proTip: 'La diferencia con el Americano es que el espresso se vierte sobre el agua, preservando la crema',
    isHot: true
  },
  {
    id: 'irish-coffee',
    title: 'Irish Coffee',
    emoji: '☕️🥃🍶',
    ingredients: 'Café + Whiskey + Azúcar + Crema batida',
    grams: 'No aplica (usa café preparado)',
    proportions: '1 taza café (240ml) + 30ml whiskey + 1 cucharadita azúcar + crema batida',
    preparation: 'Mezcla café, whiskey y azúcar. Cubre con crema batida',
    proTip: 'Ideal para ocasiones especiales o climas fríos',
    isHot: true,
    hasAlcohol: true
  },
  {
    id: 'espresso-romano',
    title: 'Espresso Romano',
    emoji: '☕️🍋',
    ingredients: 'Espresso + Cáscara de limón',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + cáscara de limón',
    preparation: 'Prepara espresso y exprime una cáscara de limón sobre la taza',
    proTip: 'El limón realza los sabores cítricos del café',
    isHot: true
  },
  {
    id: 'nitro-cold-brew',
    title: 'Nitro Cold Brew',
    emoji: '☕️❄️💨',
    ingredients: 'Café molido + Agua fría + Nitrógeno',
    grams: '100g',
    proportions: '1:4 (café) → 100g café + 400ml agua',
    preparation: 'Prepara cold brew, filtra y sirve con nitrógeno usando una torre especial',
    proTip: 'La infusión de nitrógeno crea una espuma suave similar a la cerveza',
    isHot: false
  },
  {
    id: 'dirty-chai-latte',
    title: 'Dirty Chai Latte',
    emoji: '☕️🫖✨',
    ingredients: 'Té chai + Leche + Espresso',
    grams: '7-9g',
    proportions: '1 taza té chai (240ml) + 1 shot espresso (30ml)',
    preparation: 'Prepara té chai con leche, añade un shot de espresso',
    proTip: 'Combina las especias del chai con el sabor robusto del café',
    isHot: true
  },
  {
    id: 'espresso-tonic',
    title: 'Espresso Tonic',
    emoji: '☕️🥤❄️',
    ingredients: 'Espresso + Agua tónica + Hielo',
    grams: '7-9g',
    proportions: '1 shot espresso (30ml) + 150ml agua tónica',
    preparation: 'Sirve agua tónica con hielo, luego vierte espresso lentamente',
    proTip: 'Refrescante y perfecto para días calurosos',
    isHot: false
  },
  {
    id: 'cafe-irlandes',
    title: 'Café Irlandés',
    emoji: '☕️🥃🍀',
    ingredients: 'Café filtrado + Whiskey irlandés + Azúcar moreno + Crema batida',
    grams: '14-16g',
    proportions: '180ml café filtrado + 45ml whiskey + 1 cucharada azúcar moreno + 30ml crema batida',
    preparation: 'Calienta la taza con agua caliente → vacía → añade azúcar y café → incorpora whiskey → flota la crema batida encima (sin mezclar)',
    proTip: 'Bebe a través de la crema para experimentar la mezcla de temperaturas y sabores',
    isHot: true,
    hasAlcohol: true
  },
  {
    id: 'caramel-macchiato',
    title: 'Caramel Macchiato',
    emoji: '☕️🍯✨',
    ingredients: 'Espresso + Leche vaporizada + Jarabe de vainilla + Caramelo',
    grams: '14-18g (doble espresso)',
    proportions: '60ml espresso + 180ml leche + 15ml jarabe de vainilla + 10ml salsa de caramelo',
    preparation: 'Jarabe de vainilla en el fondo → leche vaporizada → espresso → decorar con caramelo en patrón de rejilla',
    proTip: 'Sirve en vaso transparente para apreciar las capas',
    isHot: true
  },
  {
    id: 'cafe-breve',
    title: 'Café Breve',
    emoji: '☕️🥛🍦',
    ingredients: 'Espresso + Mitad crema para batir, mitad leche',
    grams: '7-9g',
    proportions: '30ml espresso + 120ml de mezcla 50/50 de crema y leche',
    preparation: 'Vaporiza la mezcla de crema y leche → espresso → añade la mezcla vaporizada',
    proTip: 'Más rico y cremoso que un latte tradicional, perfecto para paladares que prefieren sabores más intensos',
    isHot: true
  },
  {
    id: 'submarino',
    title: 'Submarino',
    emoji: '🥛🍫🚢',
    ingredients: 'Leche caliente + Barra de chocolate',
    grams: 'No aplica (no lleva café)',
    proportions: '200ml leche caliente + 30g barra de chocolate negro',
    preparation: 'Calienta la leche sin hervir → sirve en taza alta → coloca la barra de chocolate verticalmente como "submarino"',
    proTip: 'Deja que el comensal sumerja y derrita el chocolate según su gusto',
    isHot: true
  },
  {
    id: 'jamaicano',
    title: 'Jamaicano',
    emoji: '☕️🥃🏝️',
    ingredients: 'Espresso + Ron añejo + Crema batida + Canela + Chocolate',
    grams: '7-9g',
    proportions: '30ml espresso + 20ml ron + 30ml crema batida + pizca de canela + ralladura de chocolate',
    preparation: 'Mezcla el espresso con ron → añade crema batida encima → espolvorea canela y ralladura de chocolate',
    proTip: 'Sirve con un bastoncillo de canela como decoración y para remover',
    isHot: true,
    hasAlcohol: true
  },
  {
    id: 'cremaet',
    title: 'Cremaet',
    emoji: '☕️🥃🔥',
    ingredients: 'Espresso + Brandy + Azúcar + Canela + Cáscara de limón + Granos de café',
    grams: '7-9g',
    proportions: '30ml espresso + 20ml brandy + 1 cucharada de azúcar + 1 rama de canela + cáscara de 1/4 limón + 3 granos de café',
    preparation: 'Calienta el brandy con azúcar, canela, cáscara de limón y granos → flamea hasta caramelizar → añade el espresso caliente',
    proTip: 'Tradicional de Valencia, sirve con una pequeña cuchara para disfrutar del azúcar caramelizado',
    isHot: true,
    hasAlcohol: true
  },
  {
    id: 'cafe-escoces',
    title: 'Café Escocés',
    emoji: '☕️🥃🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    ingredients: 'Café espresso + Whisky escocés + Nata montada + Cacao en polvo',
    grams: '7-9g',
    proportions: '30ml espresso + 30ml whisky escocés + 30ml nata montada + pizca de cacao en polvo',
    preparation: 'Mezcla el espresso con el whisky → corona con nata montada → espolvorea cacao en polvo',
    proTip: 'Usa un whisky ahumado para resaltar las notas del café',
    isHot: true,
    hasAlcohol: true
  },
  {
    id: 'iced-coffee-latte',
    title: 'Iced Coffee Latte',
    emoji: '☕️🥛❄️',
    ingredients: 'Café espresso + Leche fría + Hielo + Sirope (opcional)',
    grams: '14-18g (doble espresso)',
    proportions: '60ml espresso + 120ml leche fría + hielo abundante + 15ml sirope (opcional)',
    preparation: 'Prepara el espresso y deja enfriar → llena un vaso con hielo → añade la leche fría → vierte el espresso → añade sirope al gusto',
    proTip: 'Para un sabor más intenso, congela el café en cubitos y úsalos en lugar del hielo normal',
    isHot: false
  },
  {
    id: 'cafe-goloso',
    title: 'Café Goloso',
    emoji: '☕️🍮🍯',
    ingredients: 'Café espresso + Leche condensada + Nata montada + Chocolate rallado',
    grams: '7-9g',
    proportions: '30ml espresso + 30ml leche condensada + 30ml nata montada + chocolate rallado para decorar',
    preparation: 'Vierte la leche condensada en el fondo de la taza → añade el espresso → corona con nata montada → decora con chocolate rallado',
    proTip: 'Sirve con una galleta para acompañar y balancear el dulzor',
    isHot: true
  },
  {
    id: 'batido-cafe',
    title: 'Batido de Café',
    emoji: '☕️🍦🥤',
    ingredients: 'Café espresso frío + Helado de vainilla + Leche fría + Nata montada',
    grams: '14-18g (doble espresso)',
    proportions: '60ml espresso frío + 2 bolas de helado de vainilla + 120ml leche fría + nata montada para decorar',
    preparation: 'Prepara el espresso y deja enfriar → mezcla en una batidora con el helado y la leche → sirve en vaso alto → decora con nata montada',
    proTip: 'Añade una cucharadita de cacao en polvo a la mezcla para un toque extra de sabor',
    isHot: false
  },
  {
    id: 'cafe-aperitivo',
    title: 'Café Aperitivo',
    emoji: '☕️🍸🍊',
    ingredients: 'Café espresso + Vermut rojo + Twist de naranja + Hielo',
    grams: '7-9g',
    proportions: '30ml espresso + 60ml vermut rojo + cáscara de naranja + hielo',
    preparation: 'Prepara el espresso y deja enfriar → añade hielo a un vaso bajo → vierte el vermut → añade el espresso frío → aromatiza con la cáscara de naranja',
    proTip: 'Sirve con una aceituna verde para un contraste salado-amargo interesante',
    isHot: false,
    hasAlcohol: true
  }
];

// Componente de tarjeta memoizado para optimizar el rendimiento
const RecipeCard = memo(({ 
  recipe, 
  toggleRecipe, 
  getRecipeTranslation, 
  viewMode,
  isActive,
  t 
}: { 
  recipe: Recipe; 
  toggleRecipe: (id: string) => void; 
  getRecipeTranslation: (id: string, prop: RecipeTranslationKey) => string | null;
  viewMode: 'grid' | 'list';
  isActive: boolean;
  t: TFunction;
}) => {
  // Determinar si la tarjeta está expandida en modo grilla
  const isGridExpanded = isActive && viewMode === 'grid';

  return (
    <div
      key={recipe.id}
      className={`bg-[#fff8f0] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform ${
        isGridExpanded 
          ? 'col-span-2 row-span-2 scale-105 z-10 relative p-4 sm:p-6'
          : viewMode === 'grid' 
            ? 'hover:scale-[1.02] p-2 sm:p-3'
            : 'hover:scale-105 p-4 sm:p-6'
      }`}
      onClick={() => toggleRecipe(recipe.id)}
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
          {getRecipeTranslation(recipe.id, 'title') || recipe.title}
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
            <p><strong>{t('recipe.ingredients')}:</strong> {getRecipeTranslation(recipe.id, 'ingredients') || recipe.ingredients}</p>
            <p><strong>{t('recipe.coffeeGrams')}:</strong> {getRecipeTranslation(recipe.id, 'grams') || recipe.grams}</p>
            <p><strong>{t('recipe.proportions')}:</strong> {getRecipeTranslation(recipe.id, 'proportions') || recipe.proportions}</p>
            <p><strong>{t('recipe.preparation')}:</strong> {getRecipeTranslation(recipe.id, 'preparation') || recipe.preparation}</p>
            <p className="italic"><strong>{t('recipe.proTip')}:</strong> {getRecipeTranslation(recipe.id, 'proTip') || recipe.proTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

function App() {
  const { t, i18n } = useTranslation();
  const [activeRecipe, setActiveRecipe] = useState<string | null>(null);
  const [temperatureFilter, setTemperatureFilter] = useState<'all' | 'hot' | 'cold'>('all');
  const [alcoholFilter, setAlcoholFilter] = useState<'all' | 'with' | 'without'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    const savedViewMode = localStorage.getItem('viewMode');
    return savedViewMode === 'grid' || savedViewMode === 'list' ? savedViewMode : 'grid';
  });

  // Función para cambiar el modo de visualización
  const toggleViewMode = () => {
    const newMode = viewMode === 'grid' ? 'list' : 'grid';
    setViewMode(newMode);
    // Guardar la preferencia en localStorage
    localStorage.setItem('viewMode', newMode);
    
    // Cerrar cualquier receta abierta al cambiar el modo de visualización
    setActiveRecipe(null);
  };

  const toggleRecipe = (recipeId: string) => {
    setActiveRecipe(activeRecipe === recipeId ? null : recipeId);
  };

  const filteredRecipes = recipes.filter(recipe => {
    if (temperatureFilter !== 'all' && 
        ((temperatureFilter === 'hot' && !recipe.isHot) || 
         (temperatureFilter === 'cold' && recipe.isHot))) {
      return false;
    }
    
    if (alcoholFilter !== 'all' && 
        ((alcoholFilter === 'with' && !recipe.hasAlcohol) || 
         (alcoholFilter === 'without' && recipe.hasAlcohol))) {
      return false;
    }
    
    return true;
  });

  // Función para obtener la traducción de una propiedad de receta
  const getRecipeTranslation = (recipeId: string, property: RecipeTranslationKey) => {
    // Intentamos obtener la traducción, si no existe usamos el valor original
    try {
      // Obtenemos el texto traducido del namespace 'recipes'
      const translatedText = i18n.t(`${recipeId}.${property}`, { 
        ns: 'recipes',
        returnObjects: false,
        defaultValue: '' // Valor por defecto en caso de que falle
      });
      
      // Si tenemos una traducción válida, la usamos
      if (translatedText && translatedText !== '' && 
          translatedText !== `${recipeId}.${property}`) {
        return translatedText;
      }
      
      // Si no hay traducción, buscamos la receta original por ID
      const originalRecipe = recipes.find((recipe) => recipe.id === recipeId);
      if (originalRecipe) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - accedemos dinámicamente a la propiedad
        return originalRecipe[property];
      }
      
      return null;
    } catch (error) {
      console.error('Error al obtener traducción:', error);
      // En caso de error, intentamos devolver el valor original
      const originalRecipe = recipes.find((recipe) => recipe.id === recipeId);
      if (originalRecipe) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - accedemos dinámicamente a la propiedad
        return originalRecipe[property];
      }
      return null;
    }
  };

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
              toggleRecipe={toggleRecipe}
              getRecipeTranslation={getRecipeTranslation}
              viewMode={viewMode}
              isActive={activeRecipe === recipe.id}
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
