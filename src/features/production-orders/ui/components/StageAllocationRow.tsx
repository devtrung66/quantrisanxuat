import { formatNumber } from "@shared/index";
import type { StageAllocation } from "../../model/types";

const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400";

export function StageAllocationRow({
  index, alloc, prevQty, onChange,
}: {
  index: number;
  alloc: StageAllocation;
  prevQty: number | null;   // số lượng công đoạn trước (null nếu là công đoạn đầu)
  onChange: (patch: Partial<StageAllocation>) => void;
}) {
  const over = prevQty !== null && alloc.quantity > prevQty;
  return (
    <tr className="border-b border-slate-50">
      <td className="py-2 px-2 text-center text-sm font-semibold text-slate-500">{index + 1}</td>
      <td className="py-2 px-2 text-sm text-slate-700">{alloc.stage}</td>
      <td className="py-2 px-2">
        <input
          type="number" min={0}
          className={`${inputCls} text-right ${over ? "border-red-400 bg-red-50" : ""}`}
          value={alloc.quantity || ""}
          onChange={(e) => onChange({ quantity: Number(e.target.value) })}
        />
        {over && <span className="mt-0.5 block text-[11px] text-red-500">Vượt CĐ trước ({formatNumber(prevQty!)})</span>}
      </td>
      <td className="py-2 px-2">
        <input type="date" className={inputCls} value={alloc.startDate} onChange={(e) => onChange({ startDate: e.target.value })} />
      </td>
      <td className="py-2 px-2">
        <input type="date" className={inputCls} value={alloc.endDate} onChange={(e) => onChange({ endDate: e.target.value })} />
      </td>
    </tr>
  );
}
