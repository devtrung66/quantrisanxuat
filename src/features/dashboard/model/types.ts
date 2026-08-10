export interface DashboardSummary {
  ordersInProgress: number;
  planQuantity: number;
  doneQuantity: number;
  completionRate: number; // %
}

export interface OrderInProgress {
  id: string;
  code: string;
  customer: string;
  product: string;
  planQty: number;
  progress: number; // %
  dueDate: string;  // ISO
}

export interface StageBar {
  name: string;
  plan: number;
  done: number;
}

export interface StageQuantity {
  stage: string;
  plan: number;
  standard: number;
  defect: number;
  wip: number;
  passRate: number; // %
}

export interface OrderOption {
  value: string;
  label: string;
}
