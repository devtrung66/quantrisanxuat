import clsx from "clsx";
import { Check } from "lucide-react";
import type { StageStep } from "../../model/types";

const DOT: Record<string, string> = {
  done: "bg-green-500 border-green-500 text-white",
  active: "bg-blue-500 border-blue-500 text-white animate-pulse",
  pending: "bg-white border-slate-300 text-slate-300",
};
const LINE: Record<string, string> = {
  done: "bg-green-400",
  active: "bg-blue-300",
  pending: "bg-slate-200",
};

export function ProgressTimeline({ steps }: { steps: StageStep[] }) {
  return (
    <div className="flex items-start">
      {steps.map((s, i) => (
        <div key={s.stage} className="flex flex-1 flex-col items-center">
          <div className="flex w-full items-center">
            <div className={clsx("h-1 flex-1", i === 0 ? "opacity-0" : LINE[s.status])} />
            <div className={clsx("flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold", DOT[s.status])}>
              {s.status === "done" ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <div className={clsx("h-1 flex-1", i === steps.length - 1 ? "opacity-0" : LINE[steps[i + 1]?.status ?? "pending"])} />
          </div>
          <span className="mt-2 text-center text-xs font-medium text-slate-600">{s.stage}</span>
          <span className="text-[11px] text-slate-400">{s.progress}%</span>
        </div>
      ))}
    </div>
  );
}
