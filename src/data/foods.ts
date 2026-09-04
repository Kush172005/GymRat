export interface FoodItem {
  id: string;
  name: string;
  serving: string;
  proteinG: number;
  carbsG: number;
  fatG: number;
  kcal: number;
}

/** Typical cooked/edible portions. Values match common USDA entries. */
export const FOODS: FoodItem[] = [
  { id: 'chicken_100', name: 'Chicken breast', serving: '100 g cooked', proteinG: 31, carbsG: 0, fatG: 3.6, kcal: 165 },
  { id: 'turkey_100', name: 'Turkey breast', serving: '100 g cooked', proteinG: 29, carbsG: 0, fatG: 1, kcal: 135 },
  { id: 'eggs_2', name: 'Eggs', serving: '2 large', proteinG: 13, carbsG: 1, fatG: 10, kcal: 143 },
  { id: 'egg_whites', name: 'Egg whites', serving: '100 g', proteinG: 11, carbsG: 0.7, fatG: 0.2, kcal: 52 },
  { id: 'whey', name: 'Whey protein', serving: '1 scoop (30 g)', proteinG: 24, carbsG: 3, fatG: 1.5, kcal: 120 },
  { id: 'greek_yogurt', name: 'Greek yogurt 0%', serving: '170 g cup', proteinG: 17, carbsG: 7, fatG: 0, kcal: 100 },
  { id: 'cottage', name: 'Cottage cheese', serving: '150 g', proteinG: 17, carbsG: 5, fatG: 6, kcal: 140 },
  { id: 'paneer', name: 'Paneer', serving: '100 g', proteinG: 18, carbsG: 1.2, fatG: 20, kcal: 265 },
  { id: 'salmon', name: 'Salmon', serving: '100 g cooked', proteinG: 25, carbsG: 0, fatG: 13, kcal: 208 },
  { id: 'tuna', name: 'Tuna (canned in water)', serving: '1 can (142 g)', proteinG: 32, carbsG: 0, fatG: 1, kcal: 146 },
  { id: 'shrimp', name: 'Shrimp', serving: '100 g cooked', proteinG: 24, carbsG: 0.2, fatG: 0.3, kcal: 99 },
  { id: 'beef_90', name: 'Lean beef (90%)', serving: '100 g cooked', proteinG: 26, carbsG: 0, fatG: 10, kcal: 196 },
  { id: 'tofu', name: 'Firm tofu', serving: '150 g', proteinG: 17, carbsG: 3, fatG: 9, kcal: 144 },
  { id: 'lentils', name: 'Lentils', serving: '1 cup cooked', proteinG: 18, carbsG: 40, fatG: 1, kcal: 230 },
  { id: 'chickpeas', name: 'Chickpeas', serving: '1 cup cooked', proteinG: 15, carbsG: 45, fatG: 4, kcal: 269 },
  { id: 'rice', name: 'White rice', serving: '1 cup cooked', proteinG: 4, carbsG: 45, fatG: 0.4, kcal: 206 },
  { id: 'quinoa', name: 'Quinoa', serving: '1 cup cooked', proteinG: 8, carbsG: 39, fatG: 4, kcal: 222 },
  { id: 'oats', name: 'Oats', serving: '80 g dry', proteinG: 13, carbsG: 54, fatG: 5, kcal: 307 },
  { id: 'potato', name: 'Potato', serving: '1 medium (173 g)', proteinG: 4, carbsG: 37, fatG: 0.2, kcal: 161 },
  { id: 'sweet_potato', name: 'Sweet potato', serving: '1 medium (114 g)', proteinG: 2, carbsG: 24, fatG: 0.1, kcal: 103 },
  { id: 'banana', name: 'Banana', serving: '1 medium', proteinG: 1.3, carbsG: 27, fatG: 0.4, kcal: 105 },
  { id: 'apple', name: 'Apple', serving: '1 medium', proteinG: 0.5, carbsG: 25, fatG: 0.3, kcal: 95 },
  { id: 'avocado', name: 'Avocado', serving: '1/2 fruit (68 g)', proteinG: 1, carbsG: 4, fatG: 8, kcal: 80 },
  { id: 'broccoli', name: 'Broccoli', serving: '1 cup', proteinG: 2.6, carbsG: 6, fatG: 0.3, kcal: 31 },
  { id: 'olive_oil', name: 'Olive oil', serving: '1 tbsp', proteinG: 0, carbsG: 0, fatG: 14, kcal: 119 },
  { id: 'peanut_butter', name: 'Peanut butter', serving: '2 tbsp', proteinG: 8, carbsG: 6, fatG: 16, kcal: 188 },
  { id: 'milk', name: 'Milk 2%', serving: '250 ml', proteinG: 8, carbsG: 12, fatG: 5, kcal: 122 },
  { id: 'almonds', name: 'Almonds', serving: '28 g (handful)', proteinG: 6, carbsG: 6, fatG: 14, kcal: 164 },
  { id: 'bread', name: 'Whole wheat bread', serving: '2 slices', proteinG: 8, carbsG: 24, fatG: 2, kcal: 140 },
  { id: 'pasta', name: 'Pasta', serving: '1 cup cooked', proteinG: 8, carbsG: 43, fatG: 1.3, kcal: 220 },
];

export function getFood(id: string): FoodItem | undefined {
  return FOODS.find((f) => f.id === id);
}
