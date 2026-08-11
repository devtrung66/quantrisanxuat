import { useState } from "react";
import { Button, Select } from "@shared/index";
import { workItemSchema } from "../../model/schemas";
import type { WorkItemFormValues } from "../../model/schemas";
import {
  WORK_PRIORITY_LABEL, WORK_STATUS_LABEL, WORK_PRIORITY, WORK_STATUS,
} from "../../model/constants";
import { WorkerPicker } from "../components/WorkerPicker";

const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400";

const priorityOptions = Object.entries(WORK_PRIORITY_LABEL).map(([value, label]) => ({ value, label }));
const statusOptions = Object.entries(WORK_STATUS_LABEL).map(([value, label]) => ({ value, label }));

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-600">
        {label}{required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

const EMPTY: WorkItemFormValues = {
  lsxCode: "", content: "",
  priority: WORK_PRIORITY.normal, status: WORK_STATUS.doing,
  startDate: "", endDate: "", workers: [], evaluation: "", supervisorNote: "",
};

export function WorkForm({
  submitting, onSubmit, onCancel,
}: {
  submitting?: boolean;
  onSubmit: (v: WorkItemFormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<WorkItemFormValues>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = <K extends keyof WorkItemFormValues>(k: K, v: WorkItemFormValues[K]) =>
    setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const parsed = workItemSchema.safeParse(values);
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
        <Field label="Lệnh sản xuất" required error={errors.lsxCode}>
          <input className={inputCls} value={values.lsxCode} onChange={(e) => set("lsxCode", e.target.value)} placeholder="VD: L154" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Ưu tiên" error={errors.priority}>
            <Select value={values.priority} options={priorityOptions} onChange={(v: string) => set("priority", v as any)} className="w-full" />
          </Field>
          <Field label="Tình trạng" error={errors.status}>
            <Select value={values.status} options={statusOptions} onChange={(v: string) => set("status", v as any)} className="w-full" />
          </Field>
        </div>
      </div>

      <Field label="Nội dung công việc" required error={errors.content}>
        <textarea className={inputCls} rows={4} value={values.content} onChange={(e) => set("content", e.target.value)} placeholder="Mô tả công việc, mỗi ý một dòng..." />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Ngày bắt đầu" required error={errors.startDate}>
          <input type="date" className={inputCls} value={values.startDate} onChange={(e) => set("startDate", e.target.value)} />
        </Field>
        <Field label="Ngày kết thúc" required error={errors.endDate}>
          <input type="date" className={inputCls} value={values.endDate} onChange={(e) => set("endDate", e.target.value)} />
        </Field>
      </div>

      <Field label="Người thực hiện" required error={errors.workers}>
        <WorkerPicker selected={values.workers} onChange={(ids) => set("workers", ids)} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Đánh giá">
          <input className={inputCls} value={values.evaluation} onChange={(e) => set("evaluation", e.target.value)} placeholder="VD: Đạt đúng thời gian" />
        </Field>
        <Field label="Ý kiến quản đốc">
          <input className={inputCls} value={values.supervisorNote} onChange={(e) => set("supervisorNote", e.target.value)} />
        </Field>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Huỷ</Button>
        <Button onClick={submit} disabled={submitting}>{submitting ? "Đang lưu..." : "Thêm công việc"}</Button>
      </div>
    </div>
  );
}
