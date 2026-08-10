import { useState } from "react";
import { Button, Select } from "@shared/index";
import { preferenceSchema } from "../../model/schemas";
import { THEME_LABEL, LANGUAGE_LABEL } from "../../model/constants";
import type { PreferenceValues } from "../../model/types";

const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400";

function Toggle({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {hint && <p className="text-xs text-slate-400">{hint}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-blue-600" : "bg-slate-300"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

const themeOptions = Object.entries(THEME_LABEL).map(([value, label]) => ({ value, label }));
const langOptions = Object.entries(LANGUAGE_LABEL).map(([value, label]) => ({ value, label }));

export function PreferencesForm({
  initial, submitting, saved, onSubmit,
}: {
  initial: PreferenceValues;
  submitting?: boolean;
  saved?: boolean;
  onSubmit: (v: PreferenceValues) => void;
}) {
  const [values, setValues] = useState<PreferenceValues>({ ...initial });
  const [error, setError] = useState("");
  const set = <K extends keyof PreferenceValues>(k: K, v: PreferenceValues[K]) => setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const parsed = preferenceSchema.safeParse(values);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ"); return; }
    setError("");
    onSubmit(parsed.data);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Giao diện</span>
          <Select value={values.theme} options={themeOptions} onChange={(v) => set("theme", v as any)} className="w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Ngôn ngữ</span>
          <Select value={values.language} options={langOptions} onChange={(v) => set("language", v as any)} className="w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Ngưỡng cảnh báo WIP</span>
          <input type="number" min={0} className={inputCls} value={values.wipThreshold} onChange={(e) => set("wipThreshold", Number(e.target.value))} />
        </label>
      </div>

      <div className="space-y-2">
        <Toggle label="Thông báo qua email" hint="Nhận email tổng hợp sản lượng hằng ngày" checked={values.emailNotify} onChange={(v) => set("emailNotify", v)} />
        <Toggle label="Cảnh báo vượt ngưỡng lỗi" hint="Hiện cảnh báo khi công đoạn vượt tỷ lệ lỗi cho phép" checked={values.defectAlert} onChange={(v) => set("defectAlert", v)} />
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}

      <div className="flex items-center gap-3 pt-2">
        <Button onClick={submit} disabled={submitting}>{submitting ? "Đang lưu..." : "Lưu tuỳ chọn"}</Button>
        {saved && <span className="text-sm text-green-600">✓ Đã lưu</span>}
      </div>
    </div>
  );
}
