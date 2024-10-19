"use client";
import { Food } from "../models/food";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RawMaterial } from "../models/rawMaterial";
import Select from "react-select";
import { Ingredient } from "../models/ingredient";

export default function FoodsForm() {
  const [newFood, setNewFood] = useState<Food>({
    name: "",
    ingredients: [],
    portion: undefined,
  });

  const [Foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const { addFood } = useAuth();
  const [ingredientsOpt, setIngredientsOpt] = useState<RawMaterial[]>([]);
  const [SelectedIngredients, SetSelectedIngredients]= useState<Ingredient[]>([]);
  const { getAllRawMaterials } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedIngredients = selectedOptions
      .map((option: any) => {
        return {
          rawMaterial: option.value,
          quantity: 0, // Inicializar la cantidad en 0
        };
      });
      SetSelectedIngredients(selectedIngredients);
   
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, ingredientName : string) => {
    const newAmount = parseFloat(e.target.value);
    SetSelectedIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.rawMaterial.name === ingredientName ? { ...ingredient, amount: newAmount } : ingredient
      )
    );
    console.log(SelectedIngredients)
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
        name: newFood.name,
        ingredients: SelectedIngredients,
        portion: newFood.portion,
      };
      await addFood(food);
      setFoods((prev) => [...prev, newFood]);
      setNewFood({
        name: "",
        ingredients: [],
        portion: undefined,
      });
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
      <section className="p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Agregar alimento</h2>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
              required
            />
            <label
              htmlFor="portion"
              className="block text-sm font-medium text-gray-700"
            >
              Tamaño de la porción
            </label>
            <input
              type="number"
              id="portion"
              value={newFood.portion}
              onChange={handleInputChange}
              className="mt-1 block w-40 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
            ></input>
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
            />
            <div className="mt-4">
              <h3 className="font-bold">Ingredientes seleccionados:</h3>
              {SelectedIngredients.length > 0 && ( 
              <div>
                <ul className="grid grid-cols-1 gap-y-2">
                  {SelectedIngredients.map((ingredient) => (
                    <li >
                      <label className="block text-sm font-medium text-gray-700">{ingredient.rawMaterial.name}</label>
                      <input
                        type="number"
                        min="0"
                        value={ingredient.amount}
                        onChange={(e) => handleQuantityChange(e, ingredient.rawMaterial.name)}
                        className="mt-1 block w-40 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
                        placeholder="Cantidad"
                      />
                    </li>))}
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
