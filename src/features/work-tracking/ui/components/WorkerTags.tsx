import { workerColor } from "../../model/constants";
import { getWorkerName } from "../../adapters/workAdapter";

// Hiển thị nhiều người thực hiện, mỗi người 1 chip màu (như sheet khách)
export function WorkerTags({ ids }: { ids: string[] }) {
  if (ids.length === 0) return <span className="text-slate-300">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {ids.map((id) => {
        const name = getWorkerName(id);
        return (
          <span
            key={id}
            className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase ${workerColor(name)}`}
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}
