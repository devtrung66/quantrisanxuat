import { DataTable, Badge, ProgressBar, formatNumber, formatPercent, Button } from "@shared/index";
import type { Column } from "@shared/index";
import type { Stage } from "../../model/types";
import { STAGE_STATE_LABEL, STAGE_STATE_TONE } from "../../model/constants";
import { WipIndicator } from "../components/WipIndicator";

function passRate(s: Stage) {
  const total = s.todayStandard + s.todayDefect;
  return total <= 0 ? 0 : (s.todayStandard / total) * 100;
}

export function StageTable({
  data, onEdit, onDelete, onView,
}: {
  data: Stage[];
  onEdit: (s: Stage) => void;
  onDelete: (s: Stage) => void;
  onView: (s: Stage) => void;
}) {
  const columns: Column<Stage>[] = [
    { key: "order", header: "#", align: "center", render: (r) => <span className="font-semibold text-slate-500">{r.order}</span> },
    { key: "name", header: "Công đoạn" },
    { key: "state", header: "Trạng thái", render: (r) => <Badge tone={STAGE_STATE_TONE[r.state]}>{STAGE_STATE_LABEL[r.state]}</Badge> },
    { key: "standardOutput", header: "Định mức", align: "right", render: (r) => formatNumber(r.standardOutput) },
    { key: "todayStandard", header: "Đạt chuẩn", align: "right", render: (r) => <span className="text-green-600">{formatNumber(r.todayStandard)}</span> },
    { key: "todayDefect", header: "Lỗi", align: "right", render: (r) => <span className="text-red-600">{formatNumber(r.todayDefect)}</span> },
    { key: "wip", header: "Tồn/WIP", align: "right", render: (r) => <WipIndicator wip={r.wip} /> },
    { key: "pass", header: "Tỷ lệ đạt", render: (r) => <div className="flex items-center gap-2"><ProgressBar value={passRate(r)} tone="green" /><span className="w-14 text-right text-xs text-slate-500">{formatPercent(passRate(r))}</span></div> },
    {
      key: "actions", header: "", align: "right",
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => onView(r)}>Xem</Button>
          <Button variant="ghost" className="px-2 py-1 text-xs text-blue-600" onClick={() => onEdit(r)}>Sửa</Button>
          <Button variant="ghost" className="px-2 py-1 text-xs text-red-600" onClick={() => onDelete(r)}>Xoá</Button>
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} data={data} rowKey={(r) => r.id} />;
}
