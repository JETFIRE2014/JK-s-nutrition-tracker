(function () {
  "use strict";

  const NUTRIENTS = [
    { key: "calories", label: "Calories", unit: "kcal", decimals: 0 },
    { key: "protein", label: "Protein", unit: "g", decimals: 1 },
    { key: "carbohydrates", label: "Carbohydrates", unit: "g", decimals: 1 },
    { key: "fat", label: "Fat", unit: "g", decimals: 1 },
    { key: "saturatedFat", label: "Saturated Fat", unit: "g", decimals: 1 },
    { key: "fibre", label: "Fibre", unit: "g", decimals: 1 },
    { key: "sugar", label: "Sugar", unit: "g", decimals: 1 },
    { key: "sodium", label: "Sodium", unit: "mg", decimals: 0 },
    { key: "potassium", label: "Potassium", unit: "mg", decimals: 0 },
    { key: "calcium", label: "Calcium", unit: "mg", decimals: 0 },
    { key: "iron", label: "Iron", unit: "mg", decimals: 1 },
    { key: "magnesium", label: "Magnesium", unit: "mg", decimals: 0 },
    { key: "phosphorus", label: "Phosphorus", unit: "mg", decimals: 0 },
    { key: "zinc", label: "Zinc", unit: "mg", decimals: 1 },
    { key: "vitaminA", label: "Vitamin A", unit: "µg", decimals: 0 },
    { key: "vitaminC", label: "Vitamin C", unit: "mg", decimals: 1 }
  ];

  const FOODS = {
    chickenBreast: { label: "Cooked Chicken Breast", servingUnit: "g", nutrientsPer100g: { calories: 165, protein: 31.0, carbohydrates: 0, fat: 3.6, saturatedFat: 1.0, fibre: 0, sugar: 0, sodium: 74, potassium: 256, calcium: 15, iron: 1.0, magnesium: 29, phosphorus: 228, zinc: 1.0, vitaminA: 7, vitaminC: 0 } },
    broccoli: { label: "Cooked Broccoli", servingUnit: "g", nutrientsPer100g: { calories: 35, protein: 2.4, carbohydrates: 7.2, fat: 0.4, saturatedFat: 0.1, fibre: 3.3, sugar: 1.4, sodium: 41, potassium: 293, calcium: 40, iron: 0.7, magnesium: 21, phosphorus: 67, zinc: 0.5, vitaminA: 31, vitaminC: 64.9 } },
    sweetPotato: { label: "Cooked Sweet Potato", servingUnit: "g", nutrientsPer100g: { calories: 90, protein: 2.0, carbohydrates: 20.7, fat: 0.2, saturatedFat: 0, fibre: 3.3, sugar: 6.5, sodium: 36, potassium: 475, calcium: 38, iron: 0.7, magnesium: 27, phosphorus: 54, zinc: 0.3, vitaminA: 961, vitaminC: 19.6 } }
  };

  const ADDITIVES = {
    oilSpray: { label: "Oil Spray", inputUnit: "sprays", nutrientsPerUnit: { calories: 1 } },
    salt: { label: "Salt", inputUnit: "g", nutrientsPerUnit: { sodium: 393 } }
  };

  window.NutritionDatabase = { nutrients: NUTRIENTS, foods: FOODS, additives: ADDITIVES };
})();
