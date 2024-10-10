import React from "react";

import Header from "../../components/header";
import RawMaterialsForm from "../../components/RawMaterialsForm";
import RawMaterialsTable from "../../components/RawMaterialsTable";
import SubHeader from "../../components/SubHeader";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#ADD8E6] flex flex-col">
        <div className="overflow-hidden">
          <div className="h-screen max-w-6xl mx-auto my-10 rounded-xl bg-white shadow-lg flex flex-col">
            <SubHeader />
            <RawMaterialsForm />
            <RawMaterialsTable />
          </div>
        </div>
      </main>
    </>
  );
}
