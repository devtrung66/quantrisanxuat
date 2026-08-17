import { STAGE_NAMES } from "./stages";

// Giữ export STAGES (mảng tên) cho code cũ đang import từ đây.
export const STAGES = STAGE_NAMES;

export const STATUS_COLORS = {
  green: "#16a34a",
  amber: "#f59e0b",
  red: "#dc2626",
  blue: "#2563eb",
} as const;