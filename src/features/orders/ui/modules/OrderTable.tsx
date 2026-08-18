import { DataTable, ProgressBar, formatNumber, formatDate, Button } from "@shared/index";
import type { Column } from "@shared/index";
import type { Order } from "../../model/types";
import { OrderStatusBadge } from "../components/OrderStatusBadge";

interface Props {
  data: Order[];
  onView: (o: Order) => void;
  onEdit: (o: Order) => void;
  onDelete: (o: Order) => void;
}

export function OrderTable({ data, onView, onEdit, onDelete }: Props) {
  const columns: Column<Order>[] = [
    { key: "code", header: "Tên LSX", width: "100px", render: (r) => <span className="font-medium text-slate-800">{r.code}</span> },
    { key: "content", header: "Nội dung", width: "260px", render: (r) => <span className="block truncate text-slate-600" title={r.content}>{r.content}</span> },
    { key: "customer", header: "Khách hàng", width: "130px" },
    { key: "chassisNumber", header: "Số Khung", width: "110px", align: "center" },
    { key: "containerCode", header: "Mã số thùng", width: "110px", align: "center" },
    { key: "planQty", header: "Số lượng", width: "90px", align: "right", render: (r) => formatNumber(r.planQty) },
    { key: "progress", header: "Tiến độ", width: "140px", render: (r) => <ProgressBar value={r.progress} showLabel /> },
    { key: "status", header: "Trạng thái", width: "120px", align: "center", render: (r) => <OrderStatusBadge status={r.status} /> },
    { key: "startDate", header: "Ngày bắt đầu", width: "116px", align: "center", render: (r) => formatDate(r.startDate) },
    { key: "dueDate", header: "Ngày hoàn thành", width: "128px", align: "center", render: (r) => formatDate(r.dueDate) },
    {
      key: "actions", header: "", width: "140px", align: "center",
      render: (r) => (
        <div className="flex justify-center gap-1">
          <Button variant="ghost" className="px-2 py-1 text-xs" onClick={() => onView(r)}>Xem</Button>
          <Button variant="ghost" className="px-2 py-1 text-xs text-blue-600" onClick={() => onEdit(r)}>Sửa</Button>
          <Button variant="ghost" className="px-2 py-1 text-xs text-red-600" onClick={() => onDelete(r)}>Xoá</Button>
        </div>
      ),
    },
  ];
  return <DataTable columns={columns} data={data} rowKey={(r) => r.id} />;
}