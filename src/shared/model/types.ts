export type ID = string;

// 7 công đoạn chuẩn (đồng bộ toàn app)
export type StageName =
  | "Gia công"
  | "Chế tạo"
  | "Lắp ráp"
  | "Cơ điện"
  | "Sơn"
  | "Kiểm tra"
  | "Bàn giao";

export interface Paginated<T> {
  items: T[];
  total: number;
}