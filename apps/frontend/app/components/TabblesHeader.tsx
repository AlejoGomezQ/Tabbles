import React, { ReactEventHandler } from "react";
import Link from "next/link";

import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  let fullname = `${user?.name} ${user?.lastName}`;

  const onLogout = async () => {
    try {
      logout();
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  return (
    <header className="max-w-7xl mx-auto pt-4">
      <nav className="bg-white grid py-2 px-4 grid-cols-2 grid-rows-1 rounded-xl">
        <section>
          <h3 className="font-bold">{fullname}</h3>
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
}
