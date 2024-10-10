"use client";

import React, { useState } from "react";
import { RawMaterial } from "../models/rawMaterial";
import { spanishLabels } from "../utils/spanishLabels";

export default function RawMaterialsTable() {
  const [newIngredient, setNewIngredient] = useState<RawMaterial>({
    name: "",
    calories: undefined,
    protein: undefined,
    totalFat: undefined,
    carbohydrates: undefined,
    saturatedFat: undefined,
    transFat: undefined,
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
  });

  const [RawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);

  return (
    <section className="p-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Tabla de materia primas</h2>
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
                    {spanishLabels[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {RawMaterials.map((ingredient, index) => (
                <tr key={index}>
                  {Object.entries(ingredient).map(([key, value]) => (
                    <td
                      key={key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {value as React.ReactNode}
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
