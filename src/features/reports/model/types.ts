import type { ReportRange } from "./constants";

export interface ReportFilter {
  range: ReportRange;
  fromDate: string;  // ISO date
  toDate: string;    // ISO date
  orderCode: string; // "" = tất cả
}

export interface ReportSummary {
  totalPlan: number;
  totalStandard: number;
  totalDefect: number;
  passRate: number;   // %
  defectRate: number; // %
}

// 1 dòng báo cáo theo công đoạn
export interface ReportRow {
  stage: string;
  plan: number;
  standard: number;
  defect: number;
  wip: number;
  passRate: number; // %
}

export interface ReportChartDatum {
  name: string;
  plan: number;
  done: number;
}

export interface ReportData {
  summary: ReportSummary;
  rows: ReportRow[];
  chart: ReportChartDatum[];
}

export interface OrderOption {
  value: string;
  label: string;
}
