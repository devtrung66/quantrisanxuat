import clsx from "clsx";
import { TEAMS } from "../../model/constants";

export function TeamTabs({
  active, onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-slate-200">
      {TEAMS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={clsx(
            "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition",
            active === t.id
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
