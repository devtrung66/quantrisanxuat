import { Card } from "@shared/index";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";

export function QuickEntryPanel() {
  return (
    <Card title="Nhập liệu nhanh">
      <div className="space-y-3">
        <button className="flex w-full items-center gap-3 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-left hover:bg-green-100/70 transition">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white"><CheckCircle2 className="h-5 w-5" /></span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-green-700">Nhập hàng đạt chuẩn</span>
            <span className="block text-xs text-slate-500">Ghi nhận số lượng đạt</span>
          </span>
          <ChevronRight className="h-4 w-4 text-green-500" />
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-left hover:bg-red-100/70 transition">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white"><XCircle className="h-5 w-5" /></span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-red-700">Nhập hàng lỗi</span>
            <span className="block text-xs text-slate-500">Ghi nhận số lượng lỗi</span>
          </span>
          <ChevronRight className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </Card>
  );
}
