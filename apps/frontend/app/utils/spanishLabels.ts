/**
 * Objeto que contiene las etiquetas en español para los nutrientes y propiedades de los alimentos.
 * Cada clave representa un nombre en inglés de un nutriente o propiedad, y su valor es la etiqueta en español correspondiente.
 * Este objeto se utiliza para internacionalizar las etiquetas en formularios o tablas nutricionales.
 *
 * @typedef {Object} SpanishLabels
 * @property {string} name - Etiqueta para "Nombre".
 * @property {string} calories - Etiqueta para "Calorías (Kcal)".
 * @property {string} proteins - Etiqueta para "Proteínas (g)".
 * @property {string} totalFats - Etiqueta para "Grasa Total (g)".
 * @property {string} carbohydrates - Etiqueta para "Carbohidratos (g)".
 * @property {string} saturatedFats - Etiqueta para "Grasa Saturada (g)".
 * @property {string} transFats - Etiqueta para "Grasa Trans (mg)".
 * @property {string} cholesterol - Etiqueta para "Colesterol (mg)".
 * @property {string} sodium - Etiqueta para "Sodio (mg)".
 * @property {string} dietaryFiber - Etiqueta para "Fibra Dietaria (g)".
 * @property {string} sugar - Etiqueta para "Azúcar (g)".
 * @property {string} addedSugar - Etiqueta para "Azúcar Añadida (g)".
 * @property {string} vitaminA - Etiqueta para "Vitamina A (µg de ER)".
 * @property {string} vitaminC - Etiqueta para "Vitamina C (mg)".
 * @property {string} vitaminD - Etiqueta para "Vitamina D (mg o UI)".
 * @property {string} iron - Etiqueta para "Hierro (mg)".
 * @property {string} calcium - Etiqueta para "Calcio (mg)".
 * @property {string} zinc - Etiqueta para "Zinc (mg)".
 * @property {string} water - Etiqueta para "Agua (%)".
 *
 * @type {SpanishLabels}
 */
export const spanishLabels: { [key: string]: string } = {
  name: "Nombre",
  calories: "Calorías (Kcal)",
  proteins: "Proteínas (g)",
  totalFats: "Grasa Total (g)",
  carbohydrates: "Carbohidratos (g)",
  saturatedFats: "Grasa Saturada (g)",
  transFats: "Grasa Trans (mg)",
  cholesterol: "Colesterol (mg)",
  sodium: "Sodio (mg)",
  dietaryFiber: "Fibra Dietaria (g)",
  sugar: "Azúcar (g)",
  addedSugar: "Azúcar Añadida (g)",
  vitaminA: "Vitamina A (µg de ER)",
  vitaminC: "Vitamina C (mg)",
  vitaminD: "Vitamina D (mg o UI)",
  iron: "Hierro (mg)",
  calcium: "Calcio (mg)",
  zinc: "Zinc (mg)",
  water: "Agua (%)",
};
