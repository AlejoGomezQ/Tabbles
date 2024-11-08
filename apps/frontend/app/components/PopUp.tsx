"use client";

import { ReactNode, useState } from "react";
import { X } from "lucide-react";

interface PopupProps {
  trigger: ReactNode;
  children: ReactNode;
}

/**
 * Componente `PopUp` que muestra un popup modal cuando el usuario hace clic en un elemento disparador.
 * El modal puede contener cualquier contenido que se pase como `children` y se puede cerrar al hacer clic en el botón de cierre.
 *
 * @component
 * @param {object} props - Las propiedades del componente.
 * @param {ReactNode} props.trigger - Elemento React que activa la apertura del popup cuando se hace clic.
 * @param {ReactNode} props.children - Contenido que se muestra dentro del popup.
 * @returns {JSX.Element} Retorna un elemento JSX que contiene el popup modal.
 *
 * @example
 * // Uso en un componente de Next.js
 * import PopUp from "./PopUp";
 * import { Button } from "./Button";
 *
 * export default function MyComponent() {
 *   return (
 *     <PopUp trigger={<Button>Abrir Popup</Button>}>
 *       <p>Contenido del popup.</p>
 *     </PopUp>
 *   );
 * }
 */
export default function PopUp({ trigger, children }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block">
      <div onClick={togglePopup}>{trigger}</div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-auto h-[83.5vh] relative overflow-y-scroll">
            <button className="absolute top-2 right-2" onClick={togglePopup}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
