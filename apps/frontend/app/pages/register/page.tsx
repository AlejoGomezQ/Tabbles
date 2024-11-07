"use client";
import React from "react";

import RegisterForm from "../../components/RegisterForm";
import HeroSection from "../../components/HeroSection";

/**
 * Componente que representa la página de registro.
 * Este componente es el encargado de mostrar la sección de héroe (con un mensaje o imagen principal) y el formulario de registro en una página de la aplicación.
 * Utiliza dos componentes internos: `HeroSection` para mostrar una sección visual destacada y `RegisterForm` para capturar los datos del usuario.
 *
 * @returns {JSX.Element} El componente que renderiza la página de registro con dos secciones: una de héroe y otra de formulario de registro.
 *
 * @example
 * // Ejemplo de uso en una ruta de Next.js
 * export default function MyApp() {
 *   return (
 *     <RegisterPage />
 *   );
 * }
 */
export default function RegisterPage() {
  return (
    <main className="flex h-screen bg-[#ADD8E6]">
      <HeroSection />
      <RegisterForm />
    </main>
  );
}
