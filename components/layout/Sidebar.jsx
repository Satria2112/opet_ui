"use client";

import React, { useState } from "react";
import SidebarPortal from "./SidebarPortal";
import { IAM } from "@/constants/iam";
import Icon from "@/components/ui/Icon";

/* ================= OPET RECURSIVE SUBMENU ================= */
function SubMenuList({
  items,
  activePath,
  activatePath,
  level = 1,
  parentPath = [],
}) {
  const [openLocal, setOpenLocal] = useState([]);

  const toggle = (key) => {
    setOpenLocal((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <ul className="m-0 p-0">
      {items.map((item) => {
        const currentPath = [...parentPath, item.label];
        const isActive = activePath.join("/") === currentPath.join("/");
        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;
        const isOpen = openLocal.includes(item.key);

        return (
          <li key={item.key}>
            <div
              onClick={(e) => {
                e.stopPropagation();

                activatePath(currentPath);

                if (hasChildren) toggle(item.key);
              }}
              className={`group w-full flex items-center cursor-pointer gap-3 h-[47px] m-0 p-0
              transition-all duration-150
              ${
                isActive
                  ? "bg-[#001D56] scale-[1.03]"
                  : "hover:bg-[#001D56] hover:scale-[1.03] hover:opacity-95"
              }`}
              style={{
                paddingLeft: `${3.8 + (level - 1) * 1.7}rem`,
                paddingRight: "1rem",
              }}
            >
              {/* OPET Tree Icons */}
              {hasChildren ? (
                <Icon
                  name={isOpen ? "folderOpen" : "folder"}
                  className="w-4 h-4"
                />
              ) : (
                <Icon name="file" className="w-3 h-3" />
              )}

              <span
                className={`text-sm ${
                  isActive ? "text-white" : "text-white/90"
                }`}
              >
                {item.label}
              </span>

              {hasChildren && (
                <span
                  className={`ml-auto transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  <Icon name="arrow" className="w-3 h-3" />
                </span>
              )}
            </div>

            {/* Render children */}
            <div
              className="overflow-hidden transition-all duration-400 ease-in-out"
              style={{
                maxHeight: isOpen ? "500px" : "0px",
              }}
            >
              {hasChildren && (
                <SubMenuList
                  items={item.children}
                  activePath={activePath}
                  activatePath={activatePath}
                  parentPath={currentPath}
                  level={level + 1}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ================= OPET PARENT MENU ROW =================*/
function MenuRow({
  iconName,
  label,
  collapsed,
  open,
  onClick,
  hasChildren,
  onActivate,
  isActive,
}) {
  const [hover, setHover] = useState(false);
  const [posY, setPosY] = useState(0);
  const [rowHeight, setRowHeight] = useState(48);

  return (
    <div
      className="relative w-full"
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
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          if (collapsed) {
            onActivate([label]);
            return;
          }
          onClick?.();
          onActivate([label]);
        }}
        className={`
          group w-full flex items-center cursor-pointer h-[47px] m-0 p-0
          transition-all duration-150 ease-in-out
          ${
            isActive
              ? "bg-[#001D56] scale-[1.03]"
              : "hover:bg-[#001D56]/80 hover:scale-[1.03] hover:opacity-90"
          }
        `}
      >
        <div
          className={`flex items-center text-white/95 w-full ${
            collapsed ? "justify-center" : "justify-between px-6"
          }`}
        >
          <div className={`flex items-center ${collapsed ? "" : "gap-4"}`}>
            <Icon
              name={iconName}
              className={`
                w-5 h-5
                transition-all duration-500 ease-in-out
                ${
                  collapsed
                    ? "group-hover:scale-110 group-hover:rotate-[360deg]"
                    : ""
                }
              `}
            />

            {!collapsed && (
              <span
                className={`text-[12px] font-medium ${
                  isActive ? "text-white" : "text-[#FEFDFA]"
                }`}
                style={{ letterSpacing: 0.2 }}
              >
                {label}
              </span>
            )}
          </div>

          {!collapsed && hasChildren && (
            <div
              className={`pr-2 ${open ? "rotate-90" : ""} transition-transform`}
            >
              <Icon name="arrow" />
            </div>
          )}
        </div>
      </li>

      {/* OPET flyout when collapsed */}
      {collapsed && hover && (
        <SidebarPortal>
          <div
            className="fixed px-4 bg-[#003D79] text-white text-sm flex items-center shadow-[0_4px_16px_rgba(0,0,0,0.16)] whitespace-nowrap"
            style={{
              top: posY,
              left: "5.2rem",
              height: rowHeight,
              transform: "translateY(-50%)",
              zIndex: 9999,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              transition:
                "opacity 180ms ease, transform 180ms cubic-bezier(.2,.9,.2,1)",
            }}
          >
            <div className="flex items-center gap-3">
              <Icon name={iconName} className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </div>
          </div>
        </SidebarPortal>
      )}
    </div>
  );
}

/* ================= OPET MAIN SIDEBAR ================= */
export default function Sidebar({
  collapsed,
  // setCollapsed,
  onSelectMenu,
  sidebarWidth,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  onToggleSidebar,
}) {
  const menuItems = IAM.menu;
  const [openMenus, setOpenMenus] = useState([]);
  const [activePath, setActivePath] = useState(["Home"]);

  // OPET set active path and notify parent
  const activatePath = (pathArray) => {
    setActivePath(pathArray);
    onSelectMenu?.(pathArray);
  };

  // OPET toggle parent accordion
  const toggleMenu = (key, label, isMobile = false) => {
    const setMenuList = isMobile ? setOpenMenusMobile : setOpenMenus;

    setMenuList((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

    activatePath([label]);
  };

  const isParentActive = (label) => activePath && activePath[0] === label;
  const [openMenusMobile, setOpenMenusMobile] = useState([]); // mobile

  return (
    <>
      <nav
        className={`fixed top-20 left-0 bg-[#003D79] text-white z-40 flex flex-col overflow-hidden transition-all duration-150 ease-in-out`}
        style={{
          width: sidebarWidth,
          opacity: sidebarWidth === "0px" ? 0 : 1,
          transform:
            sidebarWidth === "0px" ? "translateX(-20px)" : "translateX(0)",
          height: "calc(100vh - 5rem)",
        }}
      >
        {/* OPET HEADER */}
        <div
          className="pt-[16px] pb-[16px] transition-all"
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

        {/* OPET MENU LIST */}
        <div className="flex-1 overflow-y-auto sidebar-scroll overflow-x-hidden">
          <ul className="mt-2 pb-6 select-none m-0 p-0">
            {menuItems.map((m) => (
              <React.Fragment key={m.key}>
                {/* OPET parent row */}
                <MenuRow
                  iconName={m.icon}
                  label={m.label}
                  collapsed={collapsed}
                  hasChildren={!!m.children}
                  open={openMenus.includes(m.key)}
                  onClick={() => toggleMenu(m.key, m.label, false)}
                  onActivate={(path) => activatePath(path)}
                  isActive={isParentActive(m.label)}
                />

                {!collapsed && m.children && (
                  <div
                    className="overflow-hidden bg-[#003D79] transition-all duration-400 ease-in-out"
                    style={{
                      maxHeight: openMenus.includes(m.key) ? "400px" : "0px",
                      opacity: openMenus.includes(m.key) ? 1 : 0,
                    }}
                  >
                    <div className="py-0">
                      <SubMenuList
                        items={m.children}
                        activePath={activePath}
                        activatePath={activatePath}
                        parentPath={[m.label]}
                        level={1}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>

        {/* OPET TOGGLE BUTTON */}
        <div
          className="border-t border-white/10 flex items-center"
          style={{
            width: collapsed ? "5rem" : "280px",
            height: "52px",
            transition: "width 250ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-end"
            } w-full h-full px-4`}
          >
            {/* OPET FIXED WRAPPER */}
            <div
              onClick={() => {
                setOpenMenus([]);
                onToggleSidebar();
              }}
              className="
                w-[20px] h-[20px]
                flex items-center justify-center
                cursor-pointer
                transition-transform duration-500 ease-in-out
                hover:scale-125
              "
            >
              {/* OPET ICON — DIFFERENT SIZE FIX */}
              <img
                src={collapsed ? "/maximize.svg" : "/minimize.svg"}
                alt="toggle sidebar"
                className={`
                object-contain
                transition-transform duration-500 ease-in-out

                ${
                  collapsed
                    ? "w-[20px] h-[20px] rotate-[360deg]"
                    : "w-[10px] h-[10px] scale-[1.35] rotate-0"
                }
              `}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* =================== OPET MOBILE SIDEBAR =================== */}
      {mobileSidebarOpen && (
        <div
          className="
            fixed top-20 left-0 right-0 bottom-0 
            bg-black/40 z-[9998] md:hidden 
            transition-opacity duration-200
          "
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <nav
        className={`
          fixed top-20 left-0 bg-[#003D79] text-white z-[9999]
          flex flex-col overflow-hidden 
          w-[280px] h-[calc(100vh-5rem)]
          transition-transform duration-200 ease-in-out
          md:hidden
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* OPET HEADER */}
        <div className="pt-[16px] pb-[16px] transition-all px-6">
          <div className="text-[18px] font-semibold text-[#FEFDFA] leading-[1.2] tracking-wide">
            CASH AND ASSET MANAGEMENT SYSTEM
          </div>
        </div>

        {/* OPET MENU LIST — EXACT SAME WITH DESKTOP */}
        <div className="flex-1 overflow-y-auto sidebar-scroll overflow-x-hidden">
          <ul className="mt-2 pb-6 select-none m-0 p-0">
            {menuItems.map((m) => (
              <React.Fragment key={m.key}>
                {/* OPET parent row */}
                <MenuRow
                  iconName={m.icon}
                  label={m.label}
                  collapsed={false}
                  hasChildren={!!m.children}
                  open={openMenusMobile.includes(m.key)}
                  onClick={() => toggleMenu(m.key, m.label, true)}
                  onActivate={(path) => activatePath(path)}
                  isActive={isParentActive(m.label)}
                />

                {/* OPET children submenu */}
                {m.children && (
                  <div
                    className="overflow-hidden bg-[#003D79] transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: openMenusMobile.includes(m.key)
                        ? "400px"
                        : "0px",
                      opacity: openMenusMobile.includes(m.key) ? 1 : 0,
                    }}
                  >
                    <div className="py-0">
                      <SubMenuList
                        items={m.children}
                        activePath={activePath}
                        activatePath={activatePath}
                        parentPath={[m.label]}
                        level={1}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
