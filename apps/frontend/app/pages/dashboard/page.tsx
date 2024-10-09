import React from "react";

import Header from "../../components/header";
import IngredientsForm from "../../components/IngredientsForm";
import IngredientsTable from "../../components/IngredientsTable";
import SubHeader from "../../components/SubHeader";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="h-full bg-[#ADD8E6] flex flex-col">
        <div className="flex-grow overflow-hidden">
          <div className="h-full max-w-6xl mx-auto my-10 rounded-xl bg-white shadow-lg flex flex-col">
            <SubHeader />
            <IngredientsForm />
            <IngredientsTable />
          </div>
        </div>
      </main>
    </>
  );
}
