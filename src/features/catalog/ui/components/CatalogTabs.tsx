import clsx from "clsx";
import { CATALOG_TAB_LABEL } from "../../model/constants";
import type { CatalogTab } from "../../model/constants";

export function CatalogTabs({ value, onChange }: { value: CatalogTab; onChange: (t: CatalogTab) => void }) {
  const tabs = Object.entries(CATALOG_TAB_LABEL) as [CatalogTab, string][];
  return (
    <div className="flex gap-1 border-b border-slate-200">
      {tabs.map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={clsx(
            "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition",
            value === key ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
