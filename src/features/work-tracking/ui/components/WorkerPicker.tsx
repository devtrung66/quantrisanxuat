import { WORKERS } from "../../adapters/workAdapter";
import { workerColor } from "../../model/constants";
import clsx from "clsx";

// Chọn nhiều người bằng cách bấm chip (bật/tắt).
export function WorkerPicker({
  selected, onChange,
}: {
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  return (
    <div className="flex flex-wrap gap-2">
      {WORKERS.map((w) => {
        const on = selected.includes(w.id);
        return (
          <button
            key={w.id}
            type="button"
            onClick={() => toggle(w.id)}
            className={clsx(
              "rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition",
              on ? workerColor(w.name) : "bg-slate-100 text-slate-400 hover:bg-slate-200"
            )}
          >
            {w.name}
          </button>
        );
      })}
    </div>
  );
}
