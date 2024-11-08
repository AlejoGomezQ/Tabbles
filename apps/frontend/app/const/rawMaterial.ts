/**
 * Representa la información nutricional de una materia prima.
 *
 * @typedef {Object} RawMaterial
 * @property {string} name - El nombre de la materia prima.
 * @property {number|undefined} calories - La cantidad de calorías (en kcal).
 * @property {number|undefined} proteins - La cantidad de proteínas (en gramos).
 * @property {number|undefined} totalFats - La cantidad total de grasas (en gramos).
 * @property {number|undefined} calories - La cantidad de carbohidratos (en gramos).
 * @property {number|undefined} saturatedFats - La cantidad de grasas saturadas (en gramos).
 * @property {number|undefined} transFats - La cantidad de grasas trans (en gramos).
 * @property {number|undefined} cholesterol - La cantidad de colesterol (en miligramos).
 * @property {number|undefined} sodio: la cantidad de sodio (en miligramos).
 * @property {number|undefined} fibra dietética: la cantidad de fibra dietética (en gramos).
 * @property {number|undefined} azúcar: la cantidad total de azúcar (en gramos).
 * @property {number|undefined} azúcar añadido: la cantidad de azúcar añadido (en gramos).
 * @property {number|undefined} vitamina A: la cantidad de vitamina A (en microgramos).
 * @property {number|undefined} vitamina C: la cantidad de vitamina C (en miligramos).
 * @property {number|undefined} vitamina D: la cantidad de vitamina D (en microgramos).
 * @property {number|undefined} hierro: la cantidad de hierro (en miligramos).
 * @property {number|undefined} calcio: la cantidad de calcio (en miligramos).
 * @property {number|undefined} zinc: la cantidad de zinc (en miligramos).
 * @property {number|undefined} agua: el contenido de agua (en gramos).
 */
export const rawMaterial = {
  name: "",
  calories: undefined,
  proteins: undefined,
  totalFats: undefined,
  carbohydrates: undefined,
  saturatedFats: undefined,
  transFats: undefined,
  cholesterol: undefined,
  sodium: undefined,
  dietaryFiber: undefined,
  sugar: undefined,
  addedSugar: undefined,
  vitaminA: undefined,
  vitaminC: undefined,
  vitaminD: undefined,
  iron: undefined,
  calcium: undefined,
  zinc: undefined,
  water: undefined,
};
