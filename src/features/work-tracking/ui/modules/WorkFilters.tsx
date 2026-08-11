import { Search } from "lucide-react";
import { Select } from "@shared/index";
import { useWorkFilterStore } from "../../state/workFilterStore";
import { WORK_PRIORITY_LABEL, WORK_STATUS_LABEL } from "../../model/constants";

const priorityOptions = [
  { value: "all", label: "Tất cả ưu tiên" },
  ...Object.entries(WORK_PRIORITY_LABEL).map(([value, label]) => ({ value, label })),
];
const statusOptions = [
  { value: "all", label: "Tất cả tình trạng" },
  ...Object.entries(WORK_STATUS_LABEL).map(([value, label]) => ({ value, label })),
];

export function WorkFilters() {
  const { keyword, priority, status, setKeyword, setPriority, setStatus } = useWorkFilterStore();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm lệnh SX / nội dung..."
          className="w-72 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400"
        />
      </div>
      <Select value={priority} options={priorityOptions} onChange={(v: string) => setPriority(v as any)} />
      <Select value={status} options={statusOptions} onChange={(v: string) => setStatus(v as any)} />
    </div>
  );
}
