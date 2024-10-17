"use client";
import React from "react";
import Header from "../../components/PrincipalHeader";
import SubHeader from "../../components/SubHeader";
import RawMaterialsForm from "../../components/RawMaterialsForm";
import RawMaterialsTable from "../../components/RawMaterialsTable";
import { useState } from "react";
import FoodsForm from "../../components/FoodsForm";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("ingredients");

  return (
    <section className=" bg-[#ADD8E6]">
      <Header />
      <main className="min-h-full flex flex-col">
        <div className="overflow-hidden">
          <div className="h-[83.5vh] max-w-7xl mx-auto my-10 rounded-xl bg-white shadow-lg flex flex-col">
            <SubHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "ingredients" && (
              <>
                <RawMaterialsForm></RawMaterialsForm>
                <RawMaterialsTable></RawMaterialsTable>
              </>
            )}
            {activeTab === "foods" && (
              <>
                <FoodsForm></FoodsForm>
              </>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}
