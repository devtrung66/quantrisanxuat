// MOCK store + options. Thay bằng mapping DTO khi nối API.
import type { EntryRecord } from "../model/types";

let SEQ = 3;

export const MOCK_ENTRIES: EntryRecord[] = [
  { id: "1", type: "standard", orderCode: "DH2405001", stage: "Cắt nguyên liệu", quantity: 1950, createdAt: "2024-05-10T08:30:00", createdBy: "admin" },
  { id: "2", type: "defect", orderCode: "DH2405001", stage: "Cắt nguyên liệu", quantity: 50, reason: "material", note: "Nguyên liệu ẩm", createdAt: "2024-05-10T08:35:00", createdBy: "admin" },
  { id: "3", type: "standard", orderCode: "DH2405002", stage: "Gia công", quantity: 1900, createdAt: "2024-05-10T09:10:00", createdBy: "admin" },
];

export function nextEntryId(): string {
  SEQ += 1;
  return String(SEQ);
}

export const ORDER_OPTIONS = [
  { value: "DH2405001", label: "DH2405001 - Công ty ABC - SP A" },
  { value: "DH2405002", label: "DH2405002 - Công ty DEF - SP B" },
  { value: "DH2405003", label: "DH2405003 - Công ty GHI - SP C" },
  { value: "DH2405004", label: "DH2405004 - Công ty JKL - SP D" },
  { value: "DH2405005", label: "DH2405005 - Công ty MNO - SP E" },
];

export const STAGE_OPTIONS = [
  { value: "Cắt nguyên liệu", label: "Cắt nguyên liệu" },
  { value: "Gia công", label: "Gia công" },
  { value: "Lắp ráp", label: "Lắp ráp" },
  { value: "Kiểm tra", label: "Kiểm tra" },
  { value: "Đóng gói", label: "Đóng gói" },
];
