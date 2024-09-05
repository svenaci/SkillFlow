import React from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
