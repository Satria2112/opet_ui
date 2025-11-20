"use client";

export default function Breadcrumb({ items = [], collapsed }) {
  return (
    <div
      className="fixed top-16 right-0 bg-white border-b border-gray-200 z-30"
      style={{
        left: collapsed ? "5rem" : "280px",
        transition: "left 260ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="py-2.5 px-6">
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          {items.map((label, index) => (
            <span key={index} className="flex items-center gap-2">
              <span
                className={
                  index === items.length - 1
                    ? "text-blue-800 font-semibold"
                    : "text-gray-400"
                }
              >
                {label}
              </span>

              {index < items.length - 1 && (
                <span className="text-gray-300">/</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
