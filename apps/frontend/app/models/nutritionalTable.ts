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

interface NutritionalInfoAmount {
  per100g: number;
  perServing: number;
}
