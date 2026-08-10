export type ID = string;

export type StageName =
  | "Cắt nguyên liệu"
  | "Gia công"
  | "Lắp ráp"
  | "Kiểm tra"
  | "Đóng gói";

export interface Paginated<T> {
  items: T[];
  total: number;
}
