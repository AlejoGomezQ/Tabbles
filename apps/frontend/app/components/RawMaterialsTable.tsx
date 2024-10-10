"use client";

import React, { useEffect, useState } from "react";
import { RawMaterial } from "../models/rawMaterial";
import { spanishLabels } from "../utils/spanishLabels";
import { useAuth } from "../context/AuthContext";

export default function RawMaterialsTable() {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { getAllRawMaterials } = useAuth();

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const data = await getAllRawMaterials();
        setRawMaterials(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch raw materials"
        );
      }
    };
    fetchRawMaterials();
  }, [getAllRawMaterials]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const renderValue = (value: any) => {
    if (value === undefined || value === null) {
      return "0";
    }
    if (typeof value === "number") {
      return value.toFixed(2);
    }
    return value.toString();
  };

  return (
    <section className="p-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Tabla de materias primas</h2>
      <div className="overflow-x-auto">
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {Object.entries(spanishLabels).map(([key, label]) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rawMaterials.map((rawMaterial, index) => (
                <tr key={index}>
                  {Object.keys(spanishLabels).map((key) => (
                    <td
                      key={key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {renderValue(rawMaterial[key as keyof RawMaterial])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
