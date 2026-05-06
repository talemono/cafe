export type RecipeTextKey =
  | 'title'
  | 'ingredients'
  | 'grams'
  | 'proportions'
  | 'preparation'
  | 'proTip';

export type ViewMode = 'grid' | 'list';

export interface RecipeMeta {
  id: string;
  emoji: string;
  isHot: boolean;
  hasAlcohol?: boolean;
}
