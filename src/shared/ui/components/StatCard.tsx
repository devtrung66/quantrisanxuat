import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  icon: ReactNode;
  iconBg: string;
  label: string;
  value: string;
  unit?: string;
  href?: string;
}

export function StatCard({ icon, iconBg, label, value, unit, href }: Props) {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-100 p-5">
      <div className="flex items-start gap-3">
        <div className={clsx("h-11 w-11 rounded-lg flex items-center justify-center text-white", iconBg)}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-[13px] text-slate-500">{label}</p>
          <p className="mt-1">
            <span className="text-2xl font-bold text-slate-800">{value}</span>
            {unit && <span className="ml-1 text-xs text-slate-400">{unit}</span>}
          </p>
        </div>
      </div>
      <a className="mt-3 inline-flex items-center gap-1 text-[13px] text-blue-600 hover:underline" href={href ?? "#"}>
        Xem chi tiết →
      </a>
    </div>
  );
}
