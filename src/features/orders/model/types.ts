import type { OrderStatus } from "./constants";

export interface Order {
  id: string;
  code: string;
  customer: string;
  product: string;
  planQty: number;
  doneQty: number;
  progress: number;   // %
  status: OrderStatus;
  orderDate: string;  // ISO
  dueDate: string;    // ISO
  note?: string;
}

export interface OrderFilter {
  keyword: string;
  status: OrderStatus | "all";
  page: number;
}

export type OrderFormValues = {
  code: string;
  customer: string;
  product: string;
  planQty: number;
  orderDate: string;
  dueDate: string;
  status: OrderStatus;
  note?: string;
};
