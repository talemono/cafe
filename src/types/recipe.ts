export type RecipeTextKey =
  | 'title'
  | 'ingredients'
  | 'grams'
  | 'proportions'
  | 'preparation'
  | 'proTip';

export type ViewMode = 'grid' | 'list';
export type TemperatureFilter = 'all' | 'hot' | 'cold';
export type AlcoholFilter = 'all' | 'with' | 'without';

export interface RecipeMeta {
  id: string;
  emoji: string;
  isHot: boolean;
  hasAlcohol?: boolean;
}
