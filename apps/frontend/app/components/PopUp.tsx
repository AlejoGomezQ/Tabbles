"use client";

import { ReactNode, useState } from "react";
import { X } from "lucide-react";

interface PopupProps {
  trigger: ReactNode;
  children: ReactNode;
}
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
