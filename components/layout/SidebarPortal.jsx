"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function SidebarPortal({ children }) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    setTarget(document.getElementById("sidebar-flyout-root"));
  }, []);

  if (!target) return null;

  return createPortal(children, target);
}
