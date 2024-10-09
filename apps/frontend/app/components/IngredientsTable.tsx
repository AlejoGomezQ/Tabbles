"use client";

import React, { useState } from "react";
import { Ingredient } from "../models/ingredient";

export default function IngredientsTable() {
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    name: "",
    calories: "",
    protein: "",
    totalFat: "",
    carbohydrates: "",
    saturatedFat: "",
    transFat: "",
    cholesterol: "",
    sodium: "",
    dietaryFiber: "",
    sugar: "",
    addedSugar: "",
    vitaminA: "",
    vitaminC: "",
    vitaminD: "",
    iron: "",
    calcium: "",
    zinc: "",
    water: "",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  return (
    <section className="p-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Tabla de Ingredientes</h2>
      <div className="overflow-x-auto">
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {Object.keys(newIngredient).map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  {Object.values(ingredient).map((value, i) => (
                    <td
                      key={i}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
