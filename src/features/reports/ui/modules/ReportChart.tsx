import { Card, BarChart } from "@shared/index";
import type { BarDatum } from "@shared/index";
import type { ReportChartDatum } from "../../model/types";

export function ReportChart({ data }: { data: ReportChartDatum[] }) {
  const chartData: BarDatum[] = data.map((d) => ({ name: d.name, plan: d.plan, done: d.done }));
  return (
    <Card title="Sản lượng theo công đoạn (Kế hoạch vs Đạt chuẩn)">
      <BarChart data={chartData} />
    </Card>
  );
}
