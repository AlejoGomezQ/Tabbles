"use client";

import React, { useState } from "react";

interface SubHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

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
