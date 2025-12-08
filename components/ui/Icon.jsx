"use client";

export default function Icon({ name, className = "w-5 h-5" }) {
  const stroke = "currentColor";
  const w = 1.6;

  const icons = {
    master: <path d="M3 6h18M3 12h18M3 18h18" stroke={stroke} strokeWidth={w} />,

    id: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke={stroke} strokeWidth={w} />
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
        <rect x="3" y="4" width="18" height="12" rx="2" stroke={stroke} strokeWidth={w} />
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

    dot: <circle cx="6" cy="6" r="2" />,

    folder: <path d="M3 6h6l2 2h10v10H3z" stroke={stroke} strokeWidth={w} />,

    folderOpen: (
      <>
        <path d="M3 6h6l2 2h10v3H3z" stroke={stroke} strokeWidth={w} />
        <path d="M3 11h18l-2 7H5z" stroke={stroke} strokeWidth={w} />
      </>
    ),

    file: (
      <>
        <rect x="5" y="4" width="14" height="16" rx="2" stroke={stroke} strokeWidth={w} />
        <path d="M9 4v4h6" stroke={stroke} strokeWidth={w} />
      </>
    ),
  };

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden>
      {icons[name]}
    </svg>
  );
}
