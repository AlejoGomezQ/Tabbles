"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import Select, { SingleValue } from "react-select";
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

interface NutritionalTableFormProps {
  onSubmit: (data: {
    food: Food;
    servingSize: number;
    servingsPerContainer: number;
    format: string;
  }) => void;
}

/**
 * Componente `NutritionalTableForm` que permite a los usuarios seleccionar un alimento,
 * especificar el tamaño de la porción y el número de porciones por envase, y seleccionar
 * un formato de tabla nutricional. Al enviar el formulario, se ejecuta una función de
 * devolución de llamada para calcular y mostrar la tabla nutricional.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.onSubmit - Función que se ejecuta al enviar el formulario. Recibe un objeto
 * con la información del alimento seleccionado, tamaño de la porción, porciones por envase y formato.
 * @param {Object} props.onSubmit.data - Datos del formulario.
 * @param {Food} props.onSubmit.data.food - Objeto `Food` que representa el alimento seleccionado.
 * @param {number} props.onSubmit.data.servingSize - Tamaño de la porción en gramos.
 * @param {number} props.onSubmit.data.servingsPerContainer - Número de porciones por envase.
 * @param {string} props.onSubmit.data.format - Formato de la tabla nutricional (e.g., "spanish", "english", "both").
 *
 * @returns {JSX.Element} Un formulario para seleccionar un alimento, el tamaño de la porción,
 * el número de porciones por envase y el formato de la tabla nutricional.
 *
 * @example
 * import NutritionalTableForm from './NutritionalTableForm';
 *
 * function handleSubmit(data) {
 *   console.log(data);
 * }
 *
 * export default function App() {
 *   return (
 *     <NutritionalTableForm onSubmit={handleSubmit} />
 *   );
 * }
 */
export default function NutritionalTableForm({
  onSubmit,
}: NutritionalTableFormProps) {
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
      setError(err instanceof Error ? err.message : "Failed to fetch foods");
    } finally {
      setIsLoading(false);
    }
  }, [getAllFoods]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleFoodChange = (selectedOption: Food | null) => {
    setSelectedFood(selectedOption);
    console.log(selectedOption);
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
    if (!servingData.servingSize || !servingData.servingsPerContainer) {
      setError(
        "Por favor, ingrese el tamaño de la porción y las porciones por envase"
      );
      return;
    }

    onSubmit({
      food: selectedFood,
      servingSize: parseFloat(servingData.servingSize),
      servingsPerContainer: parseFloat(servingData.servingsPerContainer),
      format: selectedFormat.value,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="lg:w-1/2 p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Generar tabla nutricional</h2>
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
            options={foods.map((food) => ({ ...food, label: food.name }))}
            onChange={handleFoodChange}
            value={selectedFood}
            className="mt-1 block w-full"
            classNamePrefix="select"
            placeholder="Buscar alimento..."
          />
          <label
            htmlFor="servingSize"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tamaño de la porción (g)
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
