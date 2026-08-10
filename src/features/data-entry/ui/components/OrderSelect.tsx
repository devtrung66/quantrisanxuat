import { entryInputCls } from "./EntryFormField";
import { ORDER_OPTIONS } from "../../adapters/dataEntryAdapter";

export function OrderSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className={entryInputCls} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">-- Chọn đơn hàng --</option>
      {ORDER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
