"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import Select, { ActionMeta, GroupBase, SingleValue } from "react-select";
import { Food } from "../models/food";

interface FormatOption {
  value: string;
  label: string;
}

interface ServingData {
  servingSize: string;
  servingsPerContainer: string;
  servingSizeError: string;
  servingsPerContainerError: string;
}

export default function NutritionalTableForm() {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption | null>(
    null
  );
  const [foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [servingData, setServingData] = useState<ServingData>({
    servingSize: "",
    servingsPerContainer: "",
    servingSizeError: "",
    servingsPerContainerError: "",
  });

  const { getAllFoods } = useAuth();

  const formatOptions: FormatOption[] = [
    { value: "spanish", label: "Español" },
    { value: "english", label: "Inglés" },
    { value: "both", label: "Español/Inglés" },
  ];

  const fetchFoods = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllFoods();
      setFoods(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch raw materials"
      );
    } finally {
      setIsLoading(false);
    }
  }, [getAllFoods]);

  useEffect(() => {
    fetchFoods();
  }, [getAllFoods]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleFoodChange = (selectedOption: Food | null) => {
    setSelectedFood(selectedOption);
  };

  const handleFormatChange = (newValue: SingleValue<FormatOption>) => {
    setSelectedFormat(newValue);
  };

  const handleServingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    if (value && !/^\d*\.?\d*$/.test(value)) {
      error = "Por favor ingrese un número válido";
    } else if (parseFloat(value) <= 0) {
      error = "El valor debe ser mayor que 0";
    }

    setServingData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Error`]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!selectedFood || !selectedFormat) {
      setError("Por favor, seleccione un alimento y un formato");
      return;
    }
    try {
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al generar la tabla nutricional"
      );
    }
  };

  const foodOptions = foods.map((food) => ({
    ...food,
    label: food.name,
  }));

  return (
    <section className="sticky top-0 lg:w-1/2 p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Generar tabla nutricional</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-2">
          <label
            htmlFor="food"
            className="block text-sm font-medium text-gray-700"
          >
            Seleccionar alimento
          </label>
          <Select
            id="food"
            name="food"
            isMulti={false}
            options={foodOptions as unknown as (Food | GroupBase<Food>)[]}
            onChange={handleFoodChange}
            value={selectedFood}
            className="mt-1 block w-full"
            classNamePrefix="select"
            placeholder="Buscar alimento..."
            defaultValue={selectedFood}
          />
          <label
            htmlFor="servingSize"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tamaño de la porción
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            id="servingSize"
            name="servingSize"
            value={servingData.servingSize}
            onChange={handleServingChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
          />
          {servingData.servingSizeError && (
            <p className="mt-1 text-sm text-red-600">
              {servingData.servingSizeError}
            </p>
          )}
          <label
            htmlFor="servingsPerContainer"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Porciones por envase
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            id="servingsPerContainer"
            name="servingsPerContainer"
            value={servingData.servingsPerContainer}
            onChange={handleServingChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
          />
          {servingData.servingsPerContainerError && (
            <p className="mt-1 text-sm text-red-600">
              {servingData.servingsPerContainerError}
            </p>
          )}
          <label
            htmlFor="format"
            className="block text-sm font-medium text-gray-700"
          >
            Formato de la tabla nutricional
          </label>
          <Select
            id="format"
            options={formatOptions}
            onChange={handleFormatChange}
            value={selectedFormat}
            className="mt-1 block w-full"
            classNamePrefix="select"
            placeholder="Seleccione un formato"
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00C0A3] hover:bg-[#93E9BE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE]"
          >
            Generar tabla nutricional
          </button>
        </div>
      </form>
    </section>
  );
}
