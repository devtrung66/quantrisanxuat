import { DataTable, ProgressBar, formatNumber } from "@shared/index";
import type { Column } from "@shared/index";
import type { StageStep } from "../../model/types";
import { STAGE_STATUS_LABEL } from "../../model/constants";
import { Badge } from "@shared/index";

const TONE = { done: "green", active: "blue", pending: "amber" } as const;

const columns: Column<StageStep>[] = [
  { key: "stage", header: "Công đoạn" },
  { key: "status", header: "Trạng thái", render: (r) => <Badge tone={TONE[r.status]}>{STAGE_STATUS_LABEL[r.status]}</Badge> },
  { key: "plan", header: "Kế hoạch", align: "right", render: (r) => formatNumber(r.plan) },
  { key: "done", header: "Đã làm", align: "right", render: (r) => formatNumber(r.done) },
  { key: "progress", header: "Tiến độ", render: (r) => <ProgressBar value={r.progress} tone={TONE[r.status]} showLabel /> },
];

export function ProgressTable({ steps }: { steps: StageStep[] }) {
  return <DataTable columns={columns} data={steps} rowKey={(r) => r.stage} />;
}
