import { Search } from "lucide-react";
import { Select, Button } from "@shared/index";
import { useOrderFilterStore } from "../../state/orderFilterStore";
import { ORDER_STATUS_LABEL } from "../../model/constants";

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  ...Object.entries(ORDER_STATUS_LABEL).map(([value, label]) => ({ value, label })),
];

export function OrderFilters({ onCreate }: { onCreate: () => void }) {
  const { keyword, status, setKeyword, setStatus, reset } = useOrderFilterStore();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm mã đơn / khách hàng / sản phẩm..."
          className="w-72 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400"
        />
      </div>
      <Select value={status} options={statusOptions} onChange={(v) => setStatus(v as any)} />
      <Button variant="ghost" onClick={reset}>Xoá lọc</Button>
      <div className="ml-auto">
        <Button onClick={onCreate}>+ Thêm đơn hàng</Button>
      </div>
    </div>
  );
}
