"use client";

import React, { useState } from "react";
import { RawMaterial } from "../models/rawMaterial";
import { useAuth } from "../context/AuthContext";
import { spanishLabels } from "../utils/spanishLabels";

export default function RawMaterialsForm() {
  const [newRawMaterial, setNewRawMaterial] = useState<RawMaterial>({
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
  const [error, setError] = useState<string | undefined>(undefined);
  const { addRawMaterial } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRawMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    try {
      const rawMaterial = {
        name: newRawMaterial.name,
        calories: newRawMaterial.calories,
        protein: newRawMaterial.protein,
        totalFat: newRawMaterial.totalFat,
        carbohydrates: newRawMaterial.carbohydrates,
        saturatedFat: newRawMaterial.saturatedFat,
        transFat: newRawMaterial.transFat,
        cholesterol: newRawMaterial.cholesterol,
        sodium: newRawMaterial.sodium,
        dietaryFiber: newRawMaterial.dietaryFiber,
        sugar: newRawMaterial.sugar,
        addedSugar: newRawMaterial.addedSugar,
        vitaminA: newRawMaterial.vitaminA,
        vitaminC: newRawMaterial.vitaminC,
        vitaminD: newRawMaterial.vitaminD,
        iron: newRawMaterial.iron,
        calcium: newRawMaterial.calcium,
        zinc: newRawMaterial.zinc,
        water: newRawMaterial.water,
      };

      await addRawMaterial(rawMaterial);
      setRawMaterials((prev) => [...prev, newRawMaterial]);
      setNewRawMaterial({
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
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al agregar el RawMateriale"
      );
    }
  };

  return (
    <>
      <section className="overflow-y-auto p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Agregar materia prima</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newRawMaterial.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
              required
            />
          </div>
          <p className="text-sm text-gray-500">
            Llenar los campos según la cantidad en 100 g
          </p>
          <div className="grid grid-rows-2 grid-cols-9 gap-4">
            {Object.entries(newRawMaterial).map(
              ([key, value]) =>
                key !== "name" && (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 "
                    >
                      {spanishLabels[key]}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
                    />
                  </div>
                )
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00C0A3] hover:bg-[#93E9BE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE]"
            >
              Agregar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
