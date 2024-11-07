import React from "react";

import HeroSection from "../../components/HeroSection";
import LoginForm from "../../components/LoginForm";

/**
 * Componente de la página de inicio de sesión.
 *
 * Este componente renderiza la vista de inicio de sesión de la aplicación.
 * Muestra una sección de bienvenida (HeroSection) y un formulario de inicio de sesión (LoginForm).
 *
 * @returns {JSX.Element} Un elemento JSX que representa la estructura de la página de inicio de sesión.
 *
 * @example
 * // Uso en un archivo de ruta o en otro componente de Next.js
 * import LoginPage from './path/to/LoginPage';
 *
 * function MyApp() {
 *   return <LoginPage />;
 * }
 */
export default function LoginPage() {
  return (
    <main className="flex h-screen bg-[#ADD8E6]">
      <HeroSection />
      <LoginForm />
    </main>
  );
}
