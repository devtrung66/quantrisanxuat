import { DataTable, Badge, Button, formatNumber } from "@shared/index";
import type { Column } from "@shared/index";
import type { Material } from "../../model/types";

export function MaterialTable({
  data, onEdit, onDelete,
}: { data: Material[]; onEdit: (m: Material) => void; onDelete: (m: Material) => void }) {
  const columns: Column<Material>[] = [
    { key: "code", header: "Mã NVL", width: "120px" },
    { key: "name", header: "Tên nguyên vật liệu" },
    { key: "unit", header: "ĐVT", width: "110px", align: "center", render: (r) => <Badge tone="blue">{r.unit}</Badge> },
    { key: "price", header: "Đơn giá", width: "130px", align: "right", render: (r) => formatNumber(r.price) + " đ" },
    {
      key: "actions", header: "", width: "120px", align: "right",
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