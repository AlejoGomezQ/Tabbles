"use client";
import { Food } from "../models/food";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RawMaterial } from "../models/rawMaterial";
import Select from "react-select";
import { Ingredient } from "../models/ingredient";
import { toast } from "react-toastify";

interface params {
  DefaultFood: Food;
  FormName: string;
  OnSubmit: string;
}
export default function FoodsForm({ DefaultFood, FormName, OnSubmit }: params) {
  const [newFood, setNewFood] = useState<Food>(DefaultFood);
  const [Foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [ingredientsOpt, setIngredientsOpt] = useState<RawMaterial[]>([]);
  const [SelectedIngredients, SetSelectedIngredients] = useState<Ingredient[]>(
    DefaultFood.ingredients
  );

  const { addFood } = useAuth();
  const { getAllRawMaterials } = useAuth();
  const { updateFood } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedIngredients = selectedOptions.map((option: any) => {
      return {
        rawMaterial: option.value,
        amount: 0, // Inicializar la cantidad en 0
      };
    });
    SetSelectedIngredients(selectedIngredients);
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ingredientName: string
  ) => {
    const newAmount = parseFloat(e.target.value);
    SetSelectedIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.rawMaterial.name === ingredientName
          ? { ...ingredient, amount: newAmount }
          : ingredient
      )
    );
  };

  const ingredientOptions = ingredientsOpt.map((ingredient) => ({
    value: ingredient,
    label: ingredient.name,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    try {
      const food = {
        id: newFood.id,
        name: newFood.name,
        ingredients: SelectedIngredients,
      };
      if (OnSubmit === "create") {
        await addFood(food);
        toast.success("Alimento creado exitosamente", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        setNewFood({
          name: "",
          ingredients: [],
        });
      } else if (OnSubmit === "update") {
        await updateFood(food);
        toast.success("Alimento modificado exitosamente", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
      setFoods((prev) => [...prev, newFood]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al agregar el alimento"
      );
    }
  };
  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const rawMaterials = await getAllRawMaterials();
        setIngredientsOpt(rawMaterials); // Almacena las materias primas en el estado
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error al traer los ingredientes de la base de datos"
        );
      }
    };
    fetchRawMaterials();
  }, []);

  return (
    <>
      <section className="p-8 mb-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{FormName}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-2">
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
              value={newFood.name}
              onChange={handleInputChange}
              className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
              required
            />
            <label
              htmlFor="Ingredients"
              className="block text-sm font-medium text-gray-700"
            >
              Ingredientes
            </label>
            <Select
              isMulti
              name="ingredients"
              options={ingredientOptions}
              onChange={handleSelectChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Selecciona ingredientes"
              defaultValue={SelectedIngredients.map((ingredient) => ({
                value: ingredient.rawMaterial,
                label: ingredient.rawMaterial.name,
              }))}
            />
            <div className="mt-4">
              <h3 className="font-bold">Ingredientes seleccionados:</h3>
              {SelectedIngredients.length > 0 && (
                <div>
                  <ul className="grid grid-cols-1 gap-y-2">
                    {SelectedIngredients.map((ingredient) => (
                      <li>
                        <label className="block text-sm font-medium text-gray-700">
                          Cantidad de {ingredient.rawMaterial.name} (g)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={ingredient.amount}
                          onChange={(e) =>
                            handleQuantityChange(e, ingredient.rawMaterial.name)
                          }
                          className="mt-1 block w-40 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
                          placeholder="Cantidad"
                          defaultValue={ingredient.amount}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4  mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00C0A3] hover:bg-[#93E9BE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE]"
            >
              Agregar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
