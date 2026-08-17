import { formatNumber } from "@shared/index";
import type { StageAllocation } from "../../model/types";

const th = "px-3 py-2 text-left text-[13px] font-medium text-slate-500 whitespace-nowrap";
const td = "px-3 py-2 text-sm text-slate-700 align-middle";
const cellInput = "w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400";

// Bảng NHẬP phân bổ khi TẠO lệnh SX (khác bảng editable ở trang chi tiết).
export function AllocationInputTable({
  allocations, totalQty, onChange,
}: {
  allocations: StageAllocation[];
  totalQty: number;
  onChange: (index: number, patch: Partial<StageAllocation>) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-100">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60">
            <th className={`${th} w-10 text-center`}>#</th>
            <th className={th}>Công đoạn</th>
            <th className={`${th} text-right`}>Số lượng (tổng: {formatNumber(totalQty)})</th>
            <th className={th}>Bắt đầu</th>
            <th className={th}>Kết thúc</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((a, i) => (
            <tr key={a.stage} className="border-b border-slate-50">
              <td className={`${td} text-center text-slate-400`}>{i + 1}</td>
              <td className={`${td} font-medium text-slate-800`}>{a.stage}</td>
              <td className={`${td} text-right`}>
                <input type="number" min={0} value={a.quantity}
                  onChange={(e) => onChange(i, { quantity: Number(e.target.value) })}
                  className={`${cellInput} w-28 text-right`} />
              </td>
              <td className={td}>
                <input type="date" value={a.startDate ?? ""} onChange={(e) => onChange(i, { startDate: e.target.value })} className={`${cellInput} w-32`} />
              </td>
              <td className={td}>
                <input type="date" value={a.endDate ?? ""} onChange={(e) => onChange(i, { endDate: e.target.value })} className={`${cellInput} w-32`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}