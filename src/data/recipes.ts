import type { RecipeMeta } from '../types/recipe';

export const recipes = [
  { id: 'espresso', emoji: '☕️🌟', isHot: true },
  { id: 'americano', emoji: '☕️💧', isHot: true },
  { id: 'latte', emoji: '☕️🥛✨', isHot: true },
  { id: 'cappuccino', emoji: '☕️🥛✨', isHot: true },
  { id: 'macchiato', emoji: '☕️🥛✨', isHot: true },
  { id: 'flat-white', emoji: '☕️🌊', isHot: true },
  { id: 'mocha', emoji: '☕️🍫🥛', isHot: true },
  { id: 'cortado', emoji: '☕️🥛', isHot: true },
  { id: 'cold-brew', emoji: '☕️❄️', isHot: false },
  { id: 'iced-latte', emoji: '☕️🥛❄️', isHot: false },
  { id: 'affogato', emoji: '☕️🍨', isHot: false },
  { id: 'long-black', emoji: '☕️💧✨', isHot: true },
  { id: 'irish-coffee', emoji: '☕️🥃🍶', isHot: true, hasAlcohol: true },
  { id: 'espresso-romano', emoji: '☕️🍋', isHot: true },
  { id: 'nitro-cold-brew', emoji: '☕️❄️💨', isHot: false },
  { id: 'dirty-chai-latte', emoji: '☕️🫖✨', isHot: true },
  { id: 'espresso-tonic', emoji: '☕️🥤❄️', isHot: false },
  { id: 'cafe-irlandes', emoji: '☕️🥃🍀', isHot: true, hasAlcohol: true },
  { id: 'caramel-macchiato', emoji: '☕️🍯✨', isHot: true },
  { id: 'cafe-breve', emoji: '☕️🥛🍦', isHot: true },
  { id: 'submarino', emoji: '🥛🍫🚢', isHot: true },
  { id: 'jamaicano', emoji: '☕️🥃🏝️', isHot: true, hasAlcohol: true },
  { id: 'cremaet', emoji: '☕️🥃🔥', isHot: true, hasAlcohol: true },
  { id: 'cafe-escoces', emoji: '☕️🥃🏴', isHot: true, hasAlcohol: true },
  { id: 'iced-coffee-latte', emoji: '☕️🥛❄️', isHot: false },
  { id: 'cafe-goloso', emoji: '☕️🍮🍯', isHot: true },
  { id: 'batido-cafe', emoji: '☕️🍦🥤', isHot: false },
  { id: 'cafe-aperitivo', emoji: '☕️🍸🍊', isHot: false, hasAlcohol: true },
] as const satisfies readonly RecipeMeta[];

export type Recipe = (typeof recipes)[number];
export type RecipeId = Recipe['id'];
