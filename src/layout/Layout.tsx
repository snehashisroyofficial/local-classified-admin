"use client";
import React, { useState } from "react";
import Sidebar from "../components/shared/sidebar/Sidebar";
import Header from "../components/shared/header/Header";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="w-full">
        <Header setSidebarOpen={setSidebarOpen} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default LayoutProvider;
