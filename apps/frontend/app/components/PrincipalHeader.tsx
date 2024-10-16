import React from "react";
import { usePathname } from "next/navigation";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useAuth();
  const currentPath = usePathname();

  const onLogout = async () => {
    try {
      logout();
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  const dashboardHeader = (
    <header className="max-w-7xl mx-auto pt-4">
      <nav className="bg-white grid py-2 px-4 grid-cols-2 grid-rows-1 rounded-xl">
        <section>
          <h3 className="font-bold">
            {user?.name} {user?.lastName}
          </h3>
          <p>{user?.email}</p>
        </section>
        <section className="justify-self-end">
          <button
            onClick={onLogout}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C0A3] hover:bg-[#93E9BE] hover:text-[#195e4b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE] transition ease-in"
          >
            Cerrar sesión
          </button>
        </section>
      </nav>
    </header>
  );

  const homeHeader = (
    <header className="flex justify-between items-center mb-12">
      <Image
        src="/images/tabbles_logo_verde.png"
        width={100}
        height={100}
        alt="Tabbles Logo"
      />
      <nav className="space-x-4">
        <Link href="/login">
          <button className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#00C0A3] bg-white hover:bg-[#93E9BE] hover:text-[#195e4b] focus:outline-none transition ease-in">
            Iniciar sesión
          </button>
        </Link>
        <Link href="/register">
          <button className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C0A3] hover:bg-[#93E9BE] hover:text-[#195e4b] focus:outline-none transition ease-in">
            Registrarse
          </button>
        </Link>
      </nav>
    </header>
  );

  if (currentPath === "/pages/dashboard") {
    return dashboardHeader;
  } else if (currentPath === "/") {
    return homeHeader;
  }

  return null;
}
