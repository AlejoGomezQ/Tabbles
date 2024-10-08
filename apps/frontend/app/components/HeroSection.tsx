"use client";

import React from "react";

import Image from "next/image";

export default function HeroSection() {
  return (
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
}
