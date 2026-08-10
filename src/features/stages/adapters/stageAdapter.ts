// MOCK store. Thay bằng mapping DTO khi nối API.
import type { Stage } from "../model/types";

let SEQ = 5;

export const MOCK_STAGES: Stage[] = [
  { id: "1", order: 1, name: "Cắt nguyên liệu", state: "active", standardOutput: 2000, defectLimit: 3, wip: 0, todayStandard: 1950, todayDefect: 50 },
  { id: "2", order: 2, name: "Gia công", state: "active", standardOutput: 2000, defectLimit: 4, wip: 40, todayStandard: 1900, todayDefect: 60 },
  { id: "3", order: 3, name: "Lắp ráp", state: "active", standardOutput: 2000, defectLimit: 5, wip: 80, todayStandard: 1850, todayDefect: 70 },
  { id: "4", order: 4, name: "Kiểm tra", state: "active", standardOutput: 2000, defectLimit: 2, wip: 160, todayStandard: 1800, todayDefect: 40 },
  { id: "5", order: 5, name: "Đóng gói", state: "paused", standardOutput: 2000, defectLimit: 2, wip: 220, todayStandard: 1750, todayDefect: 30 },
];

export function nextStageId(): string {
  SEQ += 1;
  return String(SEQ);
}
