"use client";
import React, { useState } from "react";
import Sidebar from "../components/shared/sidebar/Sidebar";
import Header from "../components/shared/header/Header";
import { usePathname } from "next/navigation";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathName = usePathname();
  const fullScreenPathNames = ["/signin"];

  if (fullScreenPathNames.includes(pathName)) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-2 lg:p-6 mb-2 lg:mb-0 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutProvider;
