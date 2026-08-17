// MOCK store in-memory. Thay bằng mapping DTO khi nối API.
import type { Order } from "../model/types";

let SEQ = 6;

export const MOCK_ORDERS: Order[] = [
  { id: "1", code: "DH2405001", content: "Đóng thùng xe tải 5 tấn", customer: "Công ty ABC", chassisNumber: "RLHKA-001", containerCode: "TH-001", product: "SP A", planQty: 2000, doneQty: 1400, progress: 70, status: "in_progress", startDate: "2024-05-01", orderDate: "2024-05-01", dueDate: "2024-05-20" },
  { id: "2", code: "DH2405002", content: "Lắp ráp khung gầm", customer: "Công ty DEF", chassisNumber: "RLHKA-002", containerCode: "TH-002", product: "SP B", planQty: 3000, doneQty: 1200, progress: 40, status: "in_progress", startDate: "2024-05-02", orderDate: "2024-05-02", dueDate: "2024-05-25" },
  { id: "3", code: "DH2405003", content: "Sơn hoàn thiện thùng đông lạnh", customer: "Công ty GHI", chassisNumber: "RLHKA-003", containerCode: "TH-003", product: "SP C", planQty: 1500, doneQty: 1350, progress: 90, status: "in_progress", startDate: "2024-05-03", orderDate: "2024-05-03", dueDate: "2024-05-22" },
  { id: "4", code: "DH2405004", content: "Gia công thùng ben", customer: "Công ty JKL", chassisNumber: "RLHKA-004", containerCode: "TH-004", product: "SP D", planQty: 2500, doneQty: 500, progress: 20, status: "pending", startDate: "2024-05-04", orderDate: "2024-05-04", dueDate: "2024-05-30" },
  { id: "5", code: "DH2405005", content: "Lắp hệ thống thuỷ lực", customer: "Công ty MNO", chassisNumber: "RLHKA-005", containerCode: "TH-005", product: "SP E", planQty: 1800, doneQty: 1080, progress: 60, status: "in_progress", startDate: "2024-05-05", orderDate: "2024-05-05", dueDate: "2024-05-28" },
  { id: "6", code: "DH2404012", content: "Hoàn thiện xe chữa cháy", customer: "Công ty PQR", chassisNumber: "RLHKA-006", containerCode: "TH-006", product: "SP F", planQty: 1200, doneQty: 1200, progress: 100, status: "completed", startDate: "2024-04-05", orderDate: "2024-04-10", dueDate: "2024-04-28" },
];

export function nextId(): string {
  SEQ += 1;
  return String(SEQ);
}