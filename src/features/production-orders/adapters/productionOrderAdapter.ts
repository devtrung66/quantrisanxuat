// MOCK. Thay bằng mapping DTO khi nối API.
import type { ProductionOrder, SourceOrder } from "../model/types";
import { ALLOCATION_STAGES } from "../model/constants";

let SEQ = 2;

export const SOURCE_ORDERS: SourceOrder[] = [
  { code: "DH2405001", customer: "Công ty ABC", product: "SP A", planQty: 2000 },
  { code: "DH2405002", customer: "Công ty DEF", product: "SP B", planQty: 3000 },
  { code: "DH2405004", customer: "Công ty JKL", product: "SP D", planQty: 2500 },
  { code: "DH2405005", customer: "Công ty MNO", product: "SP E", planQty: 1800 },
];

function evenAlloc(total: number) {
  const per = Math.floor(total / ALLOCATION_STAGES.length);
  return ALLOCATION_STAGES.map((stage, i) => ({
    stage,
    quantity: i === ALLOCATION_STAGES.length - 1 ? total - per * (ALLOCATION_STAGES.length - 1) : per,
    startDate: "2024-05-10",
    endDate: "2024-05-20",
  }));
}

export const MOCK_PRODUCTION_ORDERS: ProductionOrder[] = [
  {
    id: "1", code: "LSX-2405-001", orderCode: "DH2405001", customer: "Công ty ABC", product: "SP A",
    totalQty: 2000, status: "in_progress", createdAt: "2024-05-08T09:00:00", allocations: evenAlloc(2000),
  },
  {
    id: "2", code: "LSX-2405-002", orderCode: "DH2405002", customer: "Công ty DEF", product: "SP B",
    totalQty: 3000, status: "released", createdAt: "2024-05-09T10:30:00", allocations: evenAlloc(3000),
  },
];

export function nextPoId(): string {
  SEQ += 1;
  return String(SEQ);
}

export function nextPoCode(): string {
  return `LSX-2405-${String(SEQ + 1).padStart(3, "0")}`;
}

export { evenAlloc };
