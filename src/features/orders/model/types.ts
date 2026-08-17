import type { OrderStatus } from "./constants";

export interface Order {
  id: string;
  code: string;            // Tên LSX (mã lệnh SX)
  content: string;         // Nội dung công việc
  customer: string;        // Khách hàng
  chassisNumber: string;   // Số Khung
  containerCode: string;   // Mã số thùng
  product: string;         // (giữ, dùng ở Dashboard/Nhập liệu/Báo cáo)
  planQty: number;         // Số lượng
  doneQty: number;
  progress: number;        // %
  status: OrderStatus;
  startDate: string;       // Ngày bắt đầu (ISO)
  orderDate: string;       // ngày đặt (giữ nội bộ)
  dueDate: string;         // Ngày hoàn thành (ISO)
  note?: string;
}

export interface OrderFilter {
  keyword: string;
  status: OrderStatus | "all";
  page: number;
}

export type OrderFormValues = {
  code: string;
  content: string;
  customer: string;
  chassisNumber: string;
  containerCode: string;
  product: string;
  planQty: number;
  startDate: string;
  orderDate: string;
  dueDate: string;
  status: OrderStatus;
  note?: string;
};