import { useState } from "react";
import { Button } from "@shared/index";
import { stageFormSchema } from "../../model/schemas";
import { STAGE_STATE_LABEL } from "../../model/constants";
import type { Stage, StageFormValues } from "../../model/types";

const EMPTY: StageFormValues = { name: "", order: 1, state: "active", standardOutput: 0, defectLimit: 0 };
const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function StageForm({
  initial, submitting, onSubmit, onCancel,
}: {
  initial?: Stage;
  submitting?: boolean;
  onSubmit: (v: StageFormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<StageFormValues>(
    initial
      ? { name: initial.name, order: initial.order, state: initial.state, standardOutput: initial.standardOutput, defectLimit: initial.defectLimit }
      : EMPTY
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof StageFormValues, v: string | number) => setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const parsed = stageFormSchema.safeParse(values);
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
        <Field label="Tên công đoạn" error={errors.name}>
          <input className={inputCls} value={values.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Thứ tự" error={errors.order}>
          <input type="number" className={inputCls} value={values.order} onChange={(e) => set("order", Number(e.target.value))} />
        </Field>
        <Field label="Định mức / ca" error={errors.standardOutput}>
          <input type="number" className={inputCls} value={values.standardOutput} onChange={(e) => set("standardOutput", Number(e.target.value))} />
        </Field>
        <Field label="Ngưỡng lỗi cho phép (%)" error={errors.defectLimit}>
          <input type="number" step="0.1" className={inputCls} value={values.defectLimit} onChange={(e) => set("defectLimit", Number(e.target.value))} />
        </Field>
        <Field label="Trạng thái" error={errors.state}>
          <select className={inputCls} value={values.state} onChange={(e) => set("state", e.target.value)}>
            {Object.entries(STAGE_STATE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Huỷ</Button>
        <Button onClick={submit} disabled={submitting}>{submitting ? "Đang lưu..." : "Lưu"}</Button>
      </div>
    </div>
  );
}
