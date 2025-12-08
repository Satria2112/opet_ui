"use client";

import React, { useState } from "react";
import Image from "next/image";
import { notificationTabs, dummyNoData } from "@/constants/notificationData";

export default function NotificationModal({ onClose }) {
  const [activeTab, setActiveTab] = useState(notificationTabs[0]?.tab || "");
  const [isClosing, setIsClosing] = useState(false);

  const noData =
    dummyNoData ||
    notificationTabs.every((tab) => !tab.items || tab.items.length === 0);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 180);
  };

  const renderItem = (item) => {
    if ("title" in item && "desc" in item && "time" in item) {
      return (
        <div className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-[16px] text-[#003D79]">
              {item.title}
            </span>
            <span className="text-[12px] text-gray-500">{item.time}</span>
          </div>

          <p
            className="text-[12px] text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.desc }}
          ></p>
        </div>
      );
    }

    if ("label" in item && "count" in item) {
      return (
        <div className="flex justify-between px-2 py-2 border border-gray-200 rounded-md text-[14px]">
          <span>{item.label}</span>
          <span className="font-semibold text-[#003D79]">: {item.count}</span>
        </div>
      );
    }

    return (
      <div className="p-3 border rounded bg-gray-50 text-[14px]">
        {Object.entries(item).map(([key, val]) => (
          <div key={key}>
            <b>{key}:</b> {String(val)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative overflow-visible w-full">
      <div
        className={`
          bg-white shadow-xl rounded-md border border-gray-200 z-[999] relative
          ${isClosing ? "animate-popup-close" : "animate-popup-open"}

          /* RESPONSIVE WIDTH */
          w-[360px] max-w-[92vw] mx-auto mt-2

          /* ON DESKTOP: keep original size */
          md:w-[360px]
        `}
      >
        {/* OPET ARROW ASMARA */}
        <div className="popover-arrow hidden min-[680px]:block"></div>

        {/* OPET HEADER */}
        <div className="bg-[#003D79] text-white px-4 py-3 rounded-t-md flex items-center justify-between">
          <span className="font-semibold text-[20px]">Notifikasi</span>

          <button
            onClick={handleClose}
            className="cursor-pointer hover:opacity-80 transition-transform duration-200 hover:scale-110"
          >
            <Image src="/coolicon.svg" width={14} height={14} alt="close" />
          </button>
        </div>

        {/* OPET TAB HEADER */}
        <div className="p-4 pb-2">
          {!noData && (
            <div className="flex gap-2 mb-2 overflow-x-auto custom-scroll pr-2">
              {notificationTabs.map((tab) => (
                <button
                  key={tab.tab}
                  onClick={() => setActiveTab(tab.tab)}
                  className={`px-3 py-1 whitespace-nowrap rounded-md text-[16px] border cursor-pointer
                    ${
                      activeTab === tab.tab
                        ? "bg-[#003D79] text-white border-[#003D79]"
                        : "bg-white text-[#003D79] border-[#003D79]"
                    }
                  `}
                >
                  {tab.tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* OPET CONTENT */}
        <div className="px-4 pb-4 max-h-[300px] overflow-y-auto custom-scroll">
          {noData ? (
            <div className="p-5 text-center text-gray-500 text-sm">
              Tidak ada data
            </div>
          ) : (
            notificationTabs.map((tab) =>
              activeTab === tab.tab ? (
                <div key={tab.tab} className="flex flex-col gap-4">
                  {tab.items.map((item, i) => (
                    <div key={i}>{renderItem(item)}</div>
                  ))}
                </div>
              ) : null
            )
          )}
        </div>
      </div>
    </div>
  );
}
