import { Card, BarChart } from "@shared/index";
import type { BarDatum } from "@shared/index";
import type { StageBar } from "../../model/types";

export function StageProgressChart({ data }: { data: StageBar[] }) {
  const chartData: BarDatum[] = data.map((d) => ({ name: d.name, plan: d.plan, done: d.done }));
  return (
    <Card title="Tiến độ chung (theo sản lượng)" action={<a href="#" className="text-[13px] text-blue-600 hover:underline">Xem chi tiết →</a>}>
      <BarChart data={chartData} />
    </Card>
  );
}
