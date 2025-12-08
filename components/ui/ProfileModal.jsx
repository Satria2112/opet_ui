"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

export default function ProfileModal({ onClose, user, onShowJob }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = () => {};
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-[999] p-3 sm:p-4">
      <div
        ref={modalRef}
        className="
          bg-white rounded-lg shadow-xl animate-popup-open overflow-hidden 
          w-full 
          max-w-[822px]
        "
      >
        {/* OPET HEADER */}
        <div className="px-4 sm:px-6 py-4 border-b flex justify-between items-center bg-[#F6F6F6]">
          <span className="text-[20px] sm:text-[24px] font-semibold text-[#003D79]">
            Profil Akun
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
            px-4 sm:px-6 py-6 sm:py-8 
            flex flex-col sm:flex-row 
            gap-6 sm:gap-8
          "
        >
          {/* OPET IMAGE */}
          <div className="flex justify-center sm:block w-full sm:w-[180px]">
            <div className="rounded-full overflow-hidden border border-gray-300 
              w-[120px] h-[120px]
              sm:w-[150px] sm:h-[150px]
              mx-auto sm:mx-0
            ">
              <Image
                src="/aten.jpeg"
                width={150}
                height={150}
                alt="profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* OPET TEXT CONTENT */}
          <div
            className="
              flex-1 
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              gap-y-6 
              gap-x-8
            "
          >
            <div>
              <p className="text-[14px] font-semibold text-gray-500">Nama - NIK</p>
              <p className="text-[18px] text-gray-800">
                {user.name} - {user.nik}
              </p>
            </div>

            <div>
              <p className="text-[14px] font-semibold text-gray-500">Lokasi Bekerja</p>
              <p className="text-[18px] text-gray-800">{user.lokasiBekerja}</p>
            </div>

            <div>
              <p className="text-[14px] font-semibold text-gray-500">Jabatan</p>
              <p className="text-[18px] text-gray-800">{user.jabatan}</p>
            </div>

            <div>
              <p className="text-[14px] font-semibold text-gray-500">Email</p>
              <p className="text-[18px] text-gray-800">{user.email}</p>
            </div>

            <div>
              <p className="text-[14px] font-semibold text-gray-500 flex items-center gap-1">
                Job
                <button onClick={onShowJob}>
                  <span className="text-[16px] text-blue-600 cursor-pointer">ℹ️</span>
                </button>
              </p>
              <p className="text-[18px] text-gray-800">{user.job}</p>
            </div>

            <div>
              <p className="text-[14px] font-semibold text-gray-500">No. Telepon</p>
              <p className="text-[18px] text-gray-800">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* OPET FOOTER */}
        <div className="flex justify-end sm:justify-end bg-[#F6F6F6] px-4 sm:px-6 py-4">
          <button
            onClick={onClose}
            className="
              w-[83px] h-[36px] 
              bg-[#003D79] text-white 
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
