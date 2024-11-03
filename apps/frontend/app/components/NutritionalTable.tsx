import React from "react";
import html2pdf from "html2pdf.js";

interface NutritionalValue {
  per100g: number;
  perServing: number;
}

interface NutritionalData {
  [key: string]: NutritionalValue;
}

interface NutritionalTableProps {
  data: NutritionalData;
  servingSize: number;
  servingsPerContainer: number;
  format: string;
}

const spanishLabels: { [key: string]: string } = {
  calories: "Calorías (Kcal)",
  totalFat: "Grasa Total",
  saturatedFat: "Grasa saturada",
  transFat: "Grasa trans",
  totalCarbs: "Carbohidratos totales",
  dietaryFiber: "Fibra dietaria",
  totalSugars: "Azúcares totales",
  addedSugars: "Azúcares añadidos",
  protein: "Proteína",
  sodium: "Sodio",
  vitaminA: "Vitamina A",
  vitaminD: "Vitamina D",
  calcium: "Calcio",
  iron: "Hierro",
  zinc: "Zinc",
};

const englishLabels: { [key: string]: string } = {
  calories: "Calories (Kcal)",
  totalFat: "Total Fat",
  saturatedFat: "Saturated Fat",
  transFat: "Trans Fat",
  totalCarbs: "Total Carbohydrates",
  dietaryFiber: "Dietary Fiber",
  totalSugars: "Total Sugars",
  addedSugars: "Added Sugars",
  protein: "Protein",
  sodium: "Sodium",
  vitaminA: "Vitamin A",
  vitaminD: "Vitamin D",
  calcium: "Calcium",
  iron: "Iron",
  zinc: "Zinc",
};

export default function NutritionalTable({
  data,
  servingSize,
  servingsPerContainer,
  format,
}: NutritionalTableProps) {
  const generatePDF = () => {
    const element = document.getElementById("nutritional-table");
    if (element) {
      html2pdf().from(element).save("tabla_nutricional.pdf");
    }
  };

  const getLabel = (key: string) => {
    if (format === "english") return englishLabels[key] || key;
    if (format === "both")
      return `${spanishLabels[key] || key} / ${englishLabels[key] || key}`;
    return spanishLabels[key] || key;
  };

  const renderRow = (
    key: string,
    value: NutritionalValue,
    unit: string,
    bold: boolean = false,
    indent: boolean = false
  ) => {
    if (value.per100g === 0 && value.perServing === 0) return null;

    return (
      <tr
        key={key}
        className={`border-b border-black ${bold ? "font-bold" : ""} ${indent ? "pl-4" : ""}`}
      >
        <td className="p-2">{getLabel(key)}</td>
        <td className="text-right p-2">
          {value.per100g.toFixed(2)} {unit}
        </td>
        <td className="text-right p-2">
          {value.perServing.toFixed(2)} {unit}
        </td>
      </tr>
    );
  };

  return (
    <section className="lg:w-1/2 p-10">
      <div id="nutritional-table">
        <div className="max-w-3xl mx-auto m-4 border border-black">
          <h2 className="text-2xl font-bold border-b p-2 border-black text-center">
            {format === "english"
              ? "Nutrition Facts"
              : format === "both"
                ? "Información Nutricional / Nutrition Facts"
                : "Información Nutricional"}
          </h2>
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black">
                  <th colSpan={3} className="text-left p-2">
                    {format === "english"
                      ? `Serving Size: ${servingSize}g`
                      : format === "both"
                        ? `Tamaño de porción / Serving Size: ${servingSize}g`
                        : `Tamaño de porción: ${servingSize}g`}
                  </th>
                </tr>
                <tr className="border-b-2 border-black">
                  <th colSpan={3} className="text-left p-2">
                    {format === "english"
                      ? `Servings Per Container: ${servingsPerContainer}`
                      : format === "both"
                        ? `Porciones por envase / Servings Per Container: ${servingsPerContainer}`
                        : `Porciones por envase: ${servingsPerContainer}`}
                  </th>
                </tr>
                <tr className="border-b border-black">
                  <th className="text-left py-2"></th>
                  <th className="text-right p-2 border-x border-black">
                    {format === "english"
                      ? "Per 100g"
                      : format === "both"
                        ? "Por 100g / Per 100g"
                        : "Por 100g"}
                  </th>
                  <th className="text-right p-2">
                    {format === "english"
                      ? "Per Serving"
                      : format === "both"
                        ? "Por porción / Per Serving"
                        : "Por porción"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value]) => {
                  const unit = key === "calories" ? "" : "g";
                  const bold = [
                    "calories",
                    "totalFat",
                    "totalCarbs",
                    "protein",
                    "sodium",
                  ].includes(key);
                  const indent = [
                    "saturatedFat",
                    "transFat",
                    "dietaryFiber",
                    "totalSugars",
                    "addedSugars",
                  ].includes(key);
                  return renderRow(key, value, unit, bold, indent);
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button
        onClick={generatePDF}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C0A3] hover:bg-[#93E9BE] hover:text-[#195e4b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE] transition ease-in"
      >
        {format === "english"
          ? "Download PDF"
          : format === "both"
            ? "Descargar PDF / Download PDF"
            : "Descargar PDF"}
      </button>
    </section>
  );
}
