import { DataTable, ProgressBar, formatNumber, formatPercent } from "@shared/index";
import type { Column } from "@shared/index";
import type { ReportRow } from "../../model/types";

const columns: Column<ReportRow>[] = [
  { key: "stage", header: "Công đoạn" },
  { key: "plan", header: "Kế hoạch", align: "right", render: (r) => formatNumber(r.plan) },
  { key: "standard", header: "Đạt chuẩn", align: "right", render: (r) => <span className="text-green-600">{formatNumber(r.standard)}</span> },
  { key: "defect", header: "Lỗi", align: "right", render: (r) => <span className="text-red-600">{formatNumber(r.defect)}</span> },
  { key: "wip", header: "Tồn/WIP", align: "right", render: (r) => formatNumber(r.wip) },
  { key: "passRate", header: "Tỷ lệ đạt", render: (r) => <div className="flex items-center gap-2"><ProgressBar value={r.passRate} tone="green" /><span className="w-14 text-right text-xs text-slate-500">{formatPercent(r.passRate)}</span></div> },
];

export function ReportTable({ rows }: { rows: ReportRow[] }) {
  return <DataTable columns={columns} data={rows} rowKey={(r) => r.stage} />;
}
