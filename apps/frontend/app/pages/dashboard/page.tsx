"use client";
import React from "react"
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader"
import RawMaterialsForm from "../../components/RawMaterialsForm"
import RawMaterialsTable from "../../components/RawMaterialsTable"
import { useState } from "react";
import FoodsForm from "../../components/FoodsForm";

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState("ingredients");

    return (
        <section>
        <Header />
        <main className="min-h-screen bg-[#ADD8E6] flex flex-col">
            <div className="overflow-hidden">
                <div className="h-screen max-w-7xl mx-auto my-10 rounded-xl bg-white shadow-lg flex flex-col">
                    <SubHeader
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} />
                    {activeTab === "ingredients" && <><RawMaterialsForm></RawMaterialsForm> 
                      <RawMaterialsTable></RawMaterialsTable></>}
                    {activeTab === "foods"  && <><FoodsForm></FoodsForm></>}
                </div>
            </div>
        </main>
        </section>)
  }