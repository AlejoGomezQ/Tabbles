"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(name, lastName, email, password);
      // Redirect or update UI on successful registration
      router.push("/pages/login");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration"
      );
    }
  };

  return (
    <section className="lg:w-1/2 flex items-center justify-center rounded-tl-xl rounded-bl-xl bg-white shadow-lg">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Regístrate para comenzar a utilizar Tabbles
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-md relative block w-full mb-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE] focus:z-10 sm:text-sm"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="">
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-md relative block w-full mb-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE] focus:z-10 sm:text-sm"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full mb-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE] focus:z-10 sm:text-sm"
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
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#93E9BE] focus:border-[#93E9BE] focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C0A3] hover:bg-[#93E9BE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE]"
            >
              Registrarse
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/pages/login"
              className="font-medium text-[#00C0A3] hover:text-[#93E9BE]"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
