import { ReactNode } from "react";
import clsx from "clsx";

export function ReportSummaryCard({
  label, value, tone = "slate", icon,
}: {
  label: string;
  value: string;
  tone?: "blue" | "green" | "red" | "slate";
  icon?: ReactNode;
}) {
  const toneCls = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    slate: "text-slate-800",
  }[tone];
  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-100 p-4">
      <div className="flex items-center gap-2 text-slate-400">{icon}<span className="text-[13px]">{label}</span></div>
      <p className={clsx("mt-1 text-2xl font-bold", toneCls)}>{value}</p>
    </div>
  );
}
