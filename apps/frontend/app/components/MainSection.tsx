"use client";

import React from "react";
import Image from "next/image";

export default function MainSection() {
  return (
    <main className="flex-grow flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="md:w-1/2 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Generador de tablas nutricionales
        </h1>
      </div>
      <div className="md:w-1/2">
        <Image
          src="/images/imagen1.png"
          width={301}
          height={201}
          alt="Frutas y verduras"
        />
      </div>
    </main>
  );
}
