import type { StageStatus } from "./constants";

// Điểm mốc trên timeline của 1 đơn hàng
export interface StageStep {
  stage: string;
  status: StageStatus;
  plan: number;
  done: number;
  progress: number; // %
}

// Tiến độ 1 đơn hàng
export interface OrderProgress {
  orderCode: string;
  customer: string;
  product: string;
  overall: number;          // % tổng
  steps: StageStep[];
}

// Cột chart tổng quan toàn nhà máy
export interface OverviewBar {
  name: string;
  plan: number;
  done: number;
}

export interface ProgressOverview {
  totalPlan: number;
  totalDone: number;
  overall: number; // %
  bars: OverviewBar[];
}

export interface OrderOption {
  value: string;
  label: string;
}
