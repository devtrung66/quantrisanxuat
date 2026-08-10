import { FileText, ClipboardList, CheckCircle2, Percent } from "lucide-react";
import { StatCard, formatNumber, formatPercent } from "@shared/index";
import type { DashboardSummary } from "../../model/types";

export function KpiCards({ s }: { s: DashboardSummary }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={<FileText className="h-5 w-5" />} iconBg="bg-blue-500" label="Đơn hàng đang thực hiện" value={formatNumber(s.ordersInProgress)} unit="Đơn" />
      <StatCard icon={<ClipboardList className="h-5 w-5" />} iconBg="bg-green-500" label="Sản lượng kế hoạch" value={formatNumber(s.planQuantity)} unit="Sản phẩm" />
      <StatCard icon={<CheckCircle2 className="h-5 w-5" />} iconBg="bg-purple-500" label="Sản lượng đã hoàn thành" value={formatNumber(s.doneQuantity)} unit="Sản phẩm" />
      <StatCard icon={<Percent className="h-5 w-5" />} iconBg="bg-amber-500" label="Tỷ lệ hoàn thành" value={formatPercent(s.completionRate)} />
    </div>
  );
}
