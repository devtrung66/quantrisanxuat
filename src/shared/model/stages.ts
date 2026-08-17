// NGUỒN CHÂN LÝ công đoạn — dùng chung toàn app.
import type { StageName } from "./types";

export interface StageDef {
  id: string;
  name: StageName;
  order: number;
}

export const STAGE_DEFS: StageDef[] = [
  { id: "gia-cong", name: "Gia công", order: 1 },
  { id: "che-tao",  name: "Chế tạo",  order: 2 },
  { id: "lap-rap",  name: "Lắp ráp",  order: 3 },
  { id: "co-dien",  name: "Cơ điện",  order: 4 },
  { id: "son",      name: "Sơn",      order: 5 },
  { id: "kiem-tra", name: "Kiểm tra", order: 6 },
  { id: "ban-giao", name: "Bàn giao", order: 7 },
];

// Mảng tên theo thứ tự (thay cho STAGES cũ)
export const STAGE_NAMES: StageName[] = STAGE_DEFS.map((s) => s.name);

// Mảng id theo thứ tự
export const STAGE_IDS = STAGE_DEFS.map((s) => s.id);

export function stageById(id: string): StageDef | undefined {
  return STAGE_DEFS.find((s) => s.id === id);
}

export function stageByName(name: string): StageDef | undefined {
  return STAGE_DEFS.find((s) => s.name === name);
}

export function stageIndex(name: string): number {
  return STAGE_DEFS.findIndex((s) => s.name === name);
}