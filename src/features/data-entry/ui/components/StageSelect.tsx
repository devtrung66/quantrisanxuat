import { entryInputCls } from "./EntryFormField";
import { STAGE_OPTIONS } from "../../adapters/dataEntryAdapter";

export function StageSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select className={entryInputCls} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">-- Chọn công đoạn --</option>
      {STAGE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
