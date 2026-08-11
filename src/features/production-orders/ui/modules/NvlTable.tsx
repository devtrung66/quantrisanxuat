import { useState } from "react";
import { Plus, Filter, EyeOff, Maximize2, MoreHorizontal, FunctionSquare, Hash } from "lucide-react";
import { formatNumber, EmptyState } from "@shared/index";
import type { NormRow } from "../../model/norm.types";
import { UnitBadge } from "../components/UnitBadge";

function ToolBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button title={label} aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600">
      {icon}
    </button>
  );
}

const th = "px-3 py-2.5 text-left text-[13px] font-medium text-slate-500 whitespace-nowrap";
const td = "px-3 py-2.5 text-sm text-slate-700 align-middle";

export function NvlTable({ rows }: { rows: NormRow[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allChecked = rows.length > 0 && selected.size === rows.length;

  const toggleAll = () =>
    setSelected(allChecked ? new Set() : new Set(rows.map((r) => r.id)));
  const toggle = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="rounded-lg border border-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <span className="text-sm text-slate-600">▦ Định mức Nguyên vật liệu theo LSX</span>
        <div className="flex items-center gap-0.5">
          <ToolBtn icon={<Plus className="h-4 w-4" />} label="Thêm dòng" />
          <ToolBtn icon={<Filter className="h-4 w-4" />} label="Lọc" />
          <ToolBtn icon={<EyeOff className="h-4 w-4" />} label="Ẩn cột" />
          <ToolBtn icon={<Maximize2 className="h-4 w-4" />} label="Mở rộng" />
          <ToolBtn icon={<MoreHorizontal className="h-4 w-4" />} label="Thêm" />
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="px-3 py-1"><EmptyState text="Chưa có định mức nguyên vật liệu" /></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className={`${th} w-10`}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} aria-label="Chọn tất cả" />
                </th>
                <th className={`${th} w-10 text-center`}>#</th>
                <th className={th}>Nguyên vật liệu</th>
                <th className={th}>ĐVT</th>
                <th className={`${th} text-right`}><span className="inline-flex items-center gap-1"><Hash className="h-3.5 w-3.5" />Số lượng ĐM/1SP</span></th>
                <th className={`${th} text-right`}><span className="inline-flex items-center gap-1"><FunctionSquare className="h-3.5 w-3.5" />SL NVL theo LSX</span></th>
                <th className={th}>Thuộc BTP</th>
                <th className={th}>Thuộc SP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className={`${td} text-center`}>
                    <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r.id)} aria-label={`Chọn ${r.material}`} />
                  </td>
                  <td className={`${td} text-center text-slate-400`}>{i + 1}</td>
                  <td className={`${td} font-medium text-slate-800`}>{r.material}</td>
                  <td className={td}><UnitBadge unit={r.unit} /></td>
                  <td className={`${td} text-right`}>{formatNumber(r.normPerUnit)}</td>
                  <td className={`${td} text-right font-medium text-slate-800`}>{formatNumber(r.qtyByLsx)}</td>
                  <td className={`${td} text-slate-500`}>{r.belongBtp ?? "—"}</td>
                  <td className={`${td} max-w-[220px] truncate`} title={r.belongProduct}>{r.belongProduct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
