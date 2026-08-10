// MOCK. Thay bằng mapping DTO khi nối API.
import type { ReportData, ReportFilter, OrderOption } from "../model/types";

export const REPORT_ORDER_OPTIONS: OrderOption[] = [
  { value: "", label: "Tất cả đơn hàng" },
  { value: "DH2405001", label: "DH2405001 - Công ty ABC - SP A" },
  { value: "DH2405002", label: "DH2405002 - Công ty DEF - SP B" },
  { value: "DH2405003", label: "DH2405003 - Công ty GHI - SP C" },
];

function baseRows() {
  return [
    { stage: "Cắt nguyên liệu", plan: 2000, standard: 1950, defect: 50, wip: 0 },
    { stage: "Gia công", plan: 2000, standard: 1900, defect: 60, wip: 40 },
    { stage: "Lắp ráp", plan: 2000, standard: 1850, defect: 70, wip: 80 },
    { stage: "Kiểm tra", plan: 2000, standard: 1800, defect: 40, wip: 160 },
    { stage: "Đóng gói", plan: 2000, standard: 1750, defect: 30, wip: 220 },
  ];
}

export function getMockReport(filter: ReportFilter): ReportData {
  // Giả lập: nếu chọn 1 đơn cụ thể thì scale nhẹ để thấy khác biệt
  const factor = filter.orderCode ? 0.75 : 1;
  const rows = baseRows().map((r) => {
    const plan = Math.round(r.plan * factor);
    const standard = Math.round(r.standard * factor);
    const defect = Math.round(r.defect * factor);
    const total = standard + defect;
    return { ...r, plan, standard, defect, wip: Math.round(r.wip * factor), passRate: total ? (standard / total) * 100 : 0 };
  });

  const totalPlan = rows.reduce((a, b) => a + b.plan, 0);
  const totalStandard = rows.reduce((a, b) => a + b.standard, 0);
  const totalDefect = rows.reduce((a, b) => a + b.defect, 0);
  const grand = totalStandard + totalDefect;

  return {
    summary: {
      totalPlan,
      totalStandard,
      totalDefect,
      passRate: grand ? (totalStandard / grand) * 100 : 0,
      defectRate: grand ? (totalDefect / grand) * 100 : 0,
    },
    rows,
    chart: rows.map((r) => ({ name: r.stage, plan: r.plan, done: r.standard })),
  };
}
