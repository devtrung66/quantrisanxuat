import { DataTable, Badge, Button } from "@shared/index";
import type { Column } from "@shared/index";
import type { Product } from "../../model/types";

export function ProductTable({
  data, onEdit, onDelete,
}: { data: Product[]; onEdit: (p: Product) => void; onDelete: (p: Product) => void }) {
  const columns: Column<Product>[] = [
    { key: "code", header: "Mã SP" },
    { key: "name", header: "Tên sản phẩm" },
    { key: "unit", header: "Đơn vị" },
    { key: "active", header: "Trạng thái", render: (r) => <Badge tone={r.active ? "green" : "slate"}>{r.active ? "Đang bán" : "Ngừng"}</Badge> },
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
