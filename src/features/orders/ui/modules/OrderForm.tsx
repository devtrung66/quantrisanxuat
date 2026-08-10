import { useState } from "react";
import { Button } from "@shared/index";
import { orderFormSchema } from "../../model/schemas";
import { ORDER_STATUS_LABEL } from "../../model/constants";
import type { Order, OrderFormValues } from "../../model/types";

const EMPTY: OrderFormValues = {
  code: "", customer: "", product: "", planQty: 0,
  orderDate: "", dueDate: "", status: "pending", note: "",
};

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400";

export function OrderForm({
  initial, submitting, onSubmit, onCancel,
}: {
  initial?: Order;
  submitting?: boolean;
  onSubmit: (v: OrderFormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<OrderFormValues>(
    initial
      ? { code: initial.code, customer: initial.customer, product: initial.product, planQty: initial.planQty, orderDate: initial.orderDate, dueDate: initial.dueDate, status: initial.status, note: initial.note ?? "" }
      : EMPTY
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof OrderFormValues, v: string | number) => setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const parsed = orderFormSchema.safeParse(values);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { e[i.path[0] as string] = i.message; });
      setErrors(e);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Mã đơn hàng" error={errors.code}>
          <input className={inputCls} value={values.code} onChange={(e) => set("code", e.target.value)} />
        </Field>
        <Field label="Khách hàng" error={errors.customer}>
          <input className={inputCls} value={values.customer} onChange={(e) => set("customer", e.target.value)} />
        </Field>
        <Field label="Sản phẩm" error={errors.product}>
          <input className={inputCls} value={values.product} onChange={(e) => set("product", e.target.value)} />
        </Field>
        <Field label="Số lượng kế hoạch" error={errors.planQty}>
          <input type="number" className={inputCls} value={values.planQty} onChange={(e) => set("planQty", Number(e.target.value))} />
        </Field>
        <Field label="Ngày đặt" error={errors.orderDate}>
          <input type="date" className={inputCls} value={values.orderDate} onChange={(e) => set("orderDate", e.target.value)} />
        </Field>
        <Field label="Hạn giao" error={errors.dueDate}>
          <input type="date" className={inputCls} value={values.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
        </Field>
        <Field label="Trạng thái" error={errors.status}>
          <select className={inputCls} value={values.status} onChange={(e) => set("status", e.target.value)}>
            {Object.entries(ORDER_STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Ghi chú">
        <textarea className={inputCls} rows={3} value={values.note} onChange={(e) => set("note", e.target.value)} />
      </Field>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Huỷ</Button>
        <Button onClick={submit} disabled={submitting}>{submitting ? "Đang lưu..." : "Lưu"}</Button>
      </div>
    </div>
  );
}
