import { Ingredient } from "./ingredient";

/**
 * Interfaz que representa un alimento compuesto por varios ingredientes.
 *
 * @interface Food
 * @property {string} [id] - Identificador único opcional del alimento.
 * @property {string} name - Nombre del alimento.
 * @property {Ingredient[]} ingredients - Lista de ingredientes que componen el alimento.
 */
export interface Food {
  id?: string;
  name: string;
  ingredients: Ingredient[];
}
