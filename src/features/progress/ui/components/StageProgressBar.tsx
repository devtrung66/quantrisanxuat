import { ProgressBar } from "@shared/index";
import type { StageStep } from "../../model/types";
import { STAGE_STATUS_LABEL } from "../../model/constants";

const TONE = { done: "green", active: "blue", pending: "amber" } as const;

export function StageProgressBar({ step }: { step: StageStep }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{step.stage}</span>
        <span className="text-xs text-slate-400">{STAGE_STATUS_LABEL[step.status]}</span>
      </div>
      <ProgressBar value={step.progress} tone={TONE[step.status]} showLabel />
    </div>
  );
}
