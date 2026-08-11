import { Plus, Filter, MoreHorizontal } from "lucide-react";
import { DataTable, Badge, formatDate, EmptyState } from "@shared/index";
import type { Column } from "@shared/index";
import type { LsxTask } from "../../model/types";
import {
  TASK_STATUS_LABEL, TASK_STATUS_TONE,
  TASK_PRIORITY_LABEL, TASK_PRIORITY_TONE,
} from "../../model/constants";

const columns: Column<LsxTask>[] = [
  { key: "title", header: "Công việc" },
  { key: "assignee", header: "Phụ trách" },
  { key: "dueDate", header: "Hạn", render: (r) => formatDate(r.dueDate) },
  { key: "priority", header: "Ưu tiên", render: (r) => <Badge tone={TASK_PRIORITY_TONE[r.priority]}>{TASK_PRIORITY_LABEL[r.priority]}</Badge> },
  { key: "status", header: "Trạng thái", render: (r) => <Badge tone={TASK_STATUS_TONE[r.status]}>{TASK_STATUS_LABEL[r.status]}</Badge> },
];

function ToolBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      title={label} aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
    >
      {icon}
    </button>
  );
}

export function TasksSection({ tasks }: { tasks: LsxTask[] }) {
  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-800">Công việc</h3>
        {tasks.length > 0 && (
          <span className="text-sm text-slate-400">({done}/{tasks.length} hoàn thành)</span>
        )}
      </div>
      <div className="rounded-lg border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
          <span className="text-sm text-slate-600">Danh sách công việc theo LSX</span>
          <div className="flex items-center gap-0.5">
            <ToolBtn icon={<Plus className="h-4 w-4" />} label="Thêm công việc" />
            <ToolBtn icon={<Filter className="h-4 w-4" />} label="Lọc" />
            <ToolBtn icon={<MoreHorizontal className="h-4 w-4" />} label="Thêm" />
          </div>
        </div>
        <div className="px-3 py-1">
          {tasks.length === 0 ? (
            <EmptyState text="Chưa có công việc nào cho lệnh sản xuất này" />
          ) : (
            <DataTable columns={columns} data={tasks} rowKey={(r) => r.id} />
          )}
        </div>
      </div>
    </section>
  );
}
