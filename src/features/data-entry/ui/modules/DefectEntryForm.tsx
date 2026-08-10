import { useState } from "react";
import { Button } from "@shared/index";
import { defectEntrySchema } from "../../model/schemas";
import { DEFECT_REASONS } from "../../model/constants";
import type { DefectEntryValues } from "../../model/types";
import { EntryFormField, entryInputCls } from "../components/EntryFormField";
import { OrderSelect } from "../components/OrderSelect";
import { StageSelect } from "../components/StageSelect";
import { QuantityInput } from "../components/QuantityInput";

const EMPTY: DefectEntryValues = { orderCode: "", stage: "", quantity: 0, reason: "", note: "" };

export function DefectEntryForm({
  submitting, onSubmit,
}: {
  submitting?: boolean;
  onSubmit: (v: DefectEntryValues) => void;
}) {
  const [values, setValues] = useState<DefectEntryValues>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof DefectEntryValues, v: string | number) => setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const parsed = defectEntrySchema.safeParse(values);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { e[i.path[0] as string] = i.message; });
      setErrors(e);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
    setValues(EMPTY);
  };

  return (
    <div className="space-y-4">
      <EntryFormField label="Đơn hàng" required error={errors.orderCode}>
        <OrderSelect value={values.orderCode} onChange={(v) => set("orderCode", v)} />
      </EntryFormField>
      <EntryFormField label="Công đoạn" required error={errors.stage}>
        <StageSelect value={values.stage} onChange={(v) => set("stage", v)} />
      </EntryFormField>
      <EntryFormField label="Số lượng lỗi" required error={errors.quantity}>
        <QuantityInput value={values.quantity} onChange={(v) => set("quantity", v)} />
      </EntryFormField>
      <EntryFormField label="Nguyên nhân lỗi" required error={errors.reason}>
        <select className={entryInputCls} value={values.reason} onChange={(e) => set("reason", e.target.value)}>
          <option value="">-- Chọn nguyên nhân --</option>
          {DEFECT_REASONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </EntryFormField>
      <EntryFormField label="Ghi chú">
        <textarea className={entryInputCls} rows={2} value={values.note} onChange={(e) => set("note", e.target.value)} />
      </EntryFormField>
      <div className="flex justify-end">
        <Button onClick={submit} disabled={submitting} className="bg-red-600 hover:bg-red-700">
          {submitting ? "Đang lưu..." : "Ghi nhận hàng lỗi"}
        </Button>
      </div>
    </div>
  );
}
