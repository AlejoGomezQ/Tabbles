"use client";

import React from "react";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative">
      <Image
        src="/images/tabbles_logo.png"
        width={100}
        height={100}
        alt="Tabbles Logo"
        className="z-10 mb-8"
      />
      <h1 className="text-4xl font-bold text-white z-10">Tabbles</h1>
      <p className="text-white text-xl mt-4 z-10">
        Transforma tus alimentos: crea, calcula y genera tablas nutricionales.
      </p>
    </section>
  );
}
