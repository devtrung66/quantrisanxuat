import { Info, Plus } from "lucide-react";
import type { BomTemplate } from "../../model/norm.types";

// 1 chip BĐM (bảng định mức mẫu) — giống row liên kết ở Thông tin chung
function TemplateRow({ tpl }: { tpl: BomTemplate }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2.5">
      <div className="flex min-w-0 items-center gap-4 text-sm">
        <span className="font-medium text-slate-800">{tpl.code}</span>
        <span className="truncate text-slate-700">{tpl.productName}</span>
      </div>
      <button aria-label="Chi tiết" className="shrink-0 text-slate-300 hover:text-slate-500">
        <Info className="h-4 w-4" />
      </button>
    </div>
  );
}

export function BomTemplateList({ templates }: { templates: BomTemplate[] }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
        <span className="text-slate-400">▤</span> BĐM NVL
      </div>
      <div className="space-y-2">
        {templates.map((t) => <TemplateRow key={t.id} tpl={t} />)}
        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
          <Plus className="h-4 w-4" /> Thêm BĐM NVL
        </button>
      </div>
    </div>
  );
}
