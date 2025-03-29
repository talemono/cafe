import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Thermometer } from 'lucide-react';

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
}

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
    isHot: true
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
  }
];

function App() {
  const [activeRecipe, setActiveRecipe] = useState<string | null>(null);
  const [temperatureFilter, setTemperatureFilter] = useState<'all' | 'hot' | 'cold'>('all');

  const toggleRecipe = (recipeId: string) => {
    setActiveRecipe(activeRecipe === recipeId ? null : recipeId);
  };

  const filteredRecipes = recipes.filter(recipe => {
    if (temperatureFilter === 'all') return true;
    return temperatureFilter === 'hot' ? recipe.isHot : !recipe.isHot;
  });

  return (
    <div className="min-h-screen bg-[#f4f0e8] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#5a3e36] mb-8">
          ☕ Recetario de Café
        </h1>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setTemperatureFilter('all')}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              temperatureFilter === 'all'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setTemperatureFilter('hot')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
              temperatureFilter === 'hot'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            <span>Calientes</span> 
            <span>🔥</span>
          </button>
          <button
            onClick={() => setTemperatureFilter('cold')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
              temperatureFilter === 'cold'
                ? 'bg-[#7b4e3d] text-white'
                : 'bg-white text-[#7b4e3d] hover:bg-[#7b4e3d] hover:text-white'
            }`}
          >
            <span>Fríos</span>
            <span>❄️</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-[#fff8f0] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => toggleRecipe(recipe.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4 text-4xl">
                  {recipe.emoji}
                </div>
                <h2 className="text-xl font-semibold text-[#7b4e3d] text-center mb-4">
                  {recipe.title}
                </h2>
                
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    activeRecipe === recipe.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="space-y-3 text-[#5a3e36]">
                    <p><strong>Ingredientes:</strong> {recipe.ingredients}</p>
                    <p><strong>Gramos de café:</strong> {recipe.grams}</p>
                    <p><strong>Proporciones:</strong> {recipe.proportions}</p>
                    <p><strong>Preparación:</strong> {recipe.preparation}</p>
                    <p className="italic"><strong>Pro Tip:</strong> {recipe.proTip}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;