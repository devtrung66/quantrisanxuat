import { useState } from "react";
import { Button, Select, formatNumber } from "@shared/index";
import { productionOrderSchema } from "../../model/schemas";
import { ALLOCATION_STAGES } from "../../model/constants";
import type { ProductionOrderValues, StageAllocation, SourceOrder } from "../../model/types";
import { StageAllocationTable } from "./StageAllocationTable";

function buildAllocations(total: number): StageAllocation[] {
  const per = Math.floor(total / ALLOCATION_STAGES.length);
  return ALLOCATION_STAGES.map((stage, i) => ({
    stage,
    quantity: i === 0 ? total : per,   // CĐ đầu = tổng, còn lại chia đều (user chỉnh sau)
    startDate: "",
    endDate: "",
  }));
}

export function ProductionOrderForm({
  sources, submitting, serverError, onSubmit, onCancel,
}: {
  sources: SourceOrder[];
  submitting?: boolean;
  serverError?: string;
  onSubmit: (v: ProductionOrderValues) => void;
  onCancel: () => void;
}) {
  const [orderCode, setOrderCode] = useState("");
  const [totalQty, setTotalQty] = useState(0);
  const [allocations, setAllocations] = useState<StageAllocation[]>([]);
  const [error, setError] = useState<string>("");

  const orderOptions = [
    { value: "", label: "-- Chọn đơn hàng nguồn --" },
    ...sources.map((s) => ({ value: s.code, label: `${s.code} - ${s.customer} - ${s.product} (${formatNumber(s.planQty)})` })),
  ];

  const pickOrder = (code: string) => {
    setOrderCode(code);
    const src = sources.find((s) => s.code === code);
    const qty = src?.planQty ?? 0;
    setTotalQty(qty);
    setAllocations(buildAllocations(qty));
    setError("");
  };

  const changeTotal = (qty: number) => {
    setTotalQty(qty);
    setAllocations((prev) => prev.map((a, i) => (i === 0 ? { ...a, quantity: qty } : a)));
  };

  const changeAlloc = (index: number, patch: Partial<StageAllocation>) => {
    setAllocations((prev) => prev.map((a, i) => (i === index ? { ...a, ...patch } : a)));
  };

  const submit = () => {
    const payload: ProductionOrderValues = { orderCode, totalQty, allocations };
    const parsed = productionOrderSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ");
      return;
    }
    if (allocations[0]?.quantity !== totalQty) {
      setError(`Công đoạn đầu phải bằng tổng số lượng (${totalQty})`);
      return;
    }
    setError("");
    onSubmit(parsed.data);
  };

  const src = sources.find((s) => s.code === orderCode);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Đơn hàng nguồn</span>
          <Select value={orderCode} options={orderOptions} onChange={pickOrder} className="w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Tổng số lượng</span>
          <input type="number" min={0} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
            value={totalQty || ""} onChange={(e) => changeTotal(Number(e.target.value))} disabled={!orderCode} />
        </label>
      </div>

      {src && (
        <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Khách hàng: <b>{src.customer}</b> · Sản phẩm: <b>{src.product}</b> · SL kế hoạch: <b>{formatNumber(src.planQty)}</b>
        </div>
      )}

      {allocations.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-700">Phân bổ theo công đoạn</h4>
          <StageAllocationTable allocations={allocations} totalQty={totalQty} onChange={changeAlloc} />
        </div>
      )}

      {(error || serverError) && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error || serverError}</div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Huỷ</Button>
        <Button onClick={submit} disabled={submitting || !orderCode}>{submitting ? "Đang tạo..." : "Tạo lệnh sản xuất"}</Button>
      </div>
    </div>
  );
}
