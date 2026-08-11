export const PO_STATUS = {
  draft: "draft",
  released: "released",
  in_progress: "in_progress",
  done: "done",
} as const;

export type PoStatus = (typeof PO_STATUS)[keyof typeof PO_STATUS];

export const PO_STATUS_LABEL: Record<PoStatus, string> = {
  draft: "Nháp",
  released: "Đã ban hành",
  in_progress: "Đang sản xuất",
  done: "Hoàn thành",
};

export const PO_STATUS_TONE: Record<PoStatus, "slate" | "blue" | "amber" | "green"> = {
  draft: "slate",
  released: "blue",
  in_progress: "amber",
  done: "green",
};

// 5 công đoạn chuẩn để phân bổ
export const ALLOCATION_STAGES = [
  "Cắt nguyên liệu",
  "Gia công",
  "Lắp ráp",
  "Kiểm tra",
  "Đóng gói",
] as const;

// --- Điều hướng nội bộ màn chi tiết LSX (sidebar) ---
export const LSX_SECTION = {
  general: "general",             // Thông tin chung
  norm: "norm",                   // Thông tin chi tiết định mức
  planSxct: "plan-sxct",          // Thông tin kế hoạch SXCT
  links: "links",                 // Liên kết
  system: "system",               // Thông tin hệ thống
  process: "process",             // Quy trình
  tasks: "tasks",                 // Công việc
} as const;

export type LsxSection = (typeof LSX_SECTION)[keyof typeof LSX_SECTION];

export interface LsxNavItem {
  id: LsxSection;
  label: string;
  ready: boolean;   // đã build hay chưa (chưa thì render placeholder)
}

export interface LsxNavGroup {
  label: string | null;   // null = mục lẻ không thuộc nhóm
  items: LsxNavItem[];
}

// Cấu trúc menu đúng như ảnh Cleeksy
export const LSX_NAV: LsxNavGroup[] = [
  {
    label: "Thông tin LSX",
    items: [
      { id: LSX_SECTION.general, label: "Thông tin chung", ready: true },
      { id: LSX_SECTION.norm, label: "Thông tin chi tiết định mức", ready: true },
      { id: LSX_SECTION.planSxct, label: "Thông tin kế hoạch SXCT", ready: true },
    ],
  },
  {
    label: "Thông tin khác",
    items: [
      { id: LSX_SECTION.links, label: "Liên kết", ready: true },
      { id: LSX_SECTION.system, label: "Thông tin hệ thống", ready: true },
    ],
  },
  {
    label: null,
    items: [
      { id: LSX_SECTION.process, label: "Quy trình", ready: true },
      { id: LSX_SECTION.tasks, label: "Công việc", ready: true },
    ],
  },
];

// --- Liên kết: nhãn + icon theo loại chứng từ ---
export const LINK_KIND_LABEL: Record<string, string> = {
  order: "Đơn đặt hàng",
  plan: "Kế hoạch sản xuất",
  "material-out": "Phiếu xuất NVL",
  "product-in": "Phiếu nhập thành phẩm",
};

// --- Công việc: nhãn + tone trạng thái ---
export const TASK_STATUS_LABEL: Record<string, string> = {
  todo: "Chưa làm",
  doing: "Đang làm",
  done: "Hoàn thành",
};

export const TASK_STATUS_TONE: Record<string, "slate" | "amber" | "green"> = {
  todo: "slate",
  doing: "amber",
  done: "green",
};

export const TASK_PRIORITY_LABEL: Record<string, string> = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
};

export const TASK_PRIORITY_TONE: Record<string, "slate" | "blue" | "red"> = {
  low: "slate",
  medium: "blue",
  high: "red",
};

// --- Công đoạn (Kế hoạch SXCT): tone trạng thái ---
export const STAGE_STATE_LABEL: Record<string, string> = {
  pending: "Chờ",
  active: "Đang chạy",
  done: "Xong",
};

export const STAGE_STATE_TONE: Record<string, "slate" | "blue" | "green"> = {
  pending: "slate",
  active: "blue",
  done: "green",
};
