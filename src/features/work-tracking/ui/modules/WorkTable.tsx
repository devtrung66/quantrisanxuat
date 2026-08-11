import { Badge, formatDate, EmptyState } from "@shared/index";
import type { WorkItem } from "../../model/types";
import { WORK_STATUS_LABEL, WORK_STATUS_TONE } from "../../model/constants";
import { PriorityBadge } from "../components/PriorityBadge";
import { WorkerTags } from "../components/WorkerTags";

const th = "px-3 py-2.5 text-left text-[13px] font-medium text-slate-500 whitespace-nowrap border-b border-slate-200";
const td = "px-3 py-3 text-sm text-slate-700 align-top border-b border-slate-50";

export function WorkTable({ items }: { items: WorkItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-slate-100 px-3 py-1">
        <EmptyState text="Chưa có công việc cho tổ này" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-100">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50/60">
            <th className={`${th} w-10 text-center`}>#</th>
            <th className={`${th} w-24`}>Lệnh SX</th>
            <th className={`${th} min-w-[280px]`}>Nội dung công việc</th>
            <th className={th}>Ưu tiên</th>
            <th className={th}>Tình trạng</th>
            <th className={th}>Bắt đầu</th>
            <th className={th}>Kết thúc</th>
            <th className={`${th} min-w-[160px]`}>Người thực hiện</th>
            <th className={`${th} min-w-[140px]`}>Đánh giá</th>
            <th className={`${th} min-w-[180px]`}>Ý kiến quản đốc</th>
          </tr>
        </thead>
        <tbody>
          {items.map((w) => (
            <tr key={w.id} className="hover:bg-slate-50/40">
              <td className={`${td} text-center font-semibold text-slate-400`}>{w.seq}</td>
              <td className={`${td} font-medium text-slate-800`}>{w.lsxCode}</td>
              <td className={td}>
                <p className="whitespace-pre-line leading-relaxed">{w.content}</p>
              </td>
              <td className={td}><PriorityBadge priority={w.priority} /></td>
              <td className={td}><Badge tone={WORK_STATUS_TONE[w.status]}>{WORK_STATUS_LABEL[w.status]}</Badge></td>
              <td className={`${td} whitespace-nowrap`}>{formatDate(w.startDate)}</td>
              <td className={`${td} whitespace-nowrap`}>
                {formatDate(w.endDate)}
                {w.endNote && <span className="mt-0.5 block text-xs text-green-600">{w.endNote}</span>}
              </td>
              <td className={td}><WorkerTags ids={w.workers} /></td>
              <td className={td}>
                {w.evaluation ? <span className="text-slate-700">{w.evaluation}</span> : <span className="text-slate-300">—</span>}
              </td>
              <td className={td}>
                {w.supervisorNote ? <span className="text-slate-600">{w.supervisorNote}</span> : <span className="text-slate-300">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
