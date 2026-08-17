import { EmptyState } from "@shared/index";
import type { StageAllocation } from "../../model/types";
import { StageAllocationTable } from "./StageAllocationTable";

export function PlanSxctSection({
  allocations, poId,
}: {
  allocations: StageAllocation[];
  poId: string;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">Thông tin kế hoạch SXCT</h3>
        <span className="text-xs text-slate-400">Giao việc cho từng công đoạn theo quy trình</span>
      </div>
      {allocations.length === 0 ? (
        <div className="rounded-lg border border-slate-100 px-3 py-1">
          <EmptyState text="Chưa có kế hoạch sản xuất chi tiết" />
        </div>
      ) : (
        <StageAllocationTable allocations={allocations} poId={poId} />
      )}
    </section>
  );
}