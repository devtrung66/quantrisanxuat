// --- Thứ tự ưu tiên (khớp sheet: 3 mức tiếng Việt) ---
export const WORK_PRIORITY = {
  normal: "normal",
  urgent: "urgent",
  now: "now",
} as const;
export type WorkPriority = (typeof WORK_PRIORITY)[keyof typeof WORK_PRIORITY];

export const WORK_PRIORITY_LABEL: Record<WorkPriority, string> = {
  normal: "BÌNH THƯỜNG",
  urgent: "GẤP",
  now: "CẦN LÀM NGAY",
};

// tone: bình thường=xanh nhạt, gấp=xanh lá, cần làm ngay=đỏ (khớp màu sheet)
export const WORK_PRIORITY_TONE: Record<WorkPriority, "blue" | "green" | "red"> = {
  normal: "blue",
  urgent: "green",
  now: "red",
};

// --- Tình trạng ---
export const WORK_STATUS = {
  doing: "doing",
  done: "done",
  pending: "pending",
} as const;
export type WorkStatus = (typeof WORK_STATUS)[keyof typeof WORK_STATUS];

export const WORK_STATUS_LABEL: Record<WorkStatus, string> = {
  doing: "Đang làm",
  done: "Hoàn thành",
  pending: "Chưa làm",
};

export const WORK_STATUS_TONE: Record<WorkStatus, "amber" | "green" | "slate"> = {
  doing: "amber",
  done: "green",
  pending: "slate",
};

// --- Các tổ (tab dưới đáy sheet) ---
export const TEAMS = [
  { id: "hoan-thien", name: "HOÀN THIỆN" },
  { id: "to-may", name: "TỔ MAY" },
  { id: "che-tao", name: "CHẾ TẠO" },
  { id: "co-dien", name: "CƠ ĐIỆN" },
  { id: "to-son", name: "TỔ SƠN" },
] as const;

// --- Bảng màu chip người thực hiện (gán ổn định theo tên) ---
export const WORKER_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-cyan-100 text-cyan-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
];

// hash tên -> chỉ số màu ổn định
export function workerColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return WORKER_COLORS[h % WORKER_COLORS.length];
}
