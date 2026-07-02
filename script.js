(function () {
  "use strict";
  const STORAGE_KEY = "jacobs-nutrition-tracker:v1";
  const database = window.NutritionDatabase;
  const state = { foods: Object.fromEntries(Object.keys(database.foods).map((foodKey) => [foodKey, 0])), additives: Object.fromEntries(Object.keys(database.additives).map((additiveKey) => [additiveKey, 0])) };
  const elements = { calories: document.querySelector("#summary-calories"), protein: document.querySelector("#summary-protein"), nutritionBody: document.querySelector("#nutrition-body"), resetButton: document.querySelector("#reset-button"), inputs: Array.from(document.querySelectorAll("input")) };

  function emptyTotals() { return Object.fromEntries(database.nutrients.map((nutrient) => [nutrient.key, 0])); }
  function normaliseNumber(value) { const numericValue = Number.parseFloat(value); return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 0; }
  function calculateFoodContribution(foodKey, grams) { const food = database.foods[foodKey]; const multiplier = grams / 100; return Object.fromEntries(database.nutrients.map((nutrient) => [nutrient.key, (food.nutrientsPer100g[nutrient.key] || 0) * multiplier])); }
  function calculateAdditiveContribution(additiveKey, amount) { const additive = database.additives[additiveKey]; return Object.fromEntries(database.nutrients.map((nutrient) => [nutrient.key, (additive.nutrientsPerUnit[nutrient.key] || 0) * amount])); }
  function addContribution(totals, contribution) { database.nutrients.forEach((nutrient) => { totals[nutrient.key] += contribution[nutrient.key] || 0; }); }
  function calculateTotals(currentState) { const totals = emptyTotals(); Object.entries(currentState.foods).forEach(([foodKey, grams]) => addContribution(totals, calculateFoodContribution(foodKey, grams))); Object.entries(currentState.additives).forEach(([additiveKey, amount]) => addContribution(totals, calculateAdditiveContribution(additiveKey, amount))); return totals; }
  function formatNutrientValue(value, nutrient) { const rounded = value.toFixed(nutrient.decimals); const cleanValue = nutrient.decimals === 0 ? rounded : rounded.replace(/\.0$/, ""); return cleanValue + " " + nutrient.unit; }
  function renderTable(totals) { elements.nutritionBody.innerHTML = database.nutrients.map((nutrient) => { const value = formatNutrientValue(totals[nutrient.key], nutrient); return "<tr><td>" + nutrient.label + "</td><td>" + value + "</td></tr>"; }).join(""); }
  function render() { const totals = calculateTotals(state); const caloriesMeta = database.nutrients.find((nutrient) => nutrient.key === "calories"); const proteinMeta = database.nutrients.find((nutrient) => nutrient.key === "protein"); elements.calories.textContent = formatNutrientValue(totals.calories, caloriesMeta); elements.protein.textContent = formatNutrientValue(totals.protein, proteinMeta); renderTable(totals); }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function syncInputsFromState() { elements.inputs.forEach((input) => { const category = input.id.startsWith("food-") ? "foods" : "additives"; input.value = state[category][input.name] || 0; }); }
  function restoreState() { try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (!saved) return; Object.keys(state.foods).forEach((foodKey) => { state.foods[foodKey] = normaliseNumber(saved.foods?.[foodKey]); }); Object.keys(state.additives).forEach((additiveKey) => { state.additives[additiveKey] = normaliseNumber(saved.additives?.[additiveKey]); }); } catch (error) { localStorage.removeItem(STORAGE_KEY); } }
  function handleInput(event) { const input = event.currentTarget; const category = input.id.startsWith("food-") ? "foods" : "additives"; state[category][input.name] = normaliseNumber(input.value); saveState(); render(); }
  function reset() { Object.keys(state.foods).forEach((foodKey) => { state.foods[foodKey] = 0; }); Object.keys(state.additives).forEach((additiveKey) => { state.additives[additiveKey] = 0; }); localStorage.removeItem(STORAGE_KEY); syncInputsFromState(); render(); }
  function registerServiceWorker() { if ("serviceWorker" in navigator) { window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js")); } }
  function init() { restoreState(); syncInputsFromState(); elements.inputs.forEach((input) => input.addEventListener("input", handleInput)); elements.resetButton.addEventListener("click", reset); render(); registerServiceWorker(); }
  init();
})();
