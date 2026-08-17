// Mức ưu tiên (gốc dùng "now" cho Cần làm ngay)
export const WORK_PRIORITY = {
  normal: "normal",
  urgent: "urgent",
  now: "now",
} as const;
export type WorkPriority = (typeof WORK_PRIORITY)[keyof typeof WORK_PRIORITY];

export const WORK_PRIORITY_LABEL: Record<WorkPriority, string> = {
  normal: "Bình thường",
  urgent: "Gấp",
  now: "Cần làm ngay",
};

export const WORK_PRIORITY_TONE: Record<WorkPriority, string> = {
  normal: "bg-green-100 text-green-700",
  urgent: "bg-green-200 text-green-800",
  now: "bg-red-500 text-white",
};

// Tình trạng
export const WORK_STATUS = {
  pending: "pending",
  doing: "doing",
  done: "done",
} as const;
export type WorkStatus = (typeof WORK_STATUS)[keyof typeof WORK_STATUS];

export const WORK_STATUS_LABEL: Record<WorkStatus, string> = {
  pending: "Chưa bắt đầu",
  doing: "Đang làm",
  done: "Hoàn thành",
};

export const WORK_STATUS_TONE: Record<WorkStatus, string> = {
  pending: "bg-slate-200 text-slate-600",
  doing: "bg-green-100 text-green-700",
  done: "bg-emerald-600 text-white",
};

// 7 tổ theo yêu cầu khách
export const TEAMS = [
  { id: "gia-cong", name: "Gia công" },
  { id: "che-tao", name: "Chế tạo" },
  { id: "lap-rap", name: "Lắp ráp" },
  { id: "co-dien", name: "Cơ điện" },
  { id: "son", name: "Sơn" },
  { id: "kiem-tra", name: "Kiểm tra" },
  { id: "ban-giao", name: "Bàn giao" },
] as const;
export type TeamId = (typeof TEAMS)[number]["id"];

// Bảng màu chip người thực hiện (map theo id w1..w6 trong workAdapter)
const WORKER_COLORS: Record<string, string> = {
  w1: "#8b5cf6",
  w2: "#3b82f6",
  w3: "#a855f7",
  w4: "#6366f1",
  w5: "#eab308",
  w6: "#10b981",
};

export function workerColor(id: string): string {
  return WORKER_COLORS[id] ?? "#64748b";
}