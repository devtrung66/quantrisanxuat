import { formatNumber } from "@shared/index";
import type { StageAllocation } from "../../model/types";
import { StageAllocationRow } from "../components/StageAllocationRow";

export function StageAllocationTable({
  allocations, totalQty, onChange,
}: {
  allocations: StageAllocation[];
  totalQty: number;
  onChange: (index: number, patch: Partial<StageAllocation>) => void;
}) {
  const firstOk = allocations[0]?.quantity === totalQty;
  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-slate-100">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="py-2 px-2 text-center text-[13px] font-medium text-slate-500 w-10">#</th>
              <th className="py-2 px-2 text-left text-[13px] font-medium text-slate-500">Công đoạn</th>
              <th className="py-2 px-2 text-right text-[13px] font-medium text-slate-500 w-40">Số lượng</th>
              <th className="py-2 px-2 text-left text-[13px] font-medium text-slate-500 w-40">Bắt đầu</th>
              <th className="py-2 px-2 text-left text-[13px] font-medium text-slate-500 w-40">Kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((a, i) => (
              <StageAllocationRow
                key={a.stage}
                index={i}
                alloc={a}
                prevQty={i === 0 ? null : allocations[i - 1].quantity}
                onChange={(patch) => onChange(i, patch)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className={`mt-2 text-sm ${firstOk ? "text-green-600" : "text-red-600"}`}>
        Công đoạn đầu: {formatNumber(allocations[0]?.quantity ?? 0)} / Tổng: {formatNumber(totalQty)}
        {firstOk ? " ✓" : " — phải bằng tổng số lượng"}
      </div>
    </div>
  );
}
