"use client";
import { Food } from "../models/food";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RawMaterial } from "../models/rawMaterial";
import Select from "react-select"

export default function FoodsForm(){
    const [newFood, setNewFood] = useState<Food>({
        name: "",
        ingredients:[],
        portion: undefined,
    });

    const [Foods, setFoods] = useState<Food[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const { addFood } = useAuth();
    const [ingredients, setIngredients] = useState<RawMaterial[]>([]);
    const { getAllRawMaterials} = useAuth()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewFood((prev) => ({ ...prev, [name]: value }));
      };

      const handleSelectChange = (selectedOptions: any) => {
        const selectedIngredients = selectedOptions.map((option: any) => {
          return ingredients.find((ingredient) => ingredient.name === option.value) || null;
        }).filter(Boolean) as RawMaterial[];
    
        setNewFood((prev) => ({
          ...prev,
          ingredients: selectedIngredients,
        }));
      };

    const ingredientOptions = ingredients.map((ingredient) => ({
      value: ingredient.name,
      label: ingredient.name,
    }));
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(undefined);
        try {
            const food = {
                name: newFood.name,
                ingredients: newFood.ingredients,
                portion: newFood.portion,
            };
            await addFood(food);
            setFoods((prev) => [...prev, newFood]);
            setNewFood({
                name: "",
                ingredients:[],
                portion: undefined,
            });
        }
        catch (err) {
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
            const materials = await getAllRawMaterials();
            setIngredients(materials); // Almacena las materias primas en el estado
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
          <section className="overflow-y-auto p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Agregar alimento</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} >
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
                  id= 'portion'
                  value= {newFood.portion}
                  onChange={handleInputChange}
                  className="mt-1 block w-40 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE]"
                >
                </input>
                <label
                    htmlFor="portion"
                    className="block text-sm font-medium text-gray-700">
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
                <h3 className="font-bold">
                  Ingredientes seleccionados:
                </h3>
                {newFood.ingredients.length > 0 ? (
                  <ul className="list-disc list-inside mt-2">
                    {newFood.ingredients.map((ingredient) => (
                    <li key={ingredient.name}>{ingredient.name}</li>
                    ))}
                  </ul>
                  ) : (
                  <p className="text-gray-500">No hay ingredientes seleccionados.</p>
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