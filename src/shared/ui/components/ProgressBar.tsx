import clsx from "clsx";
import { toneByPercent } from "../theme/tokens";

const TONE_BG: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

interface Props {
  value: number;           // 0..100
  showLabel?: boolean;
  className?: string;
  tone?: "auto" | "green" | "blue" | "amber" | "red";
}

export function ProgressBar({ value, showLabel, className, tone = "auto" }: Props) {
  const t = tone === "auto" ? toneByPercent(value) : tone;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <div className="h-2 flex-1 rounded-full bg-slate-200 overflow-hidden">
        <div className={clsx("h-full rounded-full transition-all", TONE_BG[t])} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="text-xs text-slate-500 w-10 text-right">{pct}%</span>}
    </div>
  );
}
