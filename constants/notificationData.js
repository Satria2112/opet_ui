// ================== OPET DATA DUMMY NOTIFIKASI ==================

export const notificationTabs = [
  {
    tab: "Umum",
    type: "list",
    items: [
      {
        title: "Entry Form",
        desc: "Anda telah berhasil mengajukan nomor dokumen <b>REQ/BU/24/0000/000003.</b>",
        time: "1 menit lalu",
      },
      {
        title: "Monitoring Request",
        desc: "Nomor dokumen <b>REQ/BU/24/0000/000001</b> telah disetujui oleh [Nama Penyetuju].",
        time: "4 jam lalu",
      },
      {
        title: "To Do List",
        desc: "Anda perlu melakukan persetujuan pada nomor dokumen <b>REQ/BU/24/00000/000002.</b>",
        time: "Kemarin",
      },
      {
        title: "Entry Form",
        desc: "Anda telah berhasil mengajukan nomor dokumen <b>REQ/BU/24/0000/000001.</b>",
        time: "2 hari lalu",
      },
    ],
  },
  {
    tab: "To Do List",
    type: "todo",
    items: [
      { label: "Biaya Umum", count: 12 },
      { label: "Promosi", count: 12 },
      { label: "Entertain", count: 12 },
      { label: "Petty Cash", count: 12 },
    ],
  },
];

export const dummyNoData = false;
