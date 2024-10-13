import { RawMaterial } from "./rawMaterial";

export interface Food{
    name: string;
    ingredients: RawMaterial[];
    portion: number |undefined;
}