"use client";
import React from "react";
import Image from "next/image";

import Header from "./components/PrincipalHeader";
import Cards from "./components/Cards";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen max-w-7xl mx-auto p-8 flex flex-col justify-between">
        <Header />
        <main className="flex-grow flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="md:w-1/2 text-white">
            <h1 className="text-5xl font-bold mb-6">
              Generador de tablas nutricionales
            </h1>
          </div>
          <div className="md:w-1/2">
            {/*             <Image
              src="/images/imagen_principal.png"
              width={600}
              height={600}
              alt="Tabble en acción"
              className="max-w-full h-auto rounded-lg shadow-2xl"
            /> */}
          </div>
        </main>

        <Cards />

        <footer className="mt-16 text-center text-[#195e4b] text-opacity-80">
          <p>&copy; 2024 Tabbles. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
