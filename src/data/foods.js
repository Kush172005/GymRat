/** Typical cooked/edible portions. Values match common USDA entries (IFCT/typical published values for Indian dishes). */
export const FOODS = [
  // --- Original 30 ---
  { id: 'chicken_100', name: 'Chicken breast', serving: '100 g cooked', proteinG: 31, carbsG: 0, fatG: 3.6, kcal: 165, category: 'protein' },
  { id: 'turkey_100', name: 'Turkey breast', serving: '100 g cooked', proteinG: 29, carbsG: 0, fatG: 1, kcal: 135, category: 'protein' },
  { id: 'eggs_2', name: 'Eggs', serving: '2 large', proteinG: 13, carbsG: 1, fatG: 10, kcal: 143, category: 'protein' },
  { id: 'egg_whites', name: 'Egg whites', serving: '100 g', proteinG: 11, carbsG: 0.7, fatG: 0.2, kcal: 52, category: 'protein' },
  { id: 'whey', name: 'Whey protein', serving: '1 scoop (30 g)', proteinG: 24, carbsG: 3, fatG: 1.5, kcal: 120, category: 'protein' },
  { id: 'greek_yogurt', name: 'Greek yogurt 0%', serving: '170 g cup', proteinG: 17, carbsG: 7, fatG: 0, kcal: 100, category: 'dairy' },
  { id: 'cottage', name: 'Cottage cheese', serving: '150 g', proteinG: 17, carbsG: 5, fatG: 6, kcal: 140, category: 'dairy' },
  { id: 'paneer', name: 'Paneer', serving: '100 g', proteinG: 18, carbsG: 1.2, fatG: 20, kcal: 265, category: 'dairy' },
  { id: 'salmon', name: 'Salmon', serving: '100 g cooked', proteinG: 25, carbsG: 0, fatG: 13, kcal: 208, category: 'protein' },
  { id: 'tuna', name: 'Tuna (canned in water)', serving: '1 can (142 g)', proteinG: 32, carbsG: 0, fatG: 1, kcal: 146, category: 'protein' },
  { id: 'shrimp', name: 'Shrimp', serving: '100 g cooked', proteinG: 24, carbsG: 0.2, fatG: 0.3, kcal: 99, category: 'protein' },
  { id: 'beef_90', name: 'Lean beef (90%)', serving: '100 g cooked', proteinG: 26, carbsG: 0, fatG: 10, kcal: 196, category: 'protein' },
  { id: 'tofu', name: 'Firm tofu', serving: '150 g', proteinG: 17, carbsG: 3, fatG: 9, kcal: 144, category: 'protein' },
  { id: 'lentils', name: 'Lentils', serving: '1 cup cooked', proteinG: 18, carbsG: 40, fatG: 1, kcal: 230, category: 'protein' },
  { id: 'chickpeas', name: 'Chickpeas', serving: '1 cup cooked', proteinG: 15, carbsG: 45, fatG: 4, kcal: 269, category: 'protein' },
  { id: 'rice', name: 'White rice', serving: '1 cup cooked', proteinG: 4, carbsG: 45, fatG: 0.4, kcal: 206, category: 'carb' },
  { id: 'quinoa', name: 'Quinoa', serving: '1 cup cooked', proteinG: 8, carbsG: 39, fatG: 4, kcal: 222, category: 'carb' },
  { id: 'oats', name: 'Oats', serving: '80 g dry', proteinG: 13, carbsG: 54, fatG: 5, kcal: 307, category: 'carb' },
  { id: 'potato', name: 'Potato', serving: '1 medium (173 g)', proteinG: 4, carbsG: 37, fatG: 0.2, kcal: 161, category: 'carb' },
  { id: 'sweet_potato', name: 'Sweet potato', serving: '1 medium (114 g)', proteinG: 2, carbsG: 24, fatG: 0.1, kcal: 103, category: 'carb' },
  { id: 'banana', name: 'Banana', serving: '1 medium', proteinG: 1.3, carbsG: 27, fatG: 0.4, kcal: 105, category: 'fruit' },
  { id: 'apple', name: 'Apple', serving: '1 medium', proteinG: 0.5, carbsG: 25, fatG: 0.3, kcal: 95, category: 'fruit' },
  { id: 'avocado', name: 'Avocado', serving: '1/2 fruit (68 g)', proteinG: 1, carbsG: 4, fatG: 8, kcal: 80, category: 'fat' },
  { id: 'broccoli', name: 'Broccoli', serving: '1 cup', proteinG: 2.6, carbsG: 6, fatG: 0.3, kcal: 31, category: 'veg' },
  { id: 'olive_oil', name: 'Olive oil', serving: '1 tbsp', proteinG: 0, carbsG: 0, fatG: 14, kcal: 119, category: 'fat' },
  { id: 'peanut_butter', name: 'Peanut butter', serving: '2 tbsp', proteinG: 8, carbsG: 6, fatG: 16, kcal: 188, category: 'fat' },
  { id: 'milk', name: 'Milk 2%', serving: '250 ml', proteinG: 8, carbsG: 12, fatG: 5, kcal: 122, category: 'dairy' },
  { id: 'almonds', name: 'Almonds', serving: '28 g (handful)', proteinG: 6, carbsG: 6, fatG: 14, kcal: 164, category: 'fat' },
  { id: 'bread', name: 'Whole wheat bread', serving: '2 slices', proteinG: 8, carbsG: 24, fatG: 2, kcal: 140, category: 'carb' },
  { id: 'pasta', name: 'Pasta', serving: '1 cup cooked', proteinG: 8, carbsG: 43, fatG: 1.3, kcal: 220, category: 'carb' },

  // --- More Western meats & fish ---
  { id: 'pork_tenderloin', name: 'Pork tenderloin', serving: '100 g cooked', proteinG: 26, carbsG: 0, fatG: 3.5, kcal: 137, category: 'protein' },
  { id: 'ground_beef_8020', name: 'Ground beef (80/20)', serving: '100 g cooked', proteinG: 24, carbsG: 0, fatG: 20, kcal: 272, category: 'protein' },
  { id: 'ground_turkey', name: 'Ground turkey (93% lean)', serving: '100 g cooked', proteinG: 27, carbsG: 0, fatG: 8, kcal: 176, category: 'protein' },
  { id: 'cod', name: 'Cod', serving: '100 g cooked', proteinG: 23, carbsG: 0, fatG: 0.9, kcal: 105, category: 'protein' },
  { id: 'tilapia', name: 'Tilapia', serving: '100 g cooked', proteinG: 26, carbsG: 0, fatG: 2.7, kcal: 128, category: 'protein' },
  { id: 'sardines', name: 'Sardines (canned in oil, drained)', serving: '100 g', proteinG: 25, carbsG: 0, fatG: 11, kcal: 208, category: 'protein' },
  { id: 'chicken_thigh', name: 'Chicken thigh (skinless)', serving: '100 g cooked', proteinG: 26, carbsG: 0, fatG: 10.9, kcal: 209, category: 'protein' },
  { id: 'bacon', name: 'Bacon', serving: '2 slices cooked', proteinG: 6, carbsG: 0.3, fatG: 8, kcal: 92, category: 'protein' },
  { id: 'deli_turkey', name: 'Turkey breast (deli slices)', serving: '100 g', proteinG: 22, carbsG: 2, fatG: 1, kcal: 104, category: 'protein' },

  // --- More dairy & eggs ---
  { id: 'egg_1', name: 'Egg, whole', serving: '1 large', proteinG: 6.3, carbsG: 0.6, fatG: 5, kcal: 72, category: 'protein' },
  { id: 'string_cheese', name: 'String cheese (mozzarella)', serving: '1 stick (28 g)', proteinG: 6, carbsG: 1, fatG: 6, kcal: 80, category: 'dairy' },
  { id: 'cheddar_cheese', name: 'Cheddar cheese', serving: '1 slice (28 g)', proteinG: 7, carbsG: 0.4, fatG: 9, kcal: 113, category: 'dairy' },
  { id: 'feta_cheese', name: 'Feta cheese', serving: '30 g crumbled', proteinG: 4, carbsG: 1.2, fatG: 6.3, kcal: 79, category: 'dairy' },
  { id: 'parmesan', name: 'Parmesan cheese (grated)', serving: '2 tbsp (10 g)', proteinG: 4, carbsG: 0.4, fatG: 2.9, kcal: 43, category: 'dairy' },
  { id: 'soy_milk', name: 'Soy milk (unsweetened)', serving: '250 ml', proteinG: 7, carbsG: 4, fatG: 4, kcal: 80, category: 'dairy' },
  { id: 'almond_milk', name: 'Almond milk (unsweetened)', serving: '250 ml', proteinG: 1, carbsG: 2, fatG: 2.5, kcal: 37, category: 'dairy' },

  // --- More carbs ---
  { id: 'brown_rice', name: 'Brown rice', serving: '1 cup cooked', proteinG: 5, carbsG: 45, fatG: 1.8, kcal: 216, category: 'carb' },
  { id: 'couscous', name: 'Couscous', serving: '1 cup cooked', proteinG: 6, carbsG: 36, fatG: 0.3, kcal: 176, category: 'carb' },
  { id: 'whole_wheat_pasta', name: 'Whole wheat pasta', serving: '1 cup cooked', proteinG: 7.5, carbsG: 37, fatG: 0.8, kcal: 174, category: 'carb' },
  { id: 'bagel', name: 'Plain bagel', serving: '1 medium (95 g)', proteinG: 10, carbsG: 55, fatG: 1.5, kcal: 277, category: 'carb' },
  { id: 'tortilla', name: 'Flour tortilla', serving: '1 medium (49 g)', proteinG: 4, carbsG: 26, fatG: 3.5, kcal: 146, category: 'carb' },
  { id: 'cereal', name: 'Corn flakes cereal', serving: '1 cup (28 g)', proteinG: 2, carbsG: 24, fatG: 0.3, kcal: 100, category: 'carb' },

  // --- More fruit & veg ---
  { id: 'orange', name: 'Orange', serving: '1 medium', proteinG: 1.2, carbsG: 15, fatG: 0.2, kcal: 62, category: 'fruit' },
  { id: 'strawberries', name: 'Strawberries', serving: '1 cup', proteinG: 1, carbsG: 12, fatG: 0.5, kcal: 49, category: 'fruit' },
  { id: 'blueberries', name: 'Blueberries', serving: '1 cup', proteinG: 1.1, carbsG: 21, fatG: 0.5, kcal: 84, category: 'fruit' },
  { id: 'grapes', name: 'Grapes', serving: '1 cup', proteinG: 1.1, carbsG: 27, fatG: 0.2, kcal: 104, category: 'fruit' },
  { id: 'pineapple', name: 'Pineapple', serving: '1 cup chunks', proteinG: 0.9, carbsG: 22, fatG: 0.2, kcal: 83, category: 'fruit' },
  { id: 'watermelon', name: 'Watermelon', serving: '1 cup diced', proteinG: 0.9, carbsG: 11.5, fatG: 0.2, kcal: 46, category: 'fruit' },
  { id: 'mango', name: 'Mango', serving: '1 cup sliced', proteinG: 1.4, carbsG: 25, fatG: 0.6, kcal: 99, category: 'fruit' },
  { id: 'spinach', name: 'Spinach', serving: '1 cup raw', proteinG: 0.9, carbsG: 1.1, fatG: 0.1, kcal: 7, category: 'veg' },
  { id: 'kale', name: 'Kale', serving: '1 cup chopped', proteinG: 2.9, carbsG: 6, fatG: 0.5, kcal: 33, category: 'veg' },
  { id: 'carrots', name: 'Carrots', serving: '1 cup chopped', proteinG: 1.2, carbsG: 12, fatG: 0.3, kcal: 52, category: 'veg' },
  { id: 'bell_pepper', name: 'Bell pepper', serving: '1 medium', proteinG: 1, carbsG: 7, fatG: 0.3, kcal: 31, category: 'veg' },
  { id: 'cucumber', name: 'Cucumber', serving: '1 cup sliced', proteinG: 0.8, carbsG: 4, fatG: 0.2, kcal: 16, category: 'veg' },
  { id: 'tomato', name: 'Tomato', serving: '1 medium', proteinG: 1.1, carbsG: 4.8, fatG: 0.2, kcal: 22, category: 'veg' },
  { id: 'green_beans', name: 'Green beans', serving: '1 cup cooked', proteinG: 2, carbsG: 10, fatG: 0.2, kcal: 44, category: 'veg' },
  { id: 'mushrooms', name: 'Mushrooms', serving: '1 cup sliced', proteinG: 2.2, carbsG: 2.3, fatG: 0.3, kcal: 15, category: 'veg' },
  { id: 'cauliflower', name: 'Cauliflower', serving: '1 cup chopped', proteinG: 2, carbsG: 5, fatG: 0.3, kcal: 27, category: 'veg' },
  { id: 'zucchini', name: 'Zucchini', serving: '1 cup sliced', proteinG: 1.5, carbsG: 3.9, fatG: 0.4, kcal: 20, category: 'veg' },
  { id: 'onion', name: 'Onion', serving: '1 medium', proteinG: 1.2, carbsG: 10, fatG: 0.1, kcal: 44, category: 'veg' },

  // --- More fats, nuts & seeds ---
  { id: 'walnuts', name: 'Walnuts', serving: '28 g (handful)', proteinG: 4.3, carbsG: 3.9, fatG: 18.5, kcal: 185, category: 'fat' },
  { id: 'cashews', name: 'Cashews', serving: '28 g (handful)', proteinG: 5.2, carbsG: 9, fatG: 12.3, kcal: 157, category: 'fat' },
  { id: 'chia_seeds', name: 'Chia seeds', serving: '1 tbsp (12 g)', proteinG: 2, carbsG: 5, fatG: 2.5, kcal: 58, category: 'fat' },
  { id: 'flaxseed', name: 'Flaxseed (ground)', serving: '1 tbsp (7 g)', proteinG: 1.3, carbsG: 2, fatG: 3, kcal: 37, category: 'fat' },
  { id: 'coconut_oil', name: 'Coconut oil', serving: '1 tbsp', proteinG: 0, carbsG: 0, fatG: 14, kcal: 121, category: 'fat' },
  { id: 'butter', name: 'Butter', serving: '1 tbsp', proteinG: 0.1, carbsG: 0, fatG: 11.5, kcal: 102, category: 'fat' },
  { id: 'pumpkin_seeds', name: 'Pumpkin seeds', serving: '28 g (handful)', proteinG: 9, carbsG: 5, fatG: 13, kcal: 158, category: 'fat' },
  { id: 'sunflower_seeds', name: 'Sunflower seeds', serving: '28 g (handful)', proteinG: 6, carbsG: 7, fatG: 14, kcal: 165, category: 'fat' },
  { id: 'hummus', name: 'Hummus', serving: '2 tbsp (30 g)', proteinG: 2, carbsG: 6, fatG: 5, kcal: 77, category: 'fat' },

  // --- More plant protein ---
  { id: 'black_beans', name: 'Black beans', serving: '1 cup cooked', proteinG: 15, carbsG: 41, fatG: 0.9, kcal: 227, category: 'protein' },
  { id: 'edamame', name: 'Edamame', serving: '1 cup cooked', proteinG: 17, carbsG: 14, fatG: 8, kcal: 189, category: 'protein' },

  // --- Common snacks & treats (in moderation) ---
  { id: 'protein_bar', name: 'Protein bar', serving: '1 bar (60 g)', proteinG: 20, carbsG: 22, fatG: 8, kcal: 220, category: 'snack' },
  { id: 'granola_bar', name: 'Granola bar', serving: '1 bar (28 g)', proteinG: 2.5, carbsG: 19, fatG: 4, kcal: 115, category: 'snack' },
  { id: 'dark_chocolate', name: 'Dark chocolate (70%)', serving: '30 g', proteinG: 2.2, carbsG: 13, fatG: 12, kcal: 170, category: 'snack' },
  { id: 'popcorn', name: 'Popcorn (air-popped)', serving: '3 cups', proteinG: 3, carbsG: 19, fatG: 1, kcal: 93, category: 'snack' },
  { id: 'rice_cakes', name: 'Rice cakes', serving: '2 cakes', proteinG: 1.5, carbsG: 15, fatG: 0.3, kcal: 70, category: 'snack' },
  { id: 'pretzels', name: 'Pretzels', serving: '1 oz (28 g)', proteinG: 3, carbsG: 23, fatG: 1, kcal: 108, category: 'snack' },

  // --- Indian staples ---
  { id: 'roti', name: 'Roti / chapati (plain wheat)', serving: '1 roti (~40 g)', proteinG: 3, carbsG: 18, fatG: 0.7, kcal: 90, category: 'carb' },
  { id: 'dal', name: 'Dal (cooked, mixed lentil)', serving: '1 cup', proteinG: 9, carbsG: 20, fatG: 4, kcal: 150, category: 'protein' },
  { id: 'curd', name: 'Curd / dahi (plain)', serving: '100 g', proteinG: 3.5, carbsG: 4.7, fatG: 3.3, kcal: 61, category: 'dairy' },
  { id: 'poha', name: 'Poha', serving: '1 cup cooked', proteinG: 4, carbsG: 40, fatG: 5, kcal: 220, category: 'carb' },
  { id: 'idli', name: 'Idli', serving: '2 pieces', proteinG: 4, carbsG: 28, fatG: 0.4, kcal: 140, category: 'carb' },
  { id: 'dosa', name: 'Dosa (plain)', serving: '1 medium', proteinG: 3.5, carbsG: 25, fatG: 3.5, kcal: 145, category: 'carb' },
  { id: 'sambar', name: 'Sambar', serving: '1 cup', proteinG: 6, carbsG: 18, fatG: 3, kcal: 123, category: 'protein' },
  { id: 'rajma', name: 'Rajma (kidney beans curry, cooked)', serving: '1 cup', proteinG: 9, carbsG: 30, fatG: 5, kcal: 205, category: 'protein' },
  { id: 'chana_masala', name: 'Chana masala (chickpea curry)', serving: '1 cup', proteinG: 10, carbsG: 32, fatG: 6, kcal: 230, category: 'protein' },
  { id: 'palak_paneer', name: 'Palak paneer', serving: '1 cup', proteinG: 12, carbsG: 10, fatG: 18, kcal: 250, category: 'protein' },
  { id: 'aloo_sabzi', name: 'Aloo sabzi (potato curry)', serving: '1 cup', proteinG: 3, carbsG: 25, fatG: 7, kcal: 175, category: 'carb' },
  { id: 'khichdi', name: 'Khichdi (rice-lentil)', serving: '1 cup cooked', proteinG: 8, carbsG: 35, fatG: 4, kcal: 210, category: 'carb' },
  { id: 'besan', name: 'Besan (chickpea flour)', serving: '¼ cup (30 g)', proteinG: 6.6, carbsG: 17.4, fatG: 2, kcal: 116, category: 'protein' },
  { id: 'ghee', name: 'Ghee (clarified butter)', serving: '1 tbsp (13 g)', proteinG: 0, carbsG: 0, fatG: 13, kcal: 117, category: 'fat' },
  { id: 'buttermilk', name: 'Buttermilk / chaas (spiced)', serving: '1 glass (250 ml)', proteinG: 3, carbsG: 5, fatG: 1.5, kcal: 45, category: 'dairy' },

  // --- Supplements ---
  { id: 'mass_gainer', name: 'Mass gainer', serving: '1 scoop (~150 g mix)', proteinG: 30, carbsG: 80, fatG: 6, kcal: 500, category: 'protein' },
  { id: 'creatine', name: 'Creatine monohydrate', serving: '1 scoop (5 g)', proteinG: 0, carbsG: 0, fatG: 0, kcal: 0, category: 'protein' },
];

export function getFood(id) {
  return FOODS.find((f) => f.id === id);
}
