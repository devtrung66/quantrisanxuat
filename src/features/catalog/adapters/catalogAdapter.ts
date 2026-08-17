// MOCK stores. Thay bằng mapping DTO khi nối API.
import type { Product, Customer, DefectType, Material } from "../model/types";

let PSEQ = 5, CSEQ = 4, DSEQ = 5, MSEQ = 8;

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

// NVL mẫu (khớp bảng định mức)
export const MOCK_MATERIALS: Material[] = [
  { id: "1", code: "NVL-001", name: "Sơn PU phủ mờ", unit: "Lít", price: 185000 },
  { id: "2", code: "NVL-002", name: "Tay nắm nhôm", unit: "Cái/Con", price: 25000 },
  { id: "3", code: "NVL-003", name: "Bản lề Inox 35mm", unit: "Cái/Con", price: 12000 },
  { id: "4", code: "NVL-004", name: "Ray trượt ngăn kéo", unit: "Cái/Con", price: 45000 },
  { id: "5", code: "NVL-005", name: "Ván MDF phủ Melamine", unit: "Tấm", price: 320000 },
  { id: "6", code: "NVL-006", name: "Vít bắt gỗ 4x40", unit: "Cái/Con", price: 500 },
  { id: "7", code: "NVL-007", name: "Chân bàn Inox", unit: "Cái/Con", price: 95000 },
  { id: "8", code: "NVL-008", name: "Mặt kính cường lực", unit: "Tấm", price: 280000 },
];

export const nextProductId = () => String(++PSEQ);
export const nextCustomerId = () => String(++CSEQ);
export const nextDefectId = () => String(++DSEQ);
export const nextMaterialId = () => String(++MSEQ);