"use client";
import React from "react";
import Header from "../../components/PrincipalHeader";
import SubHeader from "../../components/SubHeader";
import RawMaterialsForm from "../../components/RawMaterialsForm";
import RawMaterialsTable from "../../components/RawMaterialsTable";
import { useState } from "react";
import FoodsForm from "../../components/FoodsForm";
import FoodsTable from "../../components/FoodsTable";
import { rawMaterial } from "../../const/rawMaterial";
import { food } from "../../const/food";
import NutritionalTableGenerator from "../../components/NutritionalTableGenerator";

/**
 * Componente de React que representa el panel de control de la aplicación.
 * Proporciona una interfaz para gestionar materias primas, alimentos y generar tablas nutricionales.
 * Permite cambiar entre diferentes pestañas: "ingredients", "foods" y "nutritionalTables".
 *
 * @returns {JSX.Element} El componente del panel de control, que incluye formularios y tablas para
 * la gestión de materias primas y alimentos, además de un generador de tablas nutricionales.
 *
 * @example
 * // Ejemplo de uso en la aplicación
 * import Dashboard from "../path/to/Dashboard";
 *
 * function App() {
 *   return (
 *     <div>
 *       <Dashboard />
 *     </div>
 *   );
 * }
 */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("ingredients");

  return (
    <section className=" bg-[#ADD8E6]">
      <Header />
      <main className="min-h-full flex flex-col">
        <div className="overflow-hidden">
          <div className="h-[83.5vh] max-w-7xl mx-auto my-10 rounded-xl bg-white shadow-lg flex flex-col">
            <SubHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "ingredients" && (
              <>
                <RawMaterialsForm
                  DefaultRawMaterial={rawMaterial}
                  FormName="Agregar ingrediente"
                  OnSubmit="create"
                />
                <RawMaterialsTable />
              </>
            )}
            {activeTab === "foods" && (
              <section className="grid grid-cols-2 overflow-hidden">
                <FoodsForm
                  DefaultFood={food}
                  FormName="Agregar alimento"
                  OnSubmit="create"
                />
                <FoodsTable />
              </section>
            )}
            {activeTab === "nutritionalTables" && <NutritionalTableGenerator />}
          </div>
        </div>
      </main>
    </section>
  );
}
