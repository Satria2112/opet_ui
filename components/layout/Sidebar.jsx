"use client";

import React, { useState } from "react";
import SidebarPortal from "./SidebarPortal";

/* ================= ICON SET ================= */
const Icon = ({ name }) => {
  const stroke = "currentColor";
  const w = 1.6;

  const icons = {
    master: (
      <path d="M3 6h18M3 12h18M3 18h18" stroke={stroke} strokeWidth={w} />
    ),
    id: (
      <>
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
          stroke={stroke}
          strokeWidth={w}
        />
        <circle cx="9" cy="10" r="2" stroke={stroke} strokeWidth={w} />
      </>
    ),
    cams: <path d="M21 7l-6 2-2-2-4 2-6-1" stroke={stroke} strokeWidth={w} />,
    petty: (
      <>
        <path d="M4 7h16v10H4z" stroke={stroke} strokeWidth={w} />
        <path d="M9 12h6" stroke={stroke} strokeWidth={w} />
      </>
    ),
    cost: (
      <>
        <path d="M12 3v18" stroke={stroke} strokeWidth={w} />
        <path d="M17 7H9a4 4 0 000 8h6" stroke={stroke} strokeWidth={w} />
      </>
    ),
    promo: (
      <>
        <path d="M4 12h16" stroke={stroke} strokeWidth={w} />
        <path d="M12 4v16" stroke={stroke} strokeWidth={w} />
      </>
    ),
    entertain: (
      <>
        <circle cx="8" cy="12" r="3" stroke={stroke} strokeWidth={w} />
        <circle cx="16" cy="12" r="3" stroke={stroke} strokeWidth={w} />
      </>
    ),
    kasbon: (
      <>
        <path d="M4 6h16v12H4z" stroke={stroke} strokeWidth={w} />
        <path d="M8 10h8" stroke={stroke} strokeWidth={w} />
      </>
    ),
    fund: (
      <>
        <path d="M3 12h18" stroke={stroke} strokeWidth={w} />
        <path d="M6 8v8" stroke={stroke} strokeWidth={w} />
        <path d="M18 8v8" stroke={stroke} strokeWidth={w} />
      </>
    ),
    monitor: (
      <>
        <rect
          x="3"
          y="4"
          width="18"
          height="12"
          rx="2"
          stroke={stroke}
          strokeWidth={w}
        />
        <path d="M8 20h8" stroke={stroke} strokeWidth={w} />
      </>
    ),
    todo: <path d="M4 7h16M4 12h10" stroke={stroke} strokeWidth={w} />,
    report: (
      <>
        <path d="M4 6h16v12H4z" stroke={stroke} strokeWidth={w} />
        <path d="M8 10h8" stroke={stroke} strokeWidth={w} />
      </>
    ),
    arrow: <path d="M9 6l6 6-6 6" stroke={stroke} strokeWidth="1.8" />,
  };

  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

/* ================= MENU ROW ================= */
function MenuRow({
  iconName,
  label,
  collapsed,
  open,
  onClick,
  hasChildren,
  onSelectMenu,
}) {
  const [hover, setHover] = useState(false);
  const [posY, setPosY] = useState(0);
  const [rowHeight, setRowHeight] = useState(48);

  return (
    <div
      className="relative"
      onMouseEnter={(e) => {
        if (!collapsed) return;
        setHover(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setRowHeight(rect.height);
        setPosY(rect.top + rect.height / 2);
      }}
      onMouseLeave={() => collapsed && setHover(false)}
    >
      <li
        onClick={() => {
          // 🔵 Kalau collapsed → langsung set breadcrumb
          if (collapsed) {
            onSelectMenu?.([label]);
            return;
          }

          // 🔵 Jika tidak collapsed → klik normal (toggle submenu)
          onClick?.();

          // 🔵 Jika tidak punya children → breadcrumb langsung update
          if (!hasChildren) {
            onSelectMenu?.([label]);
          }
        }}
        className={`
          flex items-center cursor-pointer transition-all
          h-12
          ${
            collapsed
              ? "justify-center hover:bg-[#002b59]"
              : "px-6 py-3 justify-between hover:bg-[#002b59]"
          }
        `}
      >
        <div
          className={`flex items-center text-white/95 ${
            collapsed ? "justify-center w-full" : "gap-4"
          }`}
        >
          <Icon name={iconName} />
          {!collapsed && (
            <span className="text-[12px] font-medium text-[#FEFDFA]">
              {label}
            </span>
          )}
        </div>

        {!collapsed && hasChildren && (
          <div className={`transition-transform ${open ? "rotate-90" : ""}`}>
            <Icon name="arrow" />
          </div>
        )}
      </li>

      {collapsed && hover && (
        <SidebarPortal>
          <div
            className="
              fixed px-4 bg-[#004080]
              text-white text-sm flex items-center
              rounded-tr-lg rounded-br-lg
              shadow-[0_4px_16px_rgba(0,0,0,0.25)]
              whitespace-nowrap animate-flyout
            "
            style={{
              top: posY,
              left: "5rem",
              height: rowHeight,
              transform: "translateY(-50%)",
              zIndex: 9999,
            }}
          >
            {label}
          </div>
        </SidebarPortal>
      )}
    </div>
  );
}

/* ================= SIDEBAR ================= */
export default function Sidebar({ collapsed, setCollapsed, onSelectMenu }) {
  const [openMenus, setOpenMenus] = useState([]);

  const toggleMenu = (key, label) => {
    if (collapsed) return;

    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );

    onSelectMenu([label]);
  };

  return (
    <nav
      className="fixed top-16 left-0 bg-[#00356b] text-white z-40 flex flex-col overflow-hidden"
      style={{
        width: collapsed ? "5rem" : "280px", // 🔥 width baru
        height: collapsed ? "760px" : "760px", // 🔥 height fix
        transition: "width 250ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* HEADER */}
      <div
        className="pt-5 pb-2 transition-all"
        style={{
          paddingInline: collapsed ? "0" : "1.5rem",
          opacity: collapsed ? 0 : 1,
        }}
      >
        {!collapsed && (
          <div className="text-[18px] font-semibold text-[#FEFDFA] leading-[1.2] tracking-wide">
            CASH AND ASSET MANAGEMENT SYSTEM
          </div>
        )}
      </div>

      {/* MENU LIST */}
      <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 overflow-x-hidden">
        <ul className="mt-2 pb-6 select-none">
          {/* MASTER PARAMETER */}
          <MenuRow
            iconName="master"
            label="Master Parameter"
            collapsed={collapsed}
            hasChildren
            open={openMenus.includes("master")}
            onClick={() => toggleMenu("master", "Master Parameter")}
            onSelectMenu={onSelectMenu}
          />

          {!collapsed && (
            <div
              className="overflow-hidden bg-[#002b59]"
              style={{
                maxHeight: openMenus.includes("master") ? "180px" : "0px",
                transition: "max-height 260ms",
              }}
            >
              <ul className="pl-12 py-2 space-y-2 text-sm">
                <li
                  className="text-white/80 hover:text-white cursor-pointer"
                  onClick={() =>
                    onSelectMenu(["Master Parameter", "Submenu A"])
                  }
                >
                  Submenu A
                </li>
                <li
                  className="text-white/80 hover:text-white cursor-pointer"
                  onClick={() =>
                    onSelectMenu(["Master Parameter", "Submenu B"])
                  }
                >
                  Submenu B
                </li>
              </ul>
            </div>
          )}

          {/* STATIC MENUS */}
          <MenuRow
            iconName="id"
            label="Penambahan ID Transaksi"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />
          <MenuRow
            iconName="cams"
            label="CAMS"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />
          <MenuRow
            iconName="petty"
            label="Petty Cash"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />

          {/* BIAYA UMUM TREE */}
          <MenuRow
            iconName="cost"
            label="Biaya Umum"
            collapsed={collapsed}
            hasChildren
            open={openMenus.includes("cost")}
            onClick={() => toggleMenu("cost", "Biaya Umum")}
            onSelectMenu={onSelectMenu}
          />

          {!collapsed && (
            <div
              className="overflow-hidden bg-[#002b59]"
              style={{
                maxHeight: openMenus.includes("cost") ? "160px" : "0px",
                transition: "max-height 260ms",
              }}
            >
              <ul className="pl-12 py-2 space-y-2 text-sm">
                <li
                  className="text-white/80 hover:text-white cursor-pointer"
                  onClick={() => onSelectMenu(["Biaya Umum", "Realisasi"])}
                >
                  Realisasi
                </li>
                <li
                  className="text-white/80 hover:text-white cursor-pointer"
                  onClick={() => onSelectMenu(["Biaya Umum", "Approval"])}
                >
                  Approval
                </li>
              </ul>
            </div>
          )}

          {/* MORE MENUS */}
          <MenuRow
            iconName="promo"
            label="Promosi"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />
          <MenuRow
            iconName="entertain"
            label="Entertain"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />
          <MenuRow
            iconName="kasbon"
            label="Realisasi Kasbon"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />
          <MenuRow
            iconName="fund"
            label="Fund Transaction"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />
          {/* <MenuRow
            iconName="monitor"
            label="Monitoring Request"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />
          <MenuRow
            iconName="todo"
            label="To Do List"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          />
          <MenuRow
            iconName="report"
            label="Report"
            collapsed={collapsed}
            onSelectMenu={onSelectMenu}
          /> */}
        </ul>
      </div>

      {/* TOGGLE BUTTON */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => {
            setOpenMenus([]);
            setCollapsed(!collapsed);
          }}
          className="w-full p-2 rounded-md hover:bg-[#002b59] flex justify-center"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="white"
              strokeWidth="1.7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
