import { Select } from "@shared/index";

export function OrderSelector({
  value, options, onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-slate-500">Chọn đơn hàng:</span>
      <Select value={value} options={options} onChange={onChange} className="min-w-[280px]" />
    </div>
  );
}
