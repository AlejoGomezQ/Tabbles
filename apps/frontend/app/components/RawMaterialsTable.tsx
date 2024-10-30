"use client";

import PopUp from "./PopUp";
import React, { useCallback, useEffect, useState } from "react";
import RawMaterialsForm from "./RawMaterialsForm";
import { RawMaterial } from "../models/rawMaterial";
import { spanishLabels } from "../utils/spanishLabels";
import { useAuth } from "../context/AuthContext";
import { Trash2 } from "lucide-react";
import { Edit } from "lucide-react";

export default function RawMaterialsTable() {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllRawMaterials, deleteRawMaterial } = useAuth();

  const fetchRawMaterials = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllRawMaterials();
      setRawMaterials(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch raw materials"
      );
    } finally {
      setIsLoading(false);
    }
  }, [getAllRawMaterials]);

  useEffect(() => {
    fetchRawMaterials();
  }, [getAllRawMaterials]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteRawMaterial(id);
        await getAllRawMaterials();
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to delete raw material"
        );
      }
    },
    [deleteRawMaterial]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    <section className="overflow-y-auto p-8 border-t rounded-bl-xl">
      <h2 className="text-2xl font-bold mb-6">Tabla de materias primas</h2>
      <div className="overflow-x-auto">
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="hidden">Acciones</span>
                </th>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        rawMaterial.id && handleDelete(rawMaterial.id)
                      }
                      className="text-red-600 hover:text-red-900 transition-colors duration-200 flex items-center"
                    >
                      <Trash2 className="w-5 h-5 mr-1 mb-1 cursor-pointer" />
                      <span className="hidden">Eliminar</span>
                    </button>

                    <PopUp
                      trigger={
                        <Edit className="w-5 h-5 mr-1 cursor-pointer"></Edit>
                      }
                    >
                      <RawMaterialsForm DefaulRawMaterial={rawMaterial} FormName="Modificar Materia Prima" OnSubmit="update"></RawMaterialsForm>
                    </PopUp>
                  </td>
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
