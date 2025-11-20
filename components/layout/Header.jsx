import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full flex items-center">

        {/* LEFT LOGO AREA */}
        <div className="w-64 px-6 h-full flex items-center">
          <Image
            src="/logo.png"
            alt="MUF Logo"
            width={120}
            height={52}
            className="object-contain"
          />
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* HOME ICON (WITH LEFT BORDER) */}
        <div className="h-full border-l border-gray-200 px-8 flex items-center justify-center">
          <button aria-label="home" className="hover:opacity-70">
            <svg className="w-6 h-6 text-[#00356b]" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 11.25L12 4l9 7.25V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.25z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* NOTIF ICON (WITH LEFT BORDER) */}
        <div className="h-full border-l border-gray-200 px-8 flex items-center justify-center relative">
          <button aria-label="notifications" className="hover:opacity-70">
            <svg className="w-6 h-6 text-[#00356b]" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M13.73 21a2 2 0 01-3.46 0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* BADGE */}
          <span className="absolute top-3 right-6 bg-red-600 text-white text-[10px] px-1.5 rounded-full font-bold leading-none">
            10
          </span>
        </div>

        {/* USERNAME AREA (WITH LEFT BORDER) */}
        <div className="h-full border-l border-gray-200 px-8 flex items-center gap-2 cursor-pointer select-none">

          <span className="text-[#00356b] text-sm tracking-wide">
            OPET
          </span>

          <svg className="w-4 h-4 text-[#00356b]" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.02 1.1l-4.22 3.96a.75.75 0 01-1.02 0L5.25 8.29a.75.75 0 01-.02-1.08z"
              clipRule="evenodd"
            />
          </svg>

        </div>
      </div>
    </header>
  );
}
