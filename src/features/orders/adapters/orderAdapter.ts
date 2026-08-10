// MOCK store in-memory (Phase 1). Thay bằng mapping DTO khi nối API.
import type { Order } from "../model/types";

let SEQ = 6;

export const MOCK_ORDERS: Order[] = [
  { id: "1", code: "DH2405001", customer: "Công ty ABC", product: "SP A", planQty: 2000, doneQty: 1400, progress: 70, status: "in_progress", orderDate: "2024-05-01", dueDate: "2024-05-20" },
  { id: "2", code: "DH2405002", customer: "Công ty DEF", product: "SP B", planQty: 3000, doneQty: 1200, progress: 40, status: "in_progress", orderDate: "2024-05-02", dueDate: "2024-05-25" },
  { id: "3", code: "DH2405003", customer: "Công ty GHI", product: "SP C", planQty: 1500, doneQty: 1350, progress: 90, status: "in_progress", orderDate: "2024-05-03", dueDate: "2024-05-22" },
  { id: "4", code: "DH2405004", customer: "Công ty JKL", product: "SP D", planQty: 2500, doneQty: 500, progress: 20, status: "pending", orderDate: "2024-05-04", dueDate: "2024-05-30" },
  { id: "5", code: "DH2405005", customer: "Công ty MNO", product: "SP E", planQty: 1800, doneQty: 1080, progress: 60, status: "in_progress", orderDate: "2024-05-05", dueDate: "2024-05-28" },
  { id: "6", code: "DH2404012", customer: "Công ty PQR", product: "SP F", planQty: 1200, doneQty: 1200, progress: 100, status: "completed", orderDate: "2024-04-10", dueDate: "2024-04-28" },
];

export function nextId(): string {
  SEQ += 1;
  return String(SEQ);
}
