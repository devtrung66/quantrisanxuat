interface Option { label: string; value: string; }
interface Props {
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  className?: string;
}

export function Select({ value, options, onChange, className }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-400 ${className ?? ""}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
