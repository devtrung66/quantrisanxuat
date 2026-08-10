import clsx from "clsx";
import { AlertTriangle } from "lucide-react";
import { formatNumber } from "@shared/index";
import { WIP_WARN_THRESHOLD } from "../../model/constants";

export function WipIndicator({ wip }: { wip: number }) {
  const warn = wip >= WIP_WARN_THRESHOLD;
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
      warn ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600")}>
      {warn && <AlertTriangle className="h-3 w-3" />}
      {formatNumber(wip)}
    </span>
  );
}
