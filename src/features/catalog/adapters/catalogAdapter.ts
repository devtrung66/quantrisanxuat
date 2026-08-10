// MOCK stores. Thay bằng mapping DTO khi nối API.
import type { Product, Customer, DefectType } from "../model/types";

let PSEQ = 5, CSEQ = 4, DSEQ = 5;

export const MOCK_PRODUCTS: Product[] = [
  { id: "1", code: "SP-A", name: "Sản phẩm A", unit: "Cái", active: true },
  { id: "2", code: "SP-B", name: "Sản phẩm B", unit: "Cái", active: true },
  { id: "3", code: "SP-C", name: "Sản phẩm C", unit: "Bộ", active: true },
  { id: "4", code: "SP-D", name: "Sản phẩm D", unit: "Cái", active: false },
  { id: "5", code: "SP-E", name: "Sản phẩm E", unit: "Thùng", active: true },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: "1", code: "KH-ABC", name: "Công ty ABC", phone: "0901234567", address: "Cần Thơ" },
  { id: "2", code: "KH-DEF", name: "Công ty DEF", phone: "0902345678", address: "TP.HCM" },
  { id: "3", code: "KH-GHI", name: "Công ty GHI", phone: "0903456789", address: "Đà Nẵng" },
  { id: "4", code: "KH-JKL", name: "Công ty JKL", phone: "0904567890", address: "Hà Nội" },
];

export const MOCK_DEFECTS: DefectType[] = [
  { id: "1", code: "L-MAT", name: "Lỗi nguyên liệu", severity: "medium" },
  { id: "2", code: "L-MAC", name: "Lỗi máy móc", severity: "high" },
  { id: "3", code: "L-OPR", name: "Lỗi thao tác", severity: "low" },
  { id: "4", code: "L-DIM", name: "Sai kích thước", severity: "high" },
  { id: "5", code: "L-OTH", name: "Khác", severity: "low" },
];

export const nextProductId = () => String(++PSEQ);
export const nextCustomerId = () => String(++CSEQ);
export const nextDefectId = () => String(++DSEQ);
