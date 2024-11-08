/**
 * Interfaz que representa una tabla nutricional en el sistema.
 *
 * @interface NutritionalTable
 * @property {string} servingSize - Tamaño de la porción, especificado en unidades adecuadas (por ejemplo, gramos o mililitros).
 * @property {number} servingsPerContainer - Número de porciones por envase.
 * @property {NutritionalInfoAmount} calories - Cantidad de calorías por porción.
 * @property {NutritionalInfoAmount} totalFat - Cantidad de grasa total por porción.
 * @property {NutritionalInfoAmount} saturatedFat - Cantidad de grasa saturada por porción.
 * @property {NutritionalInfoAmount} transFat - Cantidad de grasa trans por porción.
 * @property {NutritionalInfoAmount} totalCarbs - Cantidad total de carbohidratos por porción.
 * @property {NutritionalInfoAmount} dietaryFiber - Cantidad de fibra dietética por porción.
 * @property {NutritionalInfoAmount} totalSugars - Cantidad total de azúcares por porción.
 * @property {NutritionalInfoAmount} addedSugars - Cantidad de azúcares añadidos por porción.
 * @property {NutritionalInfoAmount} protein - Cantidad de proteínas por porción.
 * @property {NutritionalInfoAmount} sodium - Cantidad de sodio por porción.
 * @property {NutritionalInfoAmount} vitaminA - Cantidad de vitamina A por porción.
 * @property {NutritionalInfoAmount} vitaminD - Cantidad de vitamina D por porción.
 * @property {NutritionalInfoAmount} calcium - Cantidad de calcio por porción.
 * @property {NutritionalInfoAmount} iron - Cantidad de hierro por porción.
 * @property {NutritionalInfoAmount} zinc - Cantidad de zinc por porción.
 */

export interface NutritionalTable {
  servingSize: string;
  servingsPerContainer: number;
  calories: NutritionalInfoAmount;
  totalFat: NutritionalInfoAmount;
  saturatedFat: NutritionalInfoAmount;
  transFat: NutritionalInfoAmount;
  totalCarbs: NutritionalInfoAmount;
  dietaryFiber: NutritionalInfoAmount;
  totalSugars: NutritionalInfoAmount;
  addedSugars: NutritionalInfoAmount;
  protein: NutritionalInfoAmount;
  sodium: NutritionalInfoAmount;
  vitaminA: NutritionalInfoAmount;
  vitaminD: NutritionalInfoAmount;
  calcium: NutritionalInfoAmount;
  iron: NutritionalInfoAmount;
  zinc: NutritionalInfoAmount;
}

/**
 * Interfaz que representa la cantidad de un nutriente en diferentes unidades de medida.
 *
 * @interface NutritionalInfoAmount
 * @property {number} per100g - Cantidad del nutriente por cada 100 gramos.
 * @property {number} perServing - Cantidad del nutriente por porción.
 */
interface NutritionalInfoAmount {
  per100g: number;
  perServing: number;
}
