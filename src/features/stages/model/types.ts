import type { StageState } from "./constants";

export interface Stage {
  id: string;
  order: number;         // thứ tự công đoạn
  name: string;
  state: StageState;
  standardOutput: number; // định mức/ca
  defectLimit: number;    // % lỗi cho phép
  wip: number;            // tồn WIP hiện tại
  todayStandard: number;  // đạt chuẩn hôm nay
  todayDefect: number;    // lỗi hôm nay
}

export type StageFormValues = {
  name: string;
  order: number;
  state: StageState;
  standardOutput: number;
  defectLimit: number;
};
