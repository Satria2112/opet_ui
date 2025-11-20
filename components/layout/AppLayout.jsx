"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  // 🔵 STATE BREADCRUMB (UPDATE DINAMIS)
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? "5rem" : "280px";

  return (
    <>
      <Header />

      {/* Pass callback untuk update breadcrumb */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onSelectMenu={setBreadcrumb}
      />

      {/* Breadcrumb menerima state dinamis */}
      <Breadcrumb items={["Home", ...breadcrumb]} collapsed={collapsed} />

      <main
        className="pt-28 min-h-screen bg-[#eef3fa] transition-all"
        style={{
          marginLeft: sidebarWidth,
          transition: "margin-left 260ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="px-6 py-6">{children}</div>
      </main>
    </>
  );
}
