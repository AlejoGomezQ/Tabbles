import { RawMaterial } from "./rawMaterial";

/**
 * Interfaz que representa un ingrediente utilizado en una receta o producto.
 *
 * @interface Ingredient
 * @property {RawMaterial} rawMaterial - La materia prima asociada al ingrediente.
 * @property {number} amount - Cantidad del ingrediente, especificada en la unidad adecuada (por ejemplo, gramos).
 */
export interface Ingredient {
  rawMaterial: RawMaterial;
  amount: number;
}
