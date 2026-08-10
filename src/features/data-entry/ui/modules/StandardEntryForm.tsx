import { useState } from "react";
import { Button } from "@shared/index";
import { standardEntrySchema } from "../../model/schemas";
import type { StandardEntryValues } from "../../model/types";
import { EntryFormField, entryInputCls } from "../components/EntryFormField";
import { OrderSelect } from "../components/OrderSelect";
import { StageSelect } from "../components/StageSelect";
import { QuantityInput } from "../components/QuantityInput";

const EMPTY: StandardEntryValues = { orderCode: "", stage: "", quantity: 0, note: "" };

export function StandardEntryForm({
  submitting, onSubmit,
}: {
  submitting?: boolean;
  onSubmit: (v: StandardEntryValues) => void;
}) {
  const [values, setValues] = useState<StandardEntryValues>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof StandardEntryValues, v: string | number) => setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const parsed = standardEntrySchema.safeParse(values);
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
      <EntryFormField label="Số lượng đạt chuẩn" required error={errors.quantity}>
        <QuantityInput value={values.quantity} onChange={(v) => set("quantity", v)} />
      </EntryFormField>
      <EntryFormField label="Ghi chú">
        <textarea className={entryInputCls} rows={2} value={values.note} onChange={(e) => set("note", e.target.value)} />
      </EntryFormField>
      <div className="flex justify-end">
        <Button onClick={submit} disabled={submitting} className="bg-green-600 hover:bg-green-700">
          {submitting ? "Đang lưu..." : "Ghi nhận đạt chuẩn"}
        </Button>
      </div>
    </div>
  );
}
