import clsx from "clsx";
import { ReactNode } from "react";

const TONES: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  slate: "bg-slate-100 text-slate-600",
};

export function Badge({ tone = "slate", children }: { tone?: keyof typeof TONES; children: ReactNode }) {
  return <span className={clsx("inline-block rounded-full px-2 py-0.5 text-xs font-medium", TONES[tone])}>{children}</span>;
}
