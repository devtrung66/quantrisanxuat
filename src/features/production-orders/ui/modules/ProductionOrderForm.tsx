import { useState } from "react";
import { Button, formatNumber } from "@shared/index";
import { STAGE_NAMES } from "@shared/model/stages";
import type { StageAllocation, SourceOrder, ProductionOrderValues } from "../../model/types";
import { AllocationInputTable } from "./AllocationInputTable";

// Dựng phân bổ 7 công đoạn từ tổng số lượng (giảm dần nhẹ theo hao hụt thực tế)
const RATIOS = [1, 0.97, 0.94, 0.9, 0.86, 0.82, 0.78];

function buildAllocations(total: number): StageAllocation[] {
  return STAGE_NAMES.map((stage, i) => ({
    stage,
    quantity: Math.round(total * (RATIOS[i] ?? 0.75)),
    startDate: "",
    endDate: "",
    assignee: "",
    state: "pending",
  }));
}

export function ProductionOrderForm({
  sources,
  submitting,
  serverError,
  onSubmit,
  onCancel,
}: {
  sources: SourceOrder[];
  submitting?: boolean;
  serverError?: string;
  onSubmit: (values: ProductionOrderValues) => void;
  onCancel: () => void;
}) {
  const [orderCode, setOrderCode] = useState("");
  const [totalQty, setTotalQty] = useState<number>(0);
  const [allocations, setAllocations] = useState<StageAllocation[]>([]);
  const [error, setError] = useState("");

  // Chọn đơn nguồn -> auto điền số lượng + dựng phân bổ (không bắt buộc)
  const pickOrder = (code: string) => {
    setOrderCode(code);
    const src = sources.find((s) => s.code === code);
    if (src) {
      setTotalQty(src.planQty);
      setAllocations(buildAllocations(src.planQty));
    }
    setError("");
  };

  // Gõ tổng số lượng -> dựng/cập nhật phân bổ ngay (kể cả chưa chọn đơn)
  const changeTotal = (v: number) => {
    setTotalQty(v);
    setAllocations(v > 0 ? buildAllocations(v) : []);
  };

  const changeAlloc = (index: number, patch: Partial<StageAllocation>) => {
    setAllocations((prev) => prev.map((a, i) => (i === index ? { ...a, ...patch } : a)));
  };

  const submit = () => {
    if (totalQty <= 0) { setError("Nhập tổng số lượng (> 0)."); return; }
    if (allocations.length === 0) { setError("Chưa có phân bổ công đoạn."); return; }
    setError("");
    onSubmit({
      orderCode: orderCode || "",
      totalQty,
      allocations,
    });
  };

  const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Đơn hàng nguồn <span className="text-slate-400">(tuỳ chọn)</span></span>
          <select className={inputCls} value={orderCode} onChange={(e) => pickOrder(e.target.value)}>
            <option value="">-- Chọn đơn hàng nguồn --</option>
            {sources.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} — {s.customer} — {s.product} ({formatNumber(s.planQty)})
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Tổng số lượng</span>
          <input
            type="number"
            min={0}
            value={totalQty || ""}
            onChange={(e) => changeTotal(Number(e.target.value))}
            placeholder="Nhập tổng số lượng"
            className={inputCls}
          />
        </label>
      </div>

      {allocations.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700">Phân bổ theo công đoạn</span>
            <span className="text-xs text-slate-400">Quy trình: {STAGE_NAMES.join(" → ")}</span>
          </div>
          <AllocationInputTable allocations={allocations} totalQty={totalQty} onChange={changeAlloc} />
        </div>
      )}

      {(error || serverError) && <p className="text-sm text-red-500">{error || serverError}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Huỷ</Button>
        <Button onClick={submit} disabled={submitting}>{submitting ? "Đang tạo..." : "Tạo lệnh sản xuất"}</Button>
      </div>
    </div>
  );
}