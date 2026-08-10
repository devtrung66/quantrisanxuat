import { entryInputCls } from "./EntryFormField";

export function QuantityInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      min={0}
      className={entryInputCls}
      value={value || ""}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder="Nhập số lượng"
    />
  );
}
