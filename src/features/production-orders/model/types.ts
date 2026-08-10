import type { PoStatus } from "./constants";

// 1 dòng phân bổ cho 1 công đoạn
export interface StageAllocation {
  stage: string;
  quantity: number;   // số lượng phân cho công đoạn
  startDate: string;  // ISO date
  endDate: string;    // ISO date
}

export interface ProductionOrder {
  id: string;
  code: string;          // mã lệnh SX
  orderCode: string;     // đơn hàng nguồn
  customer: string;
  product: string;
  totalQty: number;
  status: PoStatus;
  createdAt: string;     // ISO
  allocations: StageAllocation[];
}

export type ProductionOrderValues = {
  orderCode: string;
  totalQty: number;
  allocations: StageAllocation[];
};

// Đơn hàng nguồn để chọn khi tạo lệnh
export interface SourceOrder {
  code: string;
  customer: string;
  product: string;
  planQty: number;
}
