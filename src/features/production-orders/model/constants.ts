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
