import clsx from "clsx";
import { NORM_TAB_LABEL } from "../../model/norm.constants";
import type { NormTabKey } from "../../model/norm.constants";

// 2 tab: Định mức nguyên vật liệu | Định mức BTP
export function NormTabs({
  active, onChange,
}: {
  active: NormTabKey;
  onChange: (t: NormTabKey) => void;
}) {
  const tabs = Object.entries(NORM_TAB_LABEL) as [NormTabKey, string][];
  return (
    <div className="flex gap-1 border-b border-slate-200">
      {tabs.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={clsx(
            "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition",
            active === key
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
