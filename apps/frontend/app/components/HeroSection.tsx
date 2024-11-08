"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Componente `HeroSection` que muestra una sección principal (hero) con contenido personalizado
 * dependiendo de la ruta actual del navegador.
 * Si el usuario está en la página de registro, muestra un mensaje de registro.
 * Si está en la página de inicio de sesión, muestra un mensaje de inicio de sesión.
 *
 * @component
 * @returns {JSX.Element | null}
 * Retorna una sección con un mensaje y logo en función de la ruta actual. Si no se encuentra en
 * las rutas de inicio de sesión o registro, retorna `null`.
 *
 * @example
 * import HeroSection from './HeroSection';
 *
 * export default function App() {
 *   return (
 *     <div>
 *       <HeroSection />
 *     </div>
 *   );
 * }
 */
export default function HeroSection() {
  const currentPath = usePathname();

  const loginSection = (
    <section className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative bg-gradient-to-r from-[#00C0A3] to-[#ADD8E6]">
      <Image
        src="/images/tabbles_logo_verde.png"
        width={130}
        height={130}
        alt="Tabbles Logo"
        className="z-10 mb-8"
      />
      <p className="text-center text-white text-xl mt-4 z-10">
        Calcula los beneficios de tus alimentos y genera tablas nutricionales
        precisas que optimizan tu salud y bienestar. <br />
        <span className="text-[#195e4b]">¡Fácilmente y en minutos!</span>
      </p>
    </section>
  );

  const registerSection = (
    <section className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative bg-gradient-to-r from-[#00C0A3] to-[#ADD8E6]">
      <Image
        src="/images/tabbles_logo_verde.png"
        width={130}
        height={130}
        alt="Tabbles Logo"
        className="z-10 mb-8"
      />
      <p className="text-center text-white text-xl mt-4 z-10">
        Regístrate y transforma tu alimentación con tablas nutricionales
        personalizadas que optimizan tu salud y bienestar. Descubre los
        beneficios de tus alimentos hoy mismo. <br />
        <span className="text-[#195e4b]">¡Únete a Tabbles!</span>
      </p>
    </section>
  );

  if (currentPath === "/pages/register") {
    return registerSection;
  } else if (currentPath === "/pages/login") {
    return loginSection;
  }

  return null;
}
