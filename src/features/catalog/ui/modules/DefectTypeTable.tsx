import { DataTable, Badge, Button } from "@shared/index";
import type { Column } from "@shared/index";
import type { DefectType } from "../../model/types";
import { DEFECT_SEVERITY_LABEL, DEFECT_SEVERITY_TONE } from "../../model/constants";

export function DefectTypeTable({
  data, onEdit, onDelete,
}: { data: DefectType[]; onEdit: (d: DefectType) => void; onDelete: (d: DefectType) => void }) {
  const columns: Column<DefectType>[] = [
    { key: "code", header: "Mã lỗi" },
    { key: "name", header: "Tên loại lỗi" },
    { key: "severity", header: "Mức độ", render: (r) => <Badge tone={DEFECT_SEVERITY_TONE[r.severity]}>{DEFECT_SEVERITY_LABEL[r.severity]}</Badge> },
    {
      key: "actions", header: "", align: "right",
      render: (r) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" className="px-2 py-1 text-xs text-blue-600" onClick={() => onEdit(r)}>Sửa</Button>
          <Button variant="ghost" className="px-2 py-1 text-xs text-red-600" onClick={() => onDelete(r)}>Xoá</Button>
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} data={data} rowKey={(r) => r.id} />;
}
