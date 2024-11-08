/**
 * Interfaz que representa una materia prima en el sistema.
 *
 * @interface RawMaterial
 * @property {string} [id] - Identificador único opcional de la materia prima.
 * @property {string} name - Nombre de la materia prima.
 * @property {number | undefined} calories - Cantidad de calorías por unidad.
 * @property {number | undefined} proteins - Cantidad de proteínas por unidad.
 * @property {number | undefined} totalFats - Cantidad total de grasas por unidad.
 * @property {number | undefined} carbohydrates - Cantidad de carbohidratos por unidad.
 * @property {number | undefined} saturatedFats - Cantidad de grasas saturadas por unidad.
 * @property {number | undefined} transFats - Cantidad de grasas trans por unidad.
 * @property {number | undefined} cholesterol - Cantidad de colesterol por unidad.
 * @property {number | undefined} sodium - Cantidad de sodio por unidad.
 * @property {number | undefined} dietaryFiber - Cantidad de fibra dietética por unidad.
 * @property {number | undefined} sugar - Cantidad de azúcar por unidad.
 * @property {number | undefined} addedSugar - Cantidad de azúcar añadida por unidad.
 * @property {number | undefined} vitaminA - Cantidad de vitamina A por unidad.
 * @property {number | undefined} vitaminC - Cantidad de vitamina C por unidad.
 * @property {number | undefined} vitaminD - Cantidad de vitamina D por unidad.
 * @property {number | undefined} iron - Cantidad de hierro por unidad.
 * @property {number | undefined} calcium - Cantidad de calcio por unidad.
 * @property {number | undefined} zinc - Cantidad de zinc por unidad.
 * @property {number | undefined} water - Cantidad de agua por unidad.
 */
export interface RawMaterial {
  id?: string;
  name: string;
  calories: number | undefined;
  proteins: number | undefined;
  totalFats: number | undefined;
  carbohydrates: number | undefined;
  saturatedFats: number | undefined;
  transFats: number | undefined;
  cholesterol: number | undefined;
  sodium: number | undefined;
  dietaryFiber: number | undefined;
  sugar: number | undefined;
  addedSugar: number | undefined;
  vitaminA: number | undefined;
  vitaminC: number | undefined;
  vitaminD: number | undefined;
  iron: number | undefined;
  calcium: number | undefined;
  zinc: number | undefined;
  water: number | undefined;
}
