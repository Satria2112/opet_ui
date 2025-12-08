"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function JobModal({ onClose, onBack, jobList }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = () => {};
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[999] p-4">
      <div
        ref={modalRef}
        className="
          bg-white rounded-lg shadow-xl animate-popup-open
          w-full max-w-[650px]
          flex flex-col
          max-h-[85vh]   /* ⬅️ modal tidak lebih dari 85% tinggi layar */
          overflow-hidden
        "
      >
        {/* OPET HEADER */}
        <div className="px-4 sm:px-6 py-4 border-b flex justify-between items-center bg-[#F6F6F6]">
          <span className="text-[20px] sm:text-[22px] font-semibold text-[#003D79]">
            Detail Job
          </span>

          <button onClick={onClose}>
            <Image
              src="/close.svg"
              width={14}
              height={14}
              alt="close"
              className="cursor-pointer"
            />
          </button>
        </div>

        {/* OPET CONTENT */}
        <div
          className="
            p-4 sm:p-6
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            gap-4
            overflow-y-auto scrolljob
          "
        >
          {jobList.map((job, i) => (
            <div
              key={i}
              className="
                bg-gray-100 
                text-gray-700 
                rounded-md 
                px-3 py-2 
                text-center 
                text-[14px] 
                border 
                border-gray-200
                select-none
              "
            >
              {job}
            </div>
          ))}
        </div>

        {/* OPET FOOTER */}
        <div className="flex justify-end bg-[#F6F6F6] px-4 sm:px-6 py-4">
          <button
            onClick={onBack}
            className="
              w-[83px] h-[36px]
              bg-[#003D79] 
              text-white 
              rounded-md 
              hover:bg-[#002a5c] 
              text-[14px]
              cursor-pointer
            "
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
