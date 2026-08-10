import { Card, DataTable, ProgressBar, formatNumber, formatPercent } from "@shared/index";
import type { Column } from "@shared/index";
import type { StageQuantity } from "../../model/types";
import { OrderSelector } from "./OrderSelector";

const columns: Column<StageQuantity>[] = [
  { key: "stage", header: "Công đoạn" },
  { key: "plan", header: "Kế hoạch", align: "right", render: (r) => formatNumber(r.plan) },
  { key: "standard", header: "Đạt chuẩn", align: "right", render: (r) => <span className="text-green-600">{formatNumber(r.standard)}</span> },
  { key: "defect", header: "Lỗi", align: "right", render: (r) => <span className="text-red-600">{formatNumber(r.defect)}</span> },
  { key: "wip", header: "Tồn/WIP", align: "right", render: (r) => formatNumber(r.wip) },
  { key: "passRate", header: "Tỷ lệ đạt", render: (r) => <div className="flex items-center gap-2"><ProgressBar value={r.passRate} tone="green" /><span className="w-14 text-right text-xs text-slate-500">{formatPercent(r.passRate)}</span></div> },
];

export function StageQuantityTable({
  data, orderValue, orderOptions, onOrderChange,
}: {
  data: StageQuantity[];
  orderValue: string;
  orderOptions: { value: string; label: string }[];
  onOrderChange: (v: string) => void;
}) {
  return (
    <Card
      title="Quản lý số lượng theo công đoạn"
      action={<OrderSelector value={orderValue} options={orderOptions} onChange={onOrderChange} />}
    >
      <DataTable columns={columns} data={data} rowKey={(r) => r.stage} />
    </Card>
  );
}
