import React from "react";

export default function Cards() {
  return (
    <>
      <section className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition duration-300">
          <h3 className="font-bold text-2xl mb-4 text-[#195e4b]">
            Ingresa ingredientes a una base de datos de materias primas
          </h3>
          <p className="text-[#195e4b] text-opacity-90">
            Crea tu propia biblioteca de ingredientes personalizada para generar
            tablas nutricionales precisas.
          </p>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition duration-300">
          <h3 className="font-bold text-2xl mb-4 text-[#195e4b]">
            Genera tablas nutricionales en varios formatos con solo un clic
          </h3>
          <p className="text-[#195e4b] text-opacity-90">
            Obtén tablas nutricionales detalladas en PDF, Excel o formatos
            personalizados para tus necesidades específicas.
          </p>
        </div>
      </section>
    </>
  );
}
