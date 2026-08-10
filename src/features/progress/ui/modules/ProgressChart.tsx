import { Card, BarChart, formatNumber, formatPercent } from "@shared/index";
import type { BarDatum } from "@shared/index";
import type { ProgressOverview } from "../../model/types";

export function ProgressChart({ overview }: { overview: ProgressOverview }) {
  const data: BarDatum[] = overview.bars.map((b) => ({ name: b.name, plan: b.plan, done: b.done }));
  return (
    <Card
      title="Tiến độ toàn nhà máy (theo công đoạn)"
      action={<span className="text-sm text-slate-500">Tổng: {formatPercent(overview.overall, 0)} ({formatNumber(overview.totalDone)}/{formatNumber(overview.totalPlan)})</span>}
    >
      <BarChart data={data} />
    </Card>
  );
}
