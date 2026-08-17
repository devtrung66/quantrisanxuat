// MOCK DATA. Sau này thay bằng mapping từ DTO API.
import type {
  DashboardSummary, OrderInProgress, StageBar, StageQuantity, OrderOption,
} from "../model/types";

export function getMockSummary(): DashboardSummary {
  return { ordersInProgress: 12, planQuantity: 15280, doneQuantity: 8730, completionRate: 57.22 };
}

export function getMockOrders(): OrderInProgress[] {
  return [
    { id: "1", code: "DH2405001", customer: "Công ty ABC", product: "SP A", planQty: 2000, progress: 70, dueDate: "2024-05-20" },
    { id: "2", code: "DH2405002", customer: "Công ty DEF", product: "SP B", planQty: 3000, progress: 40, dueDate: "2024-05-25" },
    { id: "3", code: "DH2405003", customer: "Công ty GHI", product: "SP C", planQty: 1500, progress: 90, dueDate: "2024-05-22" },
    { id: "4", code: "DH2405004", customer: "Công ty JKL", product: "SP D", planQty: 2500, progress: 20, dueDate: "2024-05-30" },
    { id: "5", code: "DH2405005", customer: "Công ty MNO", product: "SP E", planQty: 1800, progress: 60, dueDate: "2024-05-28" },
  ];
}

export function getMockStageBars(): StageBar[] {
  return [
    { name: "Gia công", plan: 2000, done: 1950 },
    { name: "Chế tạo", plan: 2000, done: 1900 },
    { name: "Lắp ráp", plan: 2000, done: 1850 },
    { name: "Cơ điện", plan: 2000, done: 1820 },
    { name: "Sơn", plan: 2000, done: 1800 },
    { name: "Kiểm tra", plan: 2000, done: 1770 },
    { name: "Bàn giao", plan: 2000, done: 1750 },
  ];
}

export function getMockStageQuantities(): StageQuantity[] {
  return [
    { stage: "1. Gia công", plan: 2000, standard: 1950, defect: 50, wip: 0, passRate: 97.5 },
    { stage: "2. Chế tạo", plan: 2000, standard: 1900, defect: 60, wip: 40, passRate: 95.0 },
    { stage: "3. Lắp ráp", plan: 2000, standard: 1850, defect: 70, wip: 80, passRate: 92.5 },
    { stage: "4. Cơ điện", plan: 2000, standard: 1820, defect: 30, wip: 120, passRate: 98.38 },
    { stage: "5. Sơn", plan: 2000, standard: 1800, defect: 40, wip: 160, passRate: 97.83 },
    { stage: "6. Kiểm tra", plan: 2000, standard: 1770, defect: 30, wip: 190, passRate: 98.33 },
    { stage: "7. Bàn giao", plan: 2000, standard: 1750, defect: 20, wip: 220, passRate: 98.87 },
  ];
}

export function getMockOrderOptions(): OrderOption[] {
  return [
    { value: "DH2405001", label: "DH2405001 - Công ty ABC - SP A" },
    { value: "DH2405002", label: "DH2405002 - Công ty DEF - SP B" },
    { value: "DH2405003", label: "DH2405003 - Công ty GHI - SP C" },
  ];
}