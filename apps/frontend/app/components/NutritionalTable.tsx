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
    html2pdf().from(element).save("tabla_nutricional.pdf");
  };

  return (
    <section className="p-10 overflow-x-auto">
      <div className="max-w-3xl mx-auto mb-10 border border-black">
        <h2 className="text-2xl font-bold border-b border-black text-center">
          Información Nutricional
        </h2>
        <div id="nutritional-table" className="">
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
                <th className="text-right py-2 border-x border-black">
                  Por 100g
                </th>
                <th className="text-right py-2">Por porción</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-black font-bold">
                <td className="py-2">Calorías (Kcal)</td>
                <td className="text-right">{sampleData.calories.per100g}</td>
                <td className="text-right">{sampleData.calories.perServing}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2">Grasa Total</td>
                <td className="text-right">{sampleData.totalFat.per100g} g</td>
                <td className="text-right">
                  {sampleData.totalFat.perServing} g
                </td>
              </tr>
              <tr className="border-b border-black pl-4">
                <td className="py-2">Grasa saturada</td>
                <td className="text-right">
                  {sampleData.saturatedFat.per100g} g
                </td>
                <td className="text-right">
                  {sampleData.saturatedFat.perServing} g
                </td>
              </tr>
              <tr className="border-b border-black pl-4">
                <td className="py-2">Grasa trans</td>
                <td className="text-right">{sampleData.transFat.per100g} mg</td>
                <td className="text-right">
                  {sampleData.transFat.perServing} mg
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2">Carbohidratos totales</td>
                <td className="text-right">
                  {sampleData.totalCarbs.per100g} g
                </td>
                <td className="text-right">
                  {sampleData.totalCarbs.perServing} g
                </td>
              </tr>
              <tr className="border-b border-black pl-4">
                <td className="py-2">Fibra dietaria</td>
                <td className="text-right">
                  {sampleData.dietaryFiber.per100g} g
                </td>
                <td className="text-right">
                  {sampleData.dietaryFiber.perServing} g
                </td>
              </tr>
              <tr className="border-b border-black pl-4">
                <td className="py-2">Azúcares totales</td>
                <td className="text-right">
                  {sampleData.totalSugars.per100g} g
                </td>
                <td className="text-right">
                  {sampleData.totalSugars.perServing} g
                </td>
              </tr>
              <tr className="border-b border-black pl-8 font-bold">
                <td className="py-2">Azúcares añadidos</td>
                <td className="text-right">
                  {sampleData.addedSugars.per100g} g
                </td>
                <td className="text-right">
                  {sampleData.addedSugars.perServing} g
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2">Proteína</td>
                <td className="text-right">{sampleData.protein.per100g} g</td>
                <td className="text-right">
                  {sampleData.protein.perServing} g
                </td>
              </tr>
              <tr className="border-b-2 border-black font-bold">
                <td className="py-2">Sodio</td>
                <td className="text-right">{sampleData.sodium.per100g} mg</td>
                <td className="text-right">
                  {sampleData.sodium.perServing} mg
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2">Vitamina A</td>
                <td className="text-right">
                  {sampleData.vitaminA.per100g} µg ER
                </td>
                <td className="text-right">
                  {sampleData.vitaminA.perServing} µg ER
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2">Vitamina D</td>
                <td className="text-right">{sampleData.vitaminD.per100g} µg</td>
                <td className="text-right">
                  {sampleData.vitaminD.perServing} µg
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2">Calcio</td>
                <td className="text-right">{sampleData.calcium.per100g} mg</td>
                <td className="text-right">
                  {sampleData.calcium.perServing} mg
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="py-2">Hierro</td>
                <td className="text-right">{sampleData.iron.per100g} mg</td>
                <td className="text-right">{sampleData.iron.perServing} mg</td>
              </tr>
              <tr>
                <td className="py-2">Zinc</td>
                <td className="text-right">{sampleData.zinc.per100g} mg</td>
                <td className="text-right">{sampleData.zinc.perServing} mg</td>
              </tr>
            </tbody>
          </table>
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
