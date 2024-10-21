"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Select from "react-select";

interface Food {
  id: string;
  name: string;
}

interface FormatOption {
  value: string;
  label: string;
}

export default function NutritionalTableForm() {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FormatOption | null>(
    null
  );
  const [foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const formatOptions: FormatOption[] = [
    { value: "spanish", label: "Español" },
    { value: "english", label: "Inglés" },
    { value: "both", label: "Español/Inglés" },
  ];

  /*   useEffect(() => {
    const fetchFoods = async () => {
      try {
        const fetchedFoods = await getAllFoods();
        setFoods(fetchedFoods);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error al obtener los alimentos"
        );
      }
    };
    fetchFoods();
  }, []); */

  const handleFoodChange = (selectedOption: any) => {
    setSelectedFood(selectedOption);
  };

  const handleFormatChange = (selectedOption: any) => {
    setSelectedFormat(selectedOption);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
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
            onChange={handleFoodChange}
            value={selectedFood}
            className="mt-1 block w-full"
            classNamePrefix="select"
            placeholder="Buscar alimento..."
          />
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
