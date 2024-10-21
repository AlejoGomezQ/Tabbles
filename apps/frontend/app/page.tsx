"use client";
import React from "react";

import Header from "./components/PrincipalHeader";
import Cards from "./components/Cards";
import MainSection from "./components/MainSection";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen max-w-7xl mx-auto p-8 flex flex-col justify-between">
        <Header />
        <MainSection />
        <Cards />
        <footer className="mt-16 text-center text-[#195e4b] text-opacity-80">
          <p>&copy; 2024 Tabbles. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
