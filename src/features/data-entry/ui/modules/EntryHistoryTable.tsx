import { DataTable, Badge, formatNumber } from "@shared/index";
import type { Column } from "@shared/index";
import type { EntryRecord } from "../../model/types";
import { ENTRY_TYPE_LABEL, DEFECT_REASONS } from "../../model/constants";

function reasonLabel(v?: string) {
  if (!v) return "-";
  return DEFECT_REASONS.find((r) => r.value === v)?.label ?? v;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())} ${p(d.getDate())}/${p(d.getMonth() + 1)}`;
}

const columns: Column<EntryRecord>[] = [
  { key: "createdAt", header: "Thời gian", render: (r) => formatTime(r.createdAt) },
  { key: "orderCode", header: "Đơn hàng" },
  { key: "stage", header: "Công đoạn" },
  { key: "type", header: "Loại", render: (r) => <Badge tone={r.type === "standard" ? "green" : "red"}>{ENTRY_TYPE_LABEL[r.type]}</Badge> },
  { key: "quantity", header: "Số lượng", align: "right", render: (r) => formatNumber(r.quantity) },
  { key: "reason", header: "Nguyên nhân", render: (r) => reasonLabel(r.reason) },
];

export function EntryHistoryTable({ data }: { data: EntryRecord[] }) {
  return <DataTable columns={columns} data={data} rowKey={(r) => r.id} />;
}
