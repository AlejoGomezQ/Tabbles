import React from "react";
import Link from "next/link";

export default function Header(){
    return (
        <div className="py-2 grid px-4 grid-cols-2 grid-rows-1 bg-white">
            <div>
                <h3 className="font-bold">Nombre del usuario</h3>
                <p>Correo del usuario</p>
            </div>
            <div className="justify-self-end">
            <Link href={"../"}  className="">
                <button className=" border text-center text-white bg-[#212121] py-4 px-6 rounded-lg  hover:bg-white hover:border-[#212121] hover:text-[#212121]">Cerrar sesion</button>
            </Link>
            </div>
        </div>
    );
}