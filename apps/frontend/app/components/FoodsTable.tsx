"use client";

import PopUp from "./PopUp";
import { useCallback, useEffect, useState } from "react";
import { Food } from "../models/food";
import { useAuth } from "../context/AuthContext";
import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import FoodsForm from "./FoodsForm";

/**
 * Componente `FoodsTable` que muestra una tabla con una lista de alimentos obtenida desde un servidor.
 * Cada fila de la tabla contiene el nombre del alimento y la cantidad de ingredientes, con botones para
 * eliminar o modificar cada alimento. También maneja el estado de carga y errores en la obtención de datos.
 *
 * @component
 * @returns {JSX.Element} La tabla de alimentos con opciones para eliminar o modificar cada alimento.
 *                        Si los datos están cargando o hay un error, se muestra un mensaje adecuado.
 *
 * @example
 * import FoodsTable from './FoodsTable';
 *
 * export default function App() {
 *   return (
 *     <div>
 *       <FoodsTable />
 *     </div>
 *   );
 * }
 */
export default function FoodsTable() {
  const [Foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllFoods, deleteFood } = useAuth();

  const fetchFoods = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllFoods();
      setFoods(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch foods");
    } finally {
      setIsLoading(false);
    }
  }, [getAllFoods]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteFood(id);
        await fetchFoods();
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to food");
      }
    },
    [deleteFood, fetchFoods]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="p-8 border-t rounded-bl-xl overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Tabla de alimentos</h2>
      <div>
        <div>
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
                  Cantidad de ingredientes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Foods.map((food, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center"
                      onClick={() => food.id && handleDelete(food.id)}
                    >
                      <Trash2 className="w-5 h-5 mr-1" />
                      <span className="hidden">Eliminar</span>
                    </button>

                    <PopUp trigger={<Edit2 className="w-5 h-5 mr-1" />}>
                      <FoodsForm
                        DefaultFood={food}
                        FormName="Modificar Alimento"
                        OnSubmit="update"
                      ></FoodsForm>
                    </PopUp>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{food.name}</td>
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
