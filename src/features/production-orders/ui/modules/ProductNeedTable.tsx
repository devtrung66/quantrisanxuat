import { Plus, Filter, EyeOff, Maximize2, MoreHorizontal } from "lucide-react";
import { DataTable, formatNumber, EmptyState } from "@shared/index";
import type { Column } from "@shared/index";
import type { ProductNeed } from "../../model/types";

const columns: Column<ProductNeed>[] = [
  { key: "code", header: "Mã SP" },
  { key: "name", header: "Tên sản phẩm" },
  { key: "unit", header: "ĐVT" },
  { key: "quantity", header: "SL cần SX", align: "right", render: (r) => formatNumber(r.quantity) },
];

function ToolBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      title={label}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
    >
      {icon}
    </button>
  );
}

export function ProductNeedTable({ data }: { data: ProductNeed[] }) {
  return (
    <div className="rounded-lg border border-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="text-slate-400">▦</span>
          Danh sách sản phẩm theo LSX
        </div>
        <div className="flex items-center gap-0.5">
          <ToolBtn icon={<Plus className="h-4 w-4" />} label="Thêm sản phẩm" />
          <ToolBtn icon={<Filter className="h-4 w-4" />} label="Lọc" />
          <ToolBtn icon={<EyeOff className="h-4 w-4" />} label="Ẩn cột" />
          <ToolBtn icon={<Maximize2 className="h-4 w-4" />} label="Mở rộng" />
          <ToolBtn icon={<MoreHorizontal className="h-4 w-4" />} label="Thêm" />
        </div>
      </div>
      <div className="px-3 py-1">
        {data.length === 0 ? (
          <EmptyState text="Chưa có sản phẩm trong lệnh sản xuất này" />
        ) : (
          <DataTable columns={columns} data={data} rowKey={(r) => r.id} />
        )}
      </div>
    </div>
  );
}
