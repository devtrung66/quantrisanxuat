import { DataTable, Button } from "@shared/index";
import type { Column } from "@shared/index";
import type { Customer } from "../../model/types";

export function CustomerTable({
  data, onEdit, onDelete,
}: { data: Customer[]; onEdit: (c: Customer) => void; onDelete: (c: Customer) => void }) {
  const columns: Column<Customer>[] = [
    { key: "code", header: "Mã KH" },
    { key: "name", header: "Tên khách hàng" },
    { key: "phone", header: "Điện thoại" },
    { key: "address", header: "Địa chỉ" },
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
