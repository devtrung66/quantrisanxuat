import { DataTable, formatNumber, EmptyState } from "@shared/index";
import type { Column } from "@shared/index";
import type { BtpRow } from "../../model/norm.types";
import { UnitBadge } from "../components/UnitBadge";

const columns: Column<BtpRow>[] = [
  { key: "idx", header: "#", align: "center", render: () => null },
  { key: "btp", header: "Bán thành phẩm", render: (r) => <span className="font-medium text-slate-800">{r.btp}</span> },
  { key: "unit", header: "ĐVT", render: (r) => <UnitBadge unit={r.unit} /> },
  { key: "normPerUnit", header: "Số lượng ĐM/1SP", align: "right", render: (r) => formatNumber(r.normPerUnit) },
  { key: "qtyByLsx", header: "SL BTP theo LSX", align: "right", render: (r) => <span className="font-medium text-slate-800">{formatNumber(r.qtyByLsx)}</span> },
  { key: "belongProduct", header: "Thuộc SP" },
];

export function BtpTable({ rows }: { rows: BtpRow[] }) {
  const cols: Column<BtpRow>[] = columns.map((c) =>
    c.key === "idx"
      ? { ...c, render: (r: BtpRow) => <span className="text-slate-400">{rows.indexOf(r) + 1}</span> }
      : c
  );
  return (
    <div className="rounded-lg border border-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <span className="text-sm text-slate-600">▦ Định mức Bán thành phẩm theo LSX</span>
      </div>
      <div className="px-3 py-1">
        {rows.length === 0 ? (
          <EmptyState text="Chưa có định mức bán thành phẩm" />
        ) : (
          <DataTable columns={cols} data={rows} rowKey={(r) => r.id} />
        )}
      </div>
    </div>
  );
}
