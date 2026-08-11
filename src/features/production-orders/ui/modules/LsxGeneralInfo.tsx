import {
  ListChecks, CalendarDays, ClipboardList, Building2, Clock, AlignLeft, Info, Plus,
} from "lucide-react";
import { Badge, formatDate } from "@shared/index";
import type { ProductionOrder } from "../../model/types";
import { LsxInfoRow } from "../components/LsxInfoRow";
import { ProductNeedTable } from "./ProductNeedTable";

function formatDateTime(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
}

// khung chip đọc-only cho các trường liên kết (KHSX, Xưởng)
function LinkChip({ children, onInfo }: { children: React.ReactNode; onInfo?: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2.5">
      <div className="flex min-w-0 items-center gap-3 text-sm text-slate-700">{children}</div>
      <button
        onClick={onInfo}
        aria-label="Chi tiết"
        className="shrink-0 text-slate-300 hover:text-slate-500"
      >
        <Info className="h-4 w-4" />
      </button>
    </div>
  );
}

const ic = "h-4 w-4";

export function LsxGeneralInfo({ po }: { po: ProductionOrder }) {
  return (
    <section className="space-y-1">
      <h3 className="mb-3 text-base font-semibold text-slate-800">Thông tin chung</h3>

      <LsxInfoRow icon={<ListChecks className={ic} />} label="Mã LSX">
        <span className="font-medium text-slate-800">{po.code}</span>
      </LsxInfoRow>

      <LsxInfoRow icon={<CalendarDays className={ic} />} label="Ngày lập LSX">
        {formatDate(po.createdAt)}
      </LsxInfoRow>

      <LsxInfoRow icon={<ClipboardList className={ic} />} label="Kế hoạch sản xuất" align="start">
        <div className="space-y-2">
          {po.plan && (
            <LinkChip>
              <span className="font-medium text-slate-800">{po.plan.code}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{formatDate(po.plan.date)}</span>
              <Badge tone="slate">{po.plan.source}</Badge>
            </LinkChip>
          )}
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
            <Plus className="h-4 w-4" /> Thêm kế hoạch sản xuất
          </button>
        </div>
      </LsxInfoRow>

      <LsxInfoRow icon={<Building2 className={ic} />} label="Xưởng" align="start">
        {po.workshop ? (
          <LinkChip>
            <span className="font-medium text-slate-800">{po.workshop.code}</span>
            <span className="text-slate-700">{po.workshop.name}</span>
          </LinkChip>
        ) : (
          <span className="text-slate-400">—</span>
        )}
      </LsxInfoRow>

      <LsxInfoRow icon={<Clock className={ic} />} label="Khoảng thời gian SX dự kiến">
        {formatDateTime(po.plannedStart)} - {formatDateTime(po.plannedEnd)}
      </LsxInfoRow>

      <LsxInfoRow icon={<AlignLeft className={ic} />} label="Mô tả">
        {po.description ? (
          <span className="text-slate-700">{po.description}</span>
        ) : (
          <button className="text-slate-400 hover:text-slate-600">Thêm mô tả</button>
        )}
      </LsxInfoRow>

      <div className="pt-6">
        <h3 className="mb-3 text-base font-semibold text-slate-800">Danh sách sản phẩm cần sản xuất</h3>
        <ProductNeedTable data={po.products ?? []} />
      </div>
    </section>
  );
}
