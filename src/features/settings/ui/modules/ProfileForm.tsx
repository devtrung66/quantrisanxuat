import { useState } from "react";
import { Button } from "@shared/index";
import { profileSchema } from "../../model/schemas";
import type { ProfileValues } from "../../model/types";

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

export function ProfileForm({
  initial, submitting, saved, onSubmit,
}: {
  initial: ProfileValues;
  submitting?: boolean;
  saved?: boolean;
  onSubmit: (v: ProfileValues) => void;
}) {
  const [values, setValues] = useState<ProfileValues>({ ...initial });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof ProfileValues, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const parsed = profileSchema.safeParse(values);
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
        <Field label="Họ và tên" error={errors.fullName}><input className={inputCls} value={values.fullName} onChange={(e) => set("fullName", e.target.value)} /></Field>
        <Field label="Email" error={errors.email}><input className={inputCls} value={values.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Điện thoại" error={errors.phone}><input className={inputCls} value={values.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        <Field label="Vai trò" error={errors.role}><input className={inputCls} value={values.role} onChange={(e) => set("role", e.target.value)} /></Field>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Button onClick={submit} disabled={submitting}>{submitting ? "Đang lưu..." : "Lưu hồ sơ"}</Button>
        {saved && <span className="text-sm text-green-600">✓ Đã lưu</span>}
      </div>
    </div>
  );
}
