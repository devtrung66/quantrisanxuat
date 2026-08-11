import clsx from "clsx";
import { Check } from "lucide-react";
import type { ProcessStep } from "../../model/types";

function formatDateTime(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const DOT: Record<string, string> = {
  done: "bg-green-500 border-green-500 text-white",
  active: "bg-blue-500 border-blue-500 text-white",
  pending: "bg-white border-slate-300 text-slate-400",
};

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <section>
      <h3 className="mb-3 text-base font-semibold text-slate-800">Quy trình</h3>
      {steps.length === 0 ? (
        <p className="text-sm text-slate-400">Chưa có quy trình.</p>
      ) : (
        <div className="rounded-lg border border-slate-100 px-5 py-5">
          <ol className="relative">
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <li key={s.key} className="flex gap-4 pb-6 last:pb-0">
                  {/* cột mốc + đường nối */}
                  <div className="relative flex flex-col items-center">
                    <span className={clsx("z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold", DOT[s.state])}>
                      {s.state === "done" ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    {!last && (
                      <span className={clsx("absolute top-8 h-full w-0.5", s.state === "done" ? "bg-green-300" : "bg-slate-200")} />
                    )}
                  </div>
                  {/* nội dung bước */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className={clsx("text-sm font-medium", s.state === "pending" ? "text-slate-400" : "text-slate-800")}>{s.label}</span>
                      {s.state === "active" && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">Hiện tại</span>}
                    </div>
                    {s.actor && (
                      <p className="mt-0.5 text-xs text-slate-500">
                        {s.actor}{s.at && <span className="text-slate-400"> · {formatDateTime(s.at)}</span>}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
}
