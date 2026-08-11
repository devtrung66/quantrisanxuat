import type { PoStatus } from "./constants";

// 1 dòng phân bổ cho 1 công đoạn
export interface StageAllocation {
  stage: string;
  quantity: number;
  startDate: string;
  endDate: string;
  assignee?: string;   // người phụ trách công đoạn
  state?: "pending" | "active" | "done";  // trạng thái công đoạn
}

// Kế hoạch sản xuất liên kết vào LSX
export interface ProductionPlan {
  code: string;
  date: string;
  source: string;
}

// Xưởng sản xuất
export interface Workshop {
  code: string;
  name: string;
}

// 1 sản phẩm cần sản xuất trong LSX
export interface ProductNeed {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;
}

// --- Liên kết: chứng từ liên quan ---
export interface LinkedDoc {
  id: string;
  kind: "order" | "plan" | "material-out" | "product-in";  // loại chứng từ
  code: string;
  label: string;       // mô tả ngắn
  date: string;        // ISO
  status?: string;     // trạng thái chứng từ (tuỳ chọn)
}

// --- Thông tin hệ thống: metadata ---
export interface SystemInfo {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  systemId: string;    // mã nội bộ hệ thống
}

// --- Quy trình: 1 bước duyệt ---
export interface ProcessStep {
  key: PoStatus;
  label: string;
  state: "done" | "active" | "pending";
  actor?: string;      // người thực hiện bước
  at?: string;         // thời điểm (ISO), nếu đã qua
}

// --- Công việc: 1 task gắn LSX ---
export type TaskStatus = "todo" | "doing" | "done";
export interface LsxTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;     // ISO
  status: TaskStatus;
  priority: "low" | "medium" | "high";
}

export interface ProductionOrder {
  id: string;
  code: string;
  orderCode: string;
  customer: string;
  product: string;
  totalQty: number;
  status: PoStatus;
  createdAt: string;
  allocations: StageAllocation[];

  // --- Mở rộng màn chi tiết ---
  plan?: ProductionPlan;
  workshop?: Workshop;
  plannedStart?: string;
  plannedEnd?: string;
  description?: string;
  products?: ProductNeed[];

  // --- 5 section mới ---
  links?: LinkedDoc[];
  system?: SystemInfo;
  process?: ProcessStep[];
  tasks?: LsxTask[];
}

export type ProductionOrderValues = {
  orderCode: string;
  totalQty: number;
  allocations: StageAllocation[];
};

export interface SourceOrder {
  code: string;
  customer: string;
  product: string;
  planQty: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
}
