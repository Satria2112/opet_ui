// ================== OPET MASTER DATA ==================

export const IAM = {
  user: {
    name: "Fanstein Kristinus Alfandy Makomakoro",
    nik: "14552908",
    jabatan: "Head Parking Officer",
    job: "Tukang Parkir",
    lokasiBekerja: "Alfarmart",
    email: "makomakoro@muf.co.id",
    phone: "081234567890",

    jobList: [
      "Tukang Parkir Head",
      "Maling", "Tukang Cukur", "Pembersih Peron", "Ngecat Tembok",
      "Tukang PLN", "Petugas Kebersihan", "Penculik", "Peramal",
      "Tukang Begal", "Jagal Sapi",
    ]
  },

  menu: [
    {
      key: "master",
      icon: "master",
      label: "Master Parameter",
      permissions: ["MASTER_VIEW", "MASTER_EDIT"],
      children: [
        {
          key: "master-sub-a",
          label: "Submenu A",
          icon: "dot",
          permissions: ["MASTER_VIEW"],
          children: [
            { key: "a-child-1", label: "Child 1", icon: "dot", permissions: ["MASTER_VIEW"] },
            {
              key: "a-opet-2",
              label: "Opet 2",
              icon: "dot",
              permissions: ["MASTER_EDIT"],
              children: [
                { key: "a-opet-2-step-1", label: "Step 1", icon: "dot", permissions: ["MASTER_VIEW"] },
                { key: "a-opet-2-step-2", label: "Step 2", icon: "dot", permissions: ["MASTER_EDIT"] },
              ],
            },
          ],
        },
        {
          key: "master-sub-b",
          label: "Submenu B",
          icon: "dot",
          permissions: ["MASTER_VIEW"],
          children: [
            { key: "b-child-x", label: "Child X", icon: "dot", permissions: ["MASTER_VIEW"] },
            { key: "b-child-y", label: "Child Y", icon: "dot", permissions: ["MASTER_VIEW"] },
          ],
        },
      ],
    },

    { key: "id", icon: "id", label: "Penambahan ID Transaksi", permissions: ["ID_VIEW"] },
    { key: "cams", icon: "cams", label: "CAMS", permissions: ["CAMS_VIEW"] },
    { key: "petty", icon: "petty", label: "Petty Cash", permissions: ["PETTY_VIEW"] },

    {
      key: "cost",
      icon: "cost",
      label: "Biaya Umum",
      permissions: ["COST_VIEW"],
      children: [
        {
          key: "cost-r1",
          label: "Realisasi",
          permissions: ["COST_VIEW"],
          children: [
            { key: "r1-1", label: "R1-1", icon: "dot", permissions: ["COST_VIEW"] },
          ],
        },
      ],
    },

    { key: "promo", icon: "promo", label: "Promosi", permissions: ["PROMO_VIEW"] },
    { key: "entertain", icon: "entertain", label: "Entertain", permissions: ["ENTERTAIN_VIEW"] },
    { key: "kasbon", icon: "kasbon", label: "Realisasi Kasbon", permissions: ["KASBON_VIEW"] },
    { key: "fund", icon: "fund", label: "Fund Transaction", permissions: ["FUND_VIEW"] },
  ],

  permissions: [
    "MASTER_VIEW",
    "MASTER_EDIT",
    "ID_VIEW",
    "CAMS_VIEW",
    "PETTY_VIEW",
    "COST_VIEW",
    "PROMO_VIEW",
    "ENTERTAIN_VIEW",
    "KASBON_VIEW",
    "FUND_VIEW",
  ]
};
