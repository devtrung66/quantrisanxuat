import { Card, Badge, ProgressBar, formatNumber, formatPercent } from "@shared/index";
import { STAGE_STATE_LABEL, STAGE_STATE_TONE } from "../../model/constants";
import type { Stage } from "../../model/types";
import { WipIndicator } from "./WipIndicator";

function passRate(s: Stage) {
  const total = s.todayStandard + s.todayDefect;
  if (total <= 0) return 0;
  return (s.todayStandard / total) * 100;
}

export function StageCard({ stage, onClick }: { stage: Stage; onClick: () => void }) {
  const pr = passRate(stage);
  return (
    <button onClick={onClick} className="text-left">
      <Card className="h-full transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">{stage.order}</span>
            <span className="font-semibold text-slate-800">{stage.name}</span>
          </div>
          <Badge tone={STAGE_STATE_TONE[stage.state]}>{STAGE_STATE_LABEL[stage.state]}</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div><p className="text-xs text-slate-400">Đạt chuẩn</p><p className="font-semibold text-green-600">{formatNumber(stage.todayStandard)}</p></div>
          <div><p className="text-xs text-slate-400">Lỗi</p><p className="font-semibold text-red-600">{formatNumber(stage.todayDefect)}</p></div>
          <div><p className="text-xs text-slate-400">Tồn/WIP</p><p><WipIndicator wip={stage.wip} /></p></div>
          <div><p className="text-xs text-slate-400">Định mức</p><p className="font-semibold text-slate-700">{formatNumber(stage.standardOutput)}</p></div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
            <span>Tỷ lệ đạt</span><span>{formatPercent(pr)}</span>
          </div>
          <ProgressBar value={pr} tone="green" />
        </div>
      </Card>
    </button>
  );
}
