"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import NotificationModal from "@/components/ui/NotificationModal";
import ProfileModal from "@/components/ui/ProfileModal";
import JobModal from "@/components/ui/JobModal";
import { IAM } from "@/constants/iam";

export default function Header({ onToggleMobileSidebar, mobileSidebarOpen }) {
  const [showNotifDesktop, setShowNotifDesktop] = useState(false);
  const [showNotifMobile, setShowNotifMobile] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMore, setShowMobileMore] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);

  const notifRefDesktop = useRef(null);
  const notifRefMobile = useRef(null);
  const dropdownRefDesktop = useRef(null);
  const mobileMoreRef = useRef(null);

  const userData = IAM.user;
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    if (showProfile || showJobModal) {
      setShowDropdown(false);
      setShowMobileMore(false);
    }
  }, [showProfile, showJobModal]);

  /* OPET AUTO SWITCH NOTIF MOBILE → DESKTOP when resizing */
  useEffect(() => {
    function handleResize() {
      const isDesktop = window.innerWidth >= 680;

      if (isDesktop && showNotifMobile) {
        setShowNotifMobile(false);
        setShowNotifDesktop(true);
      }
      if (!isDesktop && showNotifDesktop) {
        setShowNotifDesktop(false);
        setShowNotifMobile(true);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showNotifMobile, showNotifDesktop]);

  /* OPET CLICK OUTSIDE DESKTOP ELEMENTS */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        notifRefDesktop.current &&
        !notifRefDesktop.current.contains(e.target)
      ) {
        setShowNotifDesktop(false);
      }

      if (
        dropdownRefDesktop.current &&
        !dropdownRefDesktop.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }

      if (mobileMoreRef.current && !mobileMoreRef.current.contains(e.target)) {
        setShowMobileMore(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // OPET For spin icon toogel
  useEffect(() => {
    setRotating(true);
    const t = setTimeout(() => setRotating(false), 400);

    return () => clearTimeout(t);
  }, [mobileSidebarOpen]);

  /* OPET CLOSE MOBILE NOTIF ON OUTSIDE CLICK */
  useEffect(() => {
    if (!showNotifMobile) return;

    function handleClickOutside(e) {
      if (
        notifRefMobile.current &&
        !notifRefMobile.current.contains(e.target)
      ) {
        setShowNotifMobile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifMobile]);

  return (
    <header className="fixed top-0 left-0 right-0 h-[80px] bg-white border-b border-gray-200 z-50">
      {/* ===================== OPET DESKTOP HEADER (>680px) ===================== */}
      <div className="h-full hidden min-[680px]:flex items-center">
        <div className="w-64 px-6 h-full flex items-center">
          <Image src="/logo.png" alt="logo" width={120} height={52} />
        </div>

        <div className="flex-1" />

        {/* OPET HOME */}
        <div className="h-full border-l border-gray-200 px-8 flex items-center">
          <Image src="/home.svg" width={22} height={22} alt="home" />
        </div>

        {/* OPET DESKTOP NOTIF */}
        <div
          ref={notifRefDesktop}
          className="h-full border-l border-gray-200 px-8 flex items-center relative"
        >
          <button onClick={() => setShowNotifDesktop((prev) => !prev)}>
            <Image
              className="cursor-pointer"
              src="/notif.svg"
              width={20}
              height={20}
              alt="notif"
            />
          </button>

          <span
            onClick={() => setShowNotifDesktop((prev) => !prev)}
            className="absolute top-7 right-7 bg-red-700 text-white text-[10px]
            w-[14px] h-[14px] rounded-full flex items-center justify-center cursor-pointer"
          >
            10
          </span>

          {showNotifDesktop && (
            <div
              className="
                fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]
                min-[680px]:absolute 
                min-[680px]:top-[70px] 
                min-[680px]:right-0 
                min-[680px]:left-auto 
                min-[680px]:translate-x-0 
                min-[680px]:translate-y-0
              "
            >
              <NotificationModal onClose={() => setShowNotifDesktop(false)} />
            </div>
          )}
        </div>

        {/* OPET DESKTOP DROPDOWN */}
        <div
          ref={dropdownRefDesktop}
          className="h-full border-l border-gray-200 px-8 flex items-center gap-2 cursor-pointer relative"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <div className="flex flex-col">
            <span className="text-[#00356b] font-medium truncate max-w-[140px]">
              {userData.name}
            </span>
            <span className="text-xs text-[#00356b] max-w-[180px]">
              {userData.nik} -
              <span className="truncate max-w-[120px]">{userData.job}</span>
            </span>
          </div>

          <svg
            width="20"
            height="20"
            fill="none"
            stroke="#00356b"
            strokeWidth="2"
          >
            <path d="M5 7l5 5 5-5" />
          </svg>

          {showDropdown && (
            <div
              className="
                absolute top-[70px] right-8 
                w-[180px] bg-white rounded-xl 
                shadow-2xl border border-gray-100 
                py-2 z-[1000] animate-fadeIn
              "
            >
              {/* OPET PROFILE */}
              <button
                onClick={() => setShowProfile(true)}
                className="
                  w-full px-4 py-3 flex items-center gap-3 
                  text-[14px] text-gray-700 
                  hover:bg-gray-100 transition rounded-md
                "
              >
                <Image src="/person.svg" width={18} height={18} alt="profile" />
                <span>Profile</span>
              </button>

              {/* OPET LOGOUT */}
              <button
                className="
                  w-full px-4 py-3 flex items-center gap-3
                  text-[14px] text-gray-700 
                  hover:bg-gray-100 transition rounded-md
                "
              >
                {/* <Image src="/logout.svg" width={18} height={18} alt="logout" /> */}
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===================== OPET MOBILE HEADER (<680px) ===================== */}
      <div className="h-full flex min-[680px]:hidden items-center justify-between px-4">
        {/* MENU */}
        <button
          className="w-7 h-7 flex flex-col justify-center gap-[3px] cursor-pointer"
          onClick={onToggleMobileSidebar}
        >
          <img
            src={mobileSidebarOpen ? "/exitfullscreen.svg" : "/fullscreen.svg"}
            alt="toggle"
            className={`w-6 h-6 transition-all ${rotating ? "spin-once" : ""}`}
          />
        </button>

        {/* OPET LOGO */}
        <Image src="/logo.png" width={100} height={40} alt="logo" />

        {/* OPET MORE */}
        <button
          ref={mobileMoreRef}
          onClick={() => setShowMobileMore((p) => !p)}
          className="cursor-pointer"
        >
          <img
            src="/more_horiz.svg"
            alt="more"
            className="w-6 h-6 object-contain"
          />
        </button>

        {/* OPET MOBILE MENU */}
        {showMobileMore && (
          <div className="absolute right-4 top-[70px] w-[230px] bg-white rounded-xl shadow-2xl border border-gray-100 z-[999] overflow-hidden animate-fadeIn">
            {/* OPET USER HEADER */}
            <div className="flex items-center gap-3 px-4 py-4 bg-gray-50">
              <Image
                src="/aten.jpeg"
                alt="profile"
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] text-[#00356b] leading-tight">
                  {userData.name}
                </span>
                <span className="text-[12px] text-gray-500 truncate max-w-[130px]">
                  {userData.email}
                </span>
              </div>
            </div>

            {/* OPET MENU LIST */}
            <div className="flex flex-col py-2">
              <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition rounded-md mx-2 text-[14px] text-gray-700">
                <Image src="/home.svg" width={20} height={20} alt="home" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  setShowMobileMore(false);
                  setShowNotifMobile(true);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition rounded-md mx-2 text-[14px] text-gray-700"
              >
                <Image
                  src="/notifications.svg"
                  width={20}
                  height={20}
                  alt="notifications"
                />
                <span>Notification</span>
              </button>

              <button
                onClick={() => {
                  setShowMobileMore(false);
                  setShowProfile(true);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition rounded-md mx-2 text-[14px] text-gray-700"
              >
                <Image src="/person.svg" width={20} height={20} alt="profile" />
                <span>Profile</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition rounded-md mx-2 text-[14px] text-gray-700">
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* OPET MOBILE NOTIFICATION MODAL */}
      {showNotifMobile && (
        <div
          ref={notifRefMobile}
          className="
            fixed left-1/2 top-1/2 
            -translate-x-1/2 -translate-y-1/2 
            z-[999]
          "
        >
          <NotificationModal onClose={() => setShowNotifMobile(false)} />
        </div>
      )}

      {/* OPET PROFILE MODAL */}
      {showProfile && (
        <ProfileModal
          user={userData}
          onClose={() => setShowProfile(false)}
          onShowJob={() => {
            setShowProfile(false);
            setShowJobModal(true);
          }}
        />
      )}

      {/* OPET JOB MODAL */}
      {showJobModal && (
        <JobModal
          jobList={userData.jobList}
          onClose={() => {
            setShowJobModal(false);
            setShowProfile(false);
          }}
          onBack={() => {
            setShowJobModal(false);
            setShowProfile(true);
          }}
        />
      )}
    </header>
  );
}
