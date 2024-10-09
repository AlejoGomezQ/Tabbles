"use client";

import React, { useState } from "react";
import { Ingredient } from "../models/ingredient";

export default function IngredientsForm() {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewIngredient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIngredients((prev) => [...prev, newIngredient]);
    setNewIngredient({
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
  };

  return (
    <>
      <section className="flex-grow overflow-y-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Agregar ingrediente</h2>
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
              value={newIngredient.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
              required
            />
          </div>
          <p className="text-sm text-gray-500">
            Llenar los campos según la cantidad en 100 g
          </p>
          <div className="grid grid-cols-9 gap-4">
            {Object.entries(newIngredient).map(
              ([key, value]) =>
                key !== "name" && (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00C0A3] hover:bg-[#93E9BE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE] transition ease-in"
            >
              Agregar ingrediente
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
