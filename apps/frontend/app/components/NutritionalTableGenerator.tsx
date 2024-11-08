"use client";

import React, { useState } from "react";
import NutritionalTableForm from "../components/NutritionalTableForm";
import NutritionalTable from "../components/NutritionalTable";
import { Food } from "../models/food";
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
      const calculatedData: NutritionalData = {};
      const totalWeight = food.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.amount,
        0
      );
      const totalFreeWater = food.ingredients.reduce(
        (sum, ingredient) =>
          sum + (ingredient.rawMaterial.water ?? 0) * ingredient.amount,
        0
      );

      food.ingredients.forEach((ingredient) => {
        const rawMaterial = ingredient.rawMaterial as RawMaterial;
        const amount = ingredient.amount;
        const ratio = amount / totalWeight;
        const NutrientInDry =
          ((rawMaterial.water ?? 0) * amount) / totalFreeWater + 1;

        Object.entries(rawMaterial).forEach(([key, value]) => {
          if (typeof value === "number" && key !== "id" && key !== "_id") {
            if (!calculatedData[key]) {
              calculatedData[key] = { per100g: 0, perServing: 0 };
            }
            calculatedData[key].per100g += value * ratio * NutrientInDry;
            calculatedData[key].perServing +=
              (value * ratio * NutrientInDry * servingSize) / 100;
          }
        });
      });

      Object.keys(calculatedData).forEach((key) => {
        if (key == "calories") {
          if (calculatedData[key]) {
            calculatedData[key].per100g =
              9 * (calculatedData.totalFats?.per100g ?? 0) +
              4 * (calculatedData.proteins?.per100g ?? 0) +
              4 * (calculatedData.carbohydrates?.per100g ?? 0) -
              2 * (calculatedData.dietaryFiber?.per100g ?? 0);
            calculatedData[key].perServing =
              9 * (calculatedData.totalFats?.perServing ?? 0) +
              4 * (calculatedData.proteins?.perServing ?? 0) +
              4 * (calculatedData.carbohydrates?.perServing ?? 0) -
              2 * (calculatedData.dietaryFiber?.perServing ?? 0);
          }
        }
        if (calculatedData[key]) {
          calculatedData[key].per100g = Number(
            calculatedData[key].per100g.toFixed(2)
          );
          calculatedData[key].perServing = Number(
            calculatedData[key].perServing.toFixed(2)
          );
        }
      });

      setNutritionalData(calculatedData);
      setServingSize(servingSize);
      setServingsPerContainer(servingsPerContainer);
      setFormat(format);
    } catch (err) {
      setError("Error calculating nutritional data. Please try again.");
      console.error("Error calculating nutritional data:", err);
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
