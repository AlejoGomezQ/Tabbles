"use client";

import React from "react";

interface SubHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

/**
 * Componente de la página de Login que muestra un formulario de inicio de sesión y una sección de bienvenida.
 *
 * Este componente es responsable de renderizar la interfaz de usuario de la página de inicio de sesión.
 * Incluye una sección de bienvenida (`HeroSection`) y un formulario de inicio de sesión (`LoginForm`).
 *
 * @returns {JSX.Element} El componente de la página de Login renderizado.
 *
 * @example
 * // Ejemplo de uso del componente LoginPage
 * import LoginPage from './LoginPage';
 *
 * function App() {
 *   return <LoginPage />;
 * }
 */
export default function SubHeader({ activeTab, setActiveTab }: SubHeaderProps) {
  return (
    <>
      <section className="flex border-b rounded-t-xl">
        <button
          className={`flex-1 py-2 px-4 text-center rounded-tl-xl hover:bg-[#00c0a382] transition ease-in ${activeTab === "ingredients" ? "bg-[#00C0A3] text-white hover:bg-[#00C0A3]" : "bg-gray-100"}`}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredientes
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center hover:bg-[#00c0a382] transition ease-in ${activeTab === "foods" ? "bg-[#00C0A3] text-white hover:bg-[#00C0A3]" : "bg-gray-100"}`}
          onClick={() => setActiveTab("foods")}
        >
          Alimentos
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center rounded-tr-xl hover:bg-[#00c0a382] transition ease-in ${activeTab === "nutritionalTables" ? "bg-[#00C0A3] text-white hover:bg-[#00C0A3]" : "bg-gray-100"}`}
          onClick={() => setActiveTab("nutritionalTables")}
        >
          Tablas nutricionales
        </button>
      </section>
    </>
  );
}
