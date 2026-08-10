import { useState } from "react";
import { Button } from "@shared/index";
import { productSchema, customerSchema, defectSchema } from "../../model/schemas";
import { CATALOG_TAB, DEFECT_SEVERITY_LABEL } from "../../model/constants";
import type { CatalogTab } from "../../model/constants";
import type { CatalogItem } from "../../model/types";

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

const EMPTY: Record<CatalogTab, any> = {
  product: { code: "", name: "", unit: "", active: true },
  customer: { code: "", name: "", phone: "", address: "" },
  defect: { code: "", name: "", severity: "low" },
};

export function CatalogForm({
  tab, initial, submitting, onSubmit, onCancel,
}: {
  tab: CatalogTab;
  initial?: CatalogItem;
  submitting?: boolean;
  onSubmit: (v: any) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<any>(initial ? { ...initial } : { ...EMPTY[tab] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: string, v: any) => setValues((s: any) => ({ ...s, [k]: v }));

  const submit = () => {
    const schema = tab === CATALOG_TAB.product ? productSchema : tab === CATALOG_TAB.customer ? customerSchema : defectSchema;
    const { id, ...payload } = values;
    const parsed = schema.safeParse(payload);
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
        <Field label="Mã" error={errors.code}>
          <input className={inputCls} value={values.code} onChange={(e) => set("code", e.target.value)} />
        </Field>
        <Field label="Tên" error={errors.name}>
          <input className={inputCls} value={values.name} onChange={(e) => set("name", e.target.value)} />
        </Field>

        {tab === CATALOG_TAB.product && (
          <>
            <Field label="Đơn vị" error={errors.unit}>
              <input className={inputCls} value={values.unit} onChange={(e) => set("unit", e.target.value)} />
            </Field>
            <Field label="Trạng thái">
              <select className={inputCls} value={values.active ? "1" : "0"} onChange={(e) => set("active", e.target.value === "1")}>
                <option value="1">Đang bán</option>
                <option value="0">Ngừng</option>
              </select>
            </Field>
          </>
        )}

        {tab === CATALOG_TAB.customer && (
          <>
            <Field label="Điện thoại" error={errors.phone}>
              <input className={inputCls} value={values.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label="Địa chỉ" error={errors.address}>
              <input className={inputCls} value={values.address} onChange={(e) => set("address", e.target.value)} />
            </Field>
          </>
        )}

        {tab === CATALOG_TAB.defect && (
          <Field label="Mức độ" error={errors.severity}>
            <select className={inputCls} value={values.severity} onChange={(e) => set("severity", e.target.value)}>
              {Object.entries(DEFECT_SEVERITY_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel}>Huỷ</Button>
        <Button onClick={submit} disabled={submitting}>{submitting ? "Đang lưu..." : "Lưu"}</Button>
      </div>
    </div>
  );
}
