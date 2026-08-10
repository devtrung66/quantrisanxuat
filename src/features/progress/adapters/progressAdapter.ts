// MOCK data. Thay bằng mapping DTO khi nối API.
import type { ProgressOverview, OrderProgress, OrderOption } from "../model/types";

export const PROGRESS_ORDER_OPTIONS: OrderOption[] = [
  { value: "DH2405001", label: "DH2405001 - Công ty ABC - SP A" },
  { value: "DH2405002", label: "DH2405002 - Công ty DEF - SP B" },
  { value: "DH2405003", label: "DH2405003 - Công ty GHI - SP C" },
  { value: "DH2405005", label: "DH2405005 - Công ty MNO - SP E" },
];

export function getMockOverview(): ProgressOverview {
  const bars = [
    { name: "Cắt nguyên liệu", plan: 10000, done: 9500 },
    { name: "Gia công", plan: 10000, done: 9000 },
    { name: "Lắp ráp", plan: 10000, done: 8200 },
    { name: "Kiểm tra", plan: 10000, done: 7600 },
    { name: "Đóng gói", plan: 10000, done: 6900 },
  ];
  const totalPlan = bars.reduce((a, b) => a + b.plan, 0);
  const totalDone = bars.reduce((a, b) => a + b.done, 0);
  return { totalPlan, totalDone, overall: Math.round((totalDone / totalPlan) * 100), bars };
}

const DB: Record<string, OrderProgress> = {
  DH2405001: {
    orderCode: "DH2405001", customer: "Công ty ABC", product: "SP A", overall: 70,
    steps: [
      { stage: "Cắt nguyên liệu", status: "done", plan: 2000, done: 2000, progress: 100 },
      { stage: "Gia công", status: "done", plan: 2000, done: 2000, progress: 100 },
      { stage: "Lắp ráp", status: "active", plan: 2000, done: 1400, progress: 70 },
      { stage: "Kiểm tra", status: "pending", plan: 2000, done: 0, progress: 0 },
      { stage: "Đóng gói", status: "pending", plan: 2000, done: 0, progress: 0 },
    ],
  },
  DH2405002: {
    orderCode: "DH2405002", customer: "Công ty DEF", product: "SP B", overall: 40,
    steps: [
      { stage: "Cắt nguyên liệu", status: "done", plan: 3000, done: 3000, progress: 100 },
      { stage: "Gia công", status: "active", plan: 3000, done: 1800, progress: 60 },
      { stage: "Lắp ráp", status: "pending", plan: 3000, done: 0, progress: 0 },
      { stage: "Kiểm tra", status: "pending", plan: 3000, done: 0, progress: 0 },
      { stage: "Đóng gói", status: "pending", plan: 3000, done: 0, progress: 0 },
    ],
  },
  DH2405003: {
    orderCode: "DH2405003", customer: "Công ty GHI", product: "SP C", overall: 90,
    steps: [
      { stage: "Cắt nguyên liệu", status: "done", plan: 1500, done: 1500, progress: 100 },
      { stage: "Gia công", status: "done", plan: 1500, done: 1500, progress: 100 },
      { stage: "Lắp ráp", status: "done", plan: 1500, done: 1500, progress: 100 },
      { stage: "Kiểm tra", status: "active", plan: 1500, done: 1200, progress: 80 },
      { stage: "Đóng gói", status: "active", plan: 1500, done: 900, progress: 60 },
    ],
  },
  DH2405005: {
    orderCode: "DH2405005", customer: "Công ty MNO", product: "SP E", overall: 60,
    steps: [
      { stage: "Cắt nguyên liệu", status: "done", plan: 1800, done: 1800, progress: 100 },
      { stage: "Gia công", status: "done", plan: 1800, done: 1800, progress: 100 },
      { stage: "Lắp ráp", status: "active", plan: 1800, done: 1080, progress: 60 },
      { stage: "Kiểm tra", status: "pending", plan: 1800, done: 0, progress: 0 },
      { stage: "Đóng gói", status: "pending", plan: 1800, done: 0, progress: 0 },
    ],
  },
};

export function getMockOrderProgress(code: string): OrderProgress | undefined {
  return DB[code];
}
