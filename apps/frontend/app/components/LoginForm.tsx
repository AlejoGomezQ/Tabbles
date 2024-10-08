"use client";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Estado de la página de inicio de sesión
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // Redirect or update UI on successful login
      router.push("/pages/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
    }
  };

  return (
    <section className="lg:w-1/2 flex items-center justify-center rounded-tl-xl rounded-bl-xl bg-white shadow-lg">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Bienvenido
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Inicie sesión en su cuenta para continuar
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-3">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE] focus:z-10 sm:text-sm"
                placeholder="Correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE] focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[#00C0A3] hover:text-[#93E9BE]"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C0A3] hover:bg-[#93E9BE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE]"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/pages/register"
              className="font-medium text-[#00C0A3] hover:text-[#93E9BE]"
            >
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
