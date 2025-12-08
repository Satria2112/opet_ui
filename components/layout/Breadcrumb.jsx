"use client";

import { useEffect, useState } from "react";

export default function Breadcrumb({ items = [], collapsed }) {
  const [leftOffset, setLeftOffset] = useState(null); // ⬅ awalnya null
  const [hydrated, setHydrated] = useState(false);

  /* ===================== OPET SET LEFT OFFSET ======================= */
  useEffect(() => {
    function updateLeft() {
      const width = window.innerWidth;

      if (width < 680) {
        setLeftOffset("0px");
      } else {
        setLeftOffset(collapsed ? "5rem" : "280px");
      }
    }

    updateLeft();
    setHydrated(true);

    window.addEventListener("resize", updateLeft);
    return () => window.removeEventListener("resize", updateLeft);
  }, [collapsed]);

  /* ===================== OPET AUTOHIDE SCROLLBAR ===================== */
  useEffect(() => {
    if (!hydrated) return;

    const el = document.querySelector(".slim-scroll");
    if (!el) return;

    let timeout;

    function handleScroll() {
      el.classList.add("scrolling");
      clearTimeout(timeout);
      timeout = setTimeout(() => el.classList.remove("scrolling"), 600);
    }

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [hydrated]);

  /* ===================== OPET RENDER ===================== */
  
  if (!hydrated || leftOffset === null) {
    return (
      <div
        className="fixed top-20 right-0 bg-white border-b border-gray-200 z-30"
        style={{ opacity: 0 }}
      />
    );
  }

  return (
    <div
      className="fixed top-20 right-0 bg-white border-b border-gray-200 z-30"
      style={{
        left: leftOffset,
        transition: "left 260ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="py-2.5 px-6">
        <nav
          className="
            text-[16px] text-gray-600 
            flex items-center gap-2
            whitespace-nowrap
            overflow-x-auto
            overflow-y-hidden
            slim-scroll
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((label, index) => (
            <span key={index} className="flex items-center gap-2">
              <span
                className={
                  index === items.length - 1
                    ? "text-blue-800 font-semibold"
                    : "text-[#919193]"
                }
              >
                {label}
              </span>
              {index < items.length - 1 && <span className="text-black">/</span>}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
