import type { StageName } from "./types";

export const STAGES: StageName[] = [
  "Cắt nguyên liệu",
  "Gia công",
  "Lắp ráp",
  "Kiểm tra",
  "Đóng gói",
];

export const STATUS_COLORS = {
  green: "#16a34a",
  amber: "#f59e0b",
  red: "#dc2626",
  blue: "#2563eb",
} as const;
