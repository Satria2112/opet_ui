"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("280px");
  const [breadcrumb, setBreadcrumb] = useState([]);

  const [isReady, setIsReady] = useState(false);

  /* ==========================================================
     🔥 FIX RESPONSIVE RULES (OPEETTT)
     ========================================================== */
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      // === OPET RULES ===
      if (width < 680) {
        // OPET Mobile mode
        setCollapsed(false);
        setSidebarWidth("0px");
      } else if (width < 768) {
        // OPET Tablet / collapsed desktop
        setCollapsed(true);
        setSidebarWidth("5rem");
      } else {
        // OPET Full desktop
        setCollapsed(false);
        setSidebarWidth("280px");
      }

      // OPET Auto close mobile sidebar when entering desktop
      if (width >= 680) {
        setMobileSidebarOpen(false);
      }
    }

    handleResize();
    setIsReady(true);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleToggleSidebar() {
    setCollapsed((prev) => {
      const newValue = !prev;
      setSidebarWidth(newValue ? "5rem" : "280px");
      return newValue;
    });
  }

  if (!isReady) {
    return <div className="w-full h-screen bg-[#eef3fa]" />;
  }

  return (
    <>
      {/* OPET HEADER */}
      <Header
        onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
        mobileSidebarOpen={mobileSidebarOpen}
      />

      {/* OPET SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onSelectMenu={setBreadcrumb}
        sidebarWidth={sidebarWidth}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />

      {/* OPET BREADCRUMB */}
      <Breadcrumb items={["Home", ...breadcrumb]} collapsed={collapsed} />

      {/* OPET MAIN CONTENT */}
      <main
        className="pt-28 min-h-screen bg-[#eef3fa]"
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
