import { DataTable, Badge, formatNumber, formatDate, EmptyState } from "@shared/index";
import type { Column } from "@shared/index";
import type { StageAllocation } from "../../model/types";
import { STAGE_STATE_LABEL, STAGE_STATE_TONE } from "../../model/constants";

const columns: Column<StageAllocation>[] = [
  { key: "idx", header: "#", align: "center", render: (_r) => null },
  { key: "stage", header: "Công đoạn" },
  { key: "assignee", header: "Phụ trách", render: (r) => r.assignee ?? "—" },
  { key: "quantity", header: "Số lượng", align: "right", render: (r) => formatNumber(r.quantity) },
  { key: "startDate", header: "Bắt đầu", render: (r) => formatDate(r.startDate) },
  { key: "endDate", header: "Kết thúc", render: (r) => formatDate(r.endDate) },
  {
    key: "state", header: "Trạng thái",
    render: (r) => <Badge tone={STAGE_STATE_TONE[r.state ?? "pending"]}>{STAGE_STATE_LABEL[r.state ?? "pending"]}</Badge>,
  },
];

export function PlanSxctSection({ allocations }: { allocations: StageAllocation[] }) {
  // gắn số thứ tự
  const cols: Column<StageAllocation>[] = columns.map((c) =>
    c.key === "idx"
      ? { ...c, render: (r: StageAllocation) => <span className="text-slate-400">{allocations.indexOf(r) + 1}</span> }
      : c
  );

  return (
    <section>
      <h3 className="mb-3 text-base font-semibold text-slate-800">Thông tin kế hoạch SXCT</h3>
      <div className="rounded-lg border border-slate-100 px-3 py-1">
        {allocations.length === 0 ? (
          <EmptyState text="Chưa có kế hoạch sản xuất chi tiết" />
        ) : (
          <DataTable columns={cols} data={allocations} rowKey={(r) => r.stage} />
        )}
      </div>
    </section>
  );
}
