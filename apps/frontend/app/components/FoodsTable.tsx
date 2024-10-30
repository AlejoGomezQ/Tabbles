"use client";

import PopUp from "./PopUp";
import React, { useCallback, useEffect, useState } from "react";
import { Food } from "../models/food";
import { useAuth } from "../context/AuthContext";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";
import FoodsForm from "./FoodsForm";

export default function FoodsTable() {
  const [Foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllFoods } = useAuth();

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

  const renderValue = (value: any) => {
    if (value === undefined || value === null) {
      return "0";
    }
    if (typeof value === "number") {
      return value.toFixed(2);
    }
    return value.toString();
  };

  return (
    <section className="lg:w-1/2 p-8 border-t rounded-bl-xl">
      <h2 className="text-2xl font-bold mb-6">Tabla de alimentos</h2>
      <div className="overflow-x-auto">
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden">Acciones</span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamaño porción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad de ingredientes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Foods.map((food, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center">
                      <Trash2 className="w-5 h-5 mr-1" />
                      <span className="hidden">Eliminar</span>
                    </button>

                    <PopUp trigger={<Edit className="w-5 h-5 mr-1"></Edit>}>
                      <FoodsForm DefaultFood={food} FormName="Modificar Alimento" OnSubmit="update"></FoodsForm>
                    </PopUp>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{food.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {food.portion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {food.ingredients.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
