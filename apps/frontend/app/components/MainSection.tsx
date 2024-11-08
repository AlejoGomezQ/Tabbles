/**
 * Componente `MainSection` que renderiza una sección principal en la página,
 * que incluye un título principal centrado con un mensaje descriptivo.
 *
 * @component
 * @returns {JSX.Element} Un elemento JSX que contiene la sección principal con un título.
 *
 * @example
 * import MainSection from './MainSection';
 *
 * export default function App() {
 *   return (
 *     <div>
 *       <MainSection />
 *     </div>
 *   );
 * }
 */
export default function MainSection() {
  return (
    <main>
      <div className="md:w-1/2 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Generador de tablas nutricionales
        </h1>
      </div>
    </main>
  );
}
