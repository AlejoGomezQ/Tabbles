"use client";
import React from "react";

import RegisterForm from "../../components/RegisterForm";
import HeroSection from "../../components/HeroSection";

export default function RegisterPage() {
  return (
    <main className="flex h-screen bg-[#ADD8E6]">
      {/* Left side with wave pattern */}
      <HeroSection />

      {/* Right side with login form */}
      <RegisterForm />
    </main>
  );
}
