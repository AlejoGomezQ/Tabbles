import { Ingredient } from "./ingredient";

export interface Food{
    name: string;
    ingredients: Ingredient[];
    portion: number |undefined;
}