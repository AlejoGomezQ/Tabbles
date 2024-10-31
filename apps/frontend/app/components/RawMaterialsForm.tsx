"use client";

import React, { useState } from "react";
import { RawMaterial } from "../models/rawMaterial";
import { useAuth } from "../context/AuthContext";
import { spanishLabels } from "../utils/spanishLabels";
import { rawMaterial } from "../const/rawMaterial";


interface params{
  DefaultRawMaterial : RawMaterial,
  FormName: string,
  OnSubmit : string
};
export default function RawMaterialsForm({DefaultRawMaterial,FormName,OnSubmit}: params) {
  const [newRawMaterial, setNewRawMaterial] = useState<RawMaterial>({
    id : DefaultRawMaterial.id,
    name :DefaultRawMaterial.name,
    calories : DefaultRawMaterial.calories,
    proteins : DefaultRawMaterial.proteins,
    totalFats: DefaultRawMaterial.totalFats,
    carbohydrates: DefaultRawMaterial.carbohydrates,
    saturatedFats: DefaultRawMaterial.saturatedFats,
    transFats: DefaultRawMaterial.transFats,
    cholesterol: DefaultRawMaterial.cholesterol,
    sodium: DefaultRawMaterial.sodium,
    dietaryFiber: DefaultRawMaterial.dietaryFiber,
    sugar: DefaultRawMaterial.sugar,
    addedSugar: DefaultRawMaterial.addedSugar,
    vitaminA: DefaultRawMaterial.vitaminA,
    vitaminC: DefaultRawMaterial.vitaminC,
    vitaminD: DefaultRawMaterial.vitaminD,
    iron: DefaultRawMaterial.iron,
    calcium: DefaultRawMaterial.calcium,
    zinc: DefaultRawMaterial.zinc,
    water: DefaultRawMaterial.water});
  const [RawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const { addRawMaterial } = useAuth();
  const {updateRawMaterial} = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRawMaterial((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    try {
      // guarda los valores agregados en un objeto llamado rawMaterialPayload
      const rawMaterialPayload = Object.entries(newRawMaterial).reduce(
        (acc, [key, value]) => {
          // Solo agrega la clave si `value` no es una cadena vacía ni undefined
          if (value !== "" && value !== undefined && value !== null) {
            return {
              ...acc,
              [key]: (key === "name" || key === "id") ? value : parseFloat(value as string),
            };
          }
          return acc; // Si `value` es vacío o undefined, no se agrega al objeto
        },
        {} as RawMaterial // Usa `Partial` para permitir propiedades opcionales
      );
      if(OnSubmit === "create"){
        await addRawMaterial(rawMaterialPayload);
        alert("Materia prima creada con éxito");
      }else if(OnSubmit === "update"){
        await updateRawMaterial(rawMaterialPayload);
        alert("Materia prima modificada con éxito");
        
      }
      setRawMaterials((prev) => [...prev, rawMaterialPayload]);
      
      // Reset form with empty strings instead of undefined
      setNewRawMaterial(DefaultRawMaterial);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al agregar el RawMateriale"
      );
    }
  };

  return (
    <section className="overflow-y-auto p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">{FormName}</h2>
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
        <div className="grid grid-rows-2 grid-cols-6 gap-4">
          {Object.entries(newRawMaterial).map(
            ([key, value]) =>
              (key !== "name" && key !== "id" )&& (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700"
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
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00C0A3] hover:bg-[#93E9BE] hover:text-[#195e4b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE]"
          >
            Agregar
          </button>
        </div>
      </form>
    </section>
  );
}
