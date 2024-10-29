import React from "react";
import { useAuth } from "../context/AuthContext";
import html2pdf from "html2pdf.js";
import type { NutritionalTable } from "../models/nutritionalTable";

const sampleData: NutritionalTable = {
  servingSize: "1 unidades (70g)",
  servingsPerContainer: 1,
  calories: { per100g: 344, perServing: 241 },
  totalFat: { per100g: 15, perServing: 10 },
  saturatedFat: { per100g: 6.9, perServing: 4.9 },
  transFat: { per100g: 0, perServing: 0 },
  totalCarbs: { per100g: 45, perServing: 31 },
  dietaryFiber: { per100g: 0.4, perServing: 0.3 },
  totalSugars: { per100g: 0, perServing: 0 },
  addedSugars: { per100g: 0, perServing: 0 },
  protein: { per100g: 8.4, perServing: 5.9 },
  sodium: { per100g: 315, perServing: 221 },
  vitaminA: { per100g: 45, perServing: 31 },
  vitaminD: { per100g: 0, perServing: 0 },
  calcium: { per100g: 1.1, perServing: 0.78 },
  iron: { per100g: 0.57, perServing: 0.4 },
  zinc: { per100g: 0.02, perServing: 0.02 },
};

export default function NutritionalTable() {
  const { user } = useAuth();

  const generatePDF = () => {
    const element = document.getElementById("nutritional-table");

    if (element) {
      element.className += "w-[50%]";
    }

    html2pdf().from(element).save("tabla_nutricional.pdf");
  };

  const renderRow = (
    label: string,
    key: keyof NutritionalTable,
    unit: string,
    bold: boolean = false,
    indent: boolean = false
  ) => {
    const data = sampleData[key] as { per100g: number; perServing: number };
    if (data.per100g === 0 && data.perServing === 0) return null;

    return (
      <tr
        className={`border-b border-black ${bold ? "font-bold" : ""} ${indent ? "pl-4" : ""}`}
      >
        <td className="p-2">{label}</td>
        <td className="text-right p-2">
          {data.per100g} {unit}
        </td>
        <td className="text-right p-2">
          {data.perServing} {unit}
        </td>
      </tr>
    );
  };

  return (
    <section className="lg:w-1/2 p-10">
      <div id="nutritional-table">
        <div className="max-w-3xl mx-auto m-4 border border-black">
          <h2 className="text-2xl font-bold border-b p-2 border-black text-center">
            Información Nutricional
          </h2>
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black">
                  <th colSpan={3} className="text-left p-2">
                    Tamaño de porción: {sampleData.servingSize}
                  </th>
                </tr>
                <tr className="border-b-2 border-black">
                  <th colSpan={3} className="text-left p-2">
                    Número de porciones por envase:{" "}
                    {sampleData.servingsPerContainer}
                  </th>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-left py-2"></th>
                  <th className="text-right p-2 border-x border-black">
                    Por 100g
                  </th>
                  <th className="text-right p-2">Por porción</th>
                </tr>
              </thead>
              <tbody>
                {renderRow("Calorías (Kcal)", "calories", "", true)}
                {renderRow("Grasa Total", "totalFat", "g")}
                {renderRow("Grasa saturada", "saturatedFat", "g", false, true)}
                {renderRow("Grasa trans", "transFat", "mg", false, true)}
                {renderRow("Carbohidratos totales", "totalCarbs", "g")}
                {renderRow("Fibra dietaria", "dietaryFiber", "g", false, true)}
                {renderRow("Azúcares totales", "totalSugars", "g", false, true)}
                {renderRow("Azúcares añadidos", "addedSugars", "g", true, true)}
                {renderRow("Proteína", "protein", "g")}
                {renderRow("Sodio", "sodium", "mg", true)}
                {renderRow("Vitamina A", "vitaminA", "µg ER")}
                {renderRow("Vitamina D", "vitaminD", "µg")}
                {renderRow("Calcio", "calcium", "mg")}
                {renderRow("Hierro", "iron", "mg")}
                {renderRow("Zinc", "zinc", "mg")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button
        onClick={generatePDF}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C0A3] hover:bg-[#93E9BE] hover:text-[#195e4b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE] transition ease-in"
      >
        Descargar PDF
      </button>
    </section>
  );
}
