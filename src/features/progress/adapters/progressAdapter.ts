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
    { name: "Gia công", plan: 10000, done: 9500 },
    { name: "Chế tạo", plan: 10000, done: 9000 },
    { name: "Lắp ráp", plan: 10000, done: 8200 },
    { name: "Cơ điện", plan: 10000, done: 7800 },
    { name: "Sơn", plan: 10000, done: 7400 },
    { name: "Kiểm tra", plan: 10000, done: 7000 },
    { name: "Bàn giao", plan: 10000, done: 6900 },
  ];
  const totalPlan = bars.reduce((a, b) => a + b.plan, 0);
  const totalDone = bars.reduce((a, b) => a + b.done, 0);
  return { totalPlan, totalDone, overall: Math.round((totalDone / totalPlan) * 100), bars };
}

function steps7(vals: Array<[string, "done" | "active" | "pending", number, number, number]>) {
  return vals.map(([stage, status, plan, done, progress]) => ({ stage, status, plan, done, progress }));
}

const DB: Record<string, OrderProgress> = {
  DH2405001: {
    orderCode: "DH2405001", customer: "Công ty ABC", product: "SP A", overall: 55,
    steps: steps7([
      ["Gia công", "done", 2000, 2000, 100],
      ["Chế tạo", "done", 2000, 2000, 100],
      ["Lắp ráp", "active", 2000, 1400, 70],
      ["Cơ điện", "pending", 2000, 0, 0],
      ["Sơn", "pending", 2000, 0, 0],
      ["Kiểm tra", "pending", 2000, 0, 0],
      ["Bàn giao", "pending", 2000, 0, 0],
    ]),
  },
  DH2405002: {
    orderCode: "DH2405002", customer: "Công ty DEF", product: "SP B", overall: 30,
    steps: steps7([
      ["Gia công", "done", 3000, 3000, 100],
      ["Chế tạo", "active", 3000, 1800, 60],
      ["Lắp ráp", "pending", 3000, 0, 0],
      ["Cơ điện", "pending", 3000, 0, 0],
      ["Sơn", "pending", 3000, 0, 0],
      ["Kiểm tra", "pending", 3000, 0, 0],
      ["Bàn giao", "pending", 3000, 0, 0],
    ]),
  },
  DH2405003: {
    orderCode: "DH2405003", customer: "Công ty GHI", product: "SP C", overall: 85,
    steps: steps7([
      ["Gia công", "done", 1500, 1500, 100],
      ["Chế tạo", "done", 1500, 1500, 100],
      ["Lắp ráp", "done", 1500, 1500, 100],
      ["Cơ điện", "done", 1500, 1500, 100],
      ["Sơn", "active", 1500, 1200, 80],
      ["Kiểm tra", "active", 1500, 900, 60],
      ["Bàn giao", "pending", 1500, 0, 0],
    ]),
  },
  DH2405005: {
    orderCode: "DH2405005", customer: "Công ty MNO", product: "SP E", overall: 50,
    steps: steps7([
      ["Gia công", "done", 1800, 1800, 100],
      ["Chế tạo", "done", 1800, 1800, 100],
      ["Lắp ráp", "active", 1800, 1080, 60],
      ["Cơ điện", "pending", 1800, 0, 0],
      ["Sơn", "pending", 1800, 0, 0],
      ["Kiểm tra", "pending", 1800, 0, 0],
      ["Bàn giao", "pending", 1800, 0, 0],
    ]),
  },
};

export function getMockOrderProgress(code: string): OrderProgress | undefined {
  return DB[code];
}