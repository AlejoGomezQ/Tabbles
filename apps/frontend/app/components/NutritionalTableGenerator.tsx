"use client";

import React, { useState } from "react";
import NutritionalTableForm from "../components/NutritionalTableForm";
import NutritionalTable from "../components/NutritionalTable";
import { Food } from "../models/food";
import { useAuth } from "../context/AuthContext";
import { RawMaterial } from "../models/rawMaterial";

interface NutritionalData {
  [key: string]: {
    per100g: number;
    perServing: number;
  };
}

export default function NutritionalTableGenerator() {
  const [nutritionalData, setNutritionalData] =
    useState<NutritionalData | null>(null);
  const [servingSize, setServingSize] = useState<number>(0);
  const [servingsPerContainer, setServingsPerContainer] = useState<number>(0);
  const [format, setFormat] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getRawMaterialById } = useAuth();

  const handleFormSubmit = async (data: {
    food: Food;
    servingSize: number;
    servingsPerContainer: number;
    format: string;
  }) => {
    const { food, servingSize, servingsPerContainer, format } = data;
    setIsLoading(true);
    setError(null);

    try {
      const rawMaterials: RawMaterial[] = await Promise.all(
        food.ingredients.map(async (ingredient) => {
          const rawMaterial = await getRawMaterialById(ingredient._id);
          return { ...rawMaterial, amount: ingredient.amount };
        })
      );

      const calculatedData: NutritionalData = {};

      rawMaterials.forEach((rawMaterial) => {
        Object.entries(rawMaterial).forEach(([key, value]) => {
          if (
            typeof value === "number" &&
            key !== "id" &&
            key !== "_id" &&
            key !== "amount"
          ) {
            if (!calculatedData[key]) {
              calculatedData[key] = { per100g: 0, perServing: 0 };
            }
            if (typeof rawMaterial.amount === "number") {
              calculatedData[key].per100g += (value * rawMaterial.amount) / 100;
            }
            if (typeof rawMaterial.amount === "number") {
              calculatedData[key].perServing +=
                (value * rawMaterial.amount * servingSize) / 10000;
            }
          }
        });
      });

      const filteredData: NutritionalData = Object.fromEntries(
        Object.entries(calculatedData).filter(
          ([, value]) => value.per100g > 0 || value.perServing > 0
        )
      );

      setNutritionalData(filteredData);
      setServingSize(servingSize);
      setServingsPerContainer(servingsPerContainer);
      setFormat(format);
    } catch (err) {
      setError("Error fetching raw material data. Please try again.");
      console.error("Error fetching raw material data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col lg:flex-row overflow-x-clip overflow-y-auto">
      <NutritionalTableForm onSubmit={handleFormSubmit} />
      {isLoading && (
        <div className="text-center">Loading nutritional data...</div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!isLoading && !error && nutritionalData && (
        <NutritionalTable
          data={nutritionalData}
          servingSize={servingSize}
          servingsPerContainer={servingsPerContainer}
          format={format}
        />
      )}
    </section>
  );
}
