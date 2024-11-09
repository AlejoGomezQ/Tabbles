import html2pdf from "html2pdf.js";
import { englishLabels, spanishLabels, units } from "../const/nutritionalTable";

interface NutritionalData {
  [key: string]: {
    per100g: number;
    perServing: number;
  };
}

interface NutritionalTableProps {
  data: NutritionalData;
  servingSize: number;
  servingsPerContainer: number;
  format: string;
}

/**
 * Componente `NutritionalTable` que muestra una tabla nutricional con los valores de
 * los nutrientes por cada 100g y por porción de un alimento, permitiendo la descarga
 * de la tabla en formato PDF.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {NutritionalData} props.data - Datos nutricionales a mostrar en la tabla.
 * Contiene las propiedades de cada nutriente con los valores por cada 100g y por porción.
 * @param {number} props.servingSize - El tamaño de la porción en gramos.
 * @param {number} props.servingsPerContainer - El número de porciones por envase.
 * @param {string} props.format - El formato de la tabla nutricional (puede ser "spanish", "english" o "both").
 *
 * @returns {JSX.Element} Una tabla que muestra los valores nutricionales y un botón para descargar la tabla en formato PDF.
 *
 * @example
 * import NutritionalTable from './NutritionalTable';
 *
 * const data = {
 *   calories: { per100g: 250, perServing: 50 },
 *   totalFats: { per100g: 10, perServing: 2 },
 *   carbohydrates: { per100g: 30, perServing: 6 },
 *   proteins: { per100g: 15, perServing: 3 },
 *   // Otros nutrientes...
 * };
 *
 * const format = "spanish"; // O "english" o "both"
 * const servingSize = 100;
 * const servingsPerContainer = 10;
 *
 * export default function App() {
 *   return (
 *     <NutritionalTable
 *       data={data}
 *       servingSize={servingSize}
 *       servingsPerContainer={servingsPerContainer}
 *       format={format}
 *     />
 *   );
 * }
 */
export default function NutritionalTable({
  data,
  servingSize,
  servingsPerContainer,
  format,
}: NutritionalTableProps) {
  const generatePDF = () => {
    const element = document.getElementById("nutritional-table");
    if (element) {
      html2pdf()
        .set({
          margin: 1.5,
          filename: "tabla_nutricional.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
    }
  };

  const getLabel = (key: string) => {
    if (format === "english") return englishLabels[key] || key;
    if (format === "both")
      return `${spanishLabels[key] || key} / ${englishLabels[key] || key}`;
    return spanishLabels[key] || key;
  };

  const getUnit = (key: string) => {
    return units[key] || "";
  };

  const renderRow = (
    key: string,
    value: { per100g: number; perServing: number }
  ) => {
    const unit = getUnit(key);
    const bold = [
      "calories",
      "saturedFats",
      "transFat",
      "sodium",
      "addedSugar",
    ].includes(key);

    const border = ["calories", "sodium"].includes(key);

    const borderR = ["calories"].includes(key);

    return (
      <tr
        key={key}
        className={`border-b border-black px-4 ${bold ? "font-bold" : ""} ${border ? "border-b-4 border-black" : ""}`}
      >
        <td className={`py-2 pl-4 ${borderR ? "border-r border-black" : ""}`}>
          {getLabel(key)}
        </td>
        <td className="text-right pr-4">
          {value.per100g.toFixed(2)} {unit}
        </td>
        <td className="text-right pr-4">
          {value.perServing.toFixed(2)} {unit}
        </td>
      </tr>
    );
  };

  return (
    <section className="lg:w-1/2 p-10">
      <div
        id="nutritional-table"
        className="max-w-3xl mx-auto m-7 border border-black"
      >
        <h2 className="text-2xl font-bold border-b border-black text-center py-2">
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
                <th colSpan={3} className="text-left p-2 font-normal">
                  {format === "english"
                    ? `Serving Size: ${servingSize}g`
                    : format === "both"
                      ? `Tamaño de porción / Serving Size: ${servingSize}g`
                      : `Tamaño de porción: ${servingSize}g`}
                </th>
              </tr>
              <tr className="border-b-4 border-black">
                <th colSpan={3} className="text-left p-2 font-normal">
                  {format === "english"
                    ? `Servings Per Container: ${servingsPerContainer}`
                    : format === "both"
                      ? `Porciones por envase / Servings Per Container: ${servingsPerContainer}`
                      : `Porciones por envase: ${servingsPerContainer}`}
                </th>
              </tr>
              <tr>
                <th className="text-left py-2"></th>
                <th className="text-right pr-4 py-2 border-x border-b border-black font-normal">
                  {format === "english"
                    ? "Per 100g"
                    : format === "both"
                      ? "Por 100g / Per 100g"
                      : "Por 100g"}
                </th>
                <th className="text-right pr-4 py-2 font-normal border-b border-black">
                  {format === "english"
                    ? "Per Serving"
                    : format === "both"
                      ? "Por porción / Per Serving"
                      : "Por porción"}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data)
                .filter(([key]) => key !== "__v")
                .map(([key, value]) => renderRow(key, value))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={generatePDF}
        className="group relative w-full flex justify-center py-2 px-4 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00C0A3] hover:bg-[#93E9BE] hover:text-[#195e4b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93E9BE] transition ease-in"
      >
        Descargar PDF
      </button>
    </section>
  );
}
