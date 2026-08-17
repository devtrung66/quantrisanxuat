import { useState } from "react";
import { Button } from "@shared/index";
import { orderFormSchema } from "../../model/schemas";
import { ORDER_STATUS_LABEL } from "../../model/constants";
import type { Order, OrderFormValues } from "../../model/types";

const EMPTY: OrderFormValues = {
  code: "", content: "", customer: "", chassisNumber: "", containerCode: "",
  product: "", planQty: 0, startDate: "", orderDate: "", dueDate: "", status: "pending", note: "",
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
      ? {
          code: initial.code, content: initial.content, customer: initial.customer,
          chassisNumber: initial.chassisNumber, containerCode: initial.containerCode,
          product: initial.product, planQty: initial.planQty, startDate: initial.startDate,
          orderDate: initial.orderDate, dueDate: initial.dueDate, status: initial.status, note: initial.note ?? "",
        }
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
    onSubmit(parsed.data as OrderFormValues);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Tên LSX" error={errors.code}>
          <input className={inputCls} value={values.code} onChange={(e) => set("code", e.target.value)} />
        </Field>
        <Field label="Khách hàng" error={errors.customer}>
          <input className={inputCls} value={values.customer} onChange={(e) => set("customer", e.target.value)} />
        </Field>
        <Field label="Số Khung" error={errors.chassisNumber}>
          <input className={inputCls} value={values.chassisNumber} onChange={(e) => set("chassisNumber", e.target.value)} />
        </Field>
        <Field label="Mã số thùng" error={errors.containerCode}>
          <input className={inputCls} value={values.containerCode} onChange={(e) => set("containerCode", e.target.value)} />
        </Field>
        <Field label="Số lượng" error={errors.planQty}>
          <input type="number" className={inputCls} value={values.planQty} onChange={(e) => set("planQty", Number(e.target.value))} />
        </Field>
        <Field label="Trạng thái" error={errors.status}>
          <select className={inputCls} value={values.status} onChange={(e) => set("status", e.target.value)}>
            {Object.entries(ORDER_STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
        <Field label="Ngày bắt đầu" error={errors.startDate}>
          <input type="date" className={inputCls} value={values.startDate} onChange={(e) => set("startDate", e.target.value)} />
        </Field>
        <Field label="Ngày hoàn thành" error={errors.dueDate}>
          <input type="date" className={inputCls} value={values.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
        </Field>
      </div>
      <Field label="Nội dung" error={errors.content}>
        <textarea className={inputCls} rows={2} value={values.content} onChange={(e) => set("content", e.target.value)} />
      </Field>
      <Field label="Ghi chú">
        <textarea className={inputCls} rows={2} value={values.note} onChange={(e) => set("note", e.target.value)} />
      </Field>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Huỷ</Button>
        <Button onClick={submit} disabled={submitting}>{submitting ? "Đang lưu..." : "Lưu"}</Button>
      </div>
    </div>
  );
}