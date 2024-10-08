import React from "react";

// Componente de sección de principal
import HeroSection from "../../components/HeroSection";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex h-screen bg-gradient-to-r from-[#00C0A3] to-[#ADD8E6]">
      {/* Left side with wave pattern */}
      <HeroSection />

      {/* Right side with login form */}
      <LoginForm />
    </main>
  );
}
