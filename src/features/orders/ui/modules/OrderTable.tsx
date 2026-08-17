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
    { key: "code", header: "Tên LSX", render: (r) => <span className="font-medium text-slate-800">{r.code}</span> },
    { key: "content", header: "Nội dung", render: (r) => <span className="block max-w-[220px] truncate text-slate-600" title={r.content}>{r.content}</span> },
    { key: "customer", header: "Khách hàng" },
    { key: "chassisNumber", header: "Số Khung" },
    { key: "containerCode", header: "Mã số thùng" },
    { key: "planQty", header: "Số lượng", align: "right", render: (r) => formatNumber(r.planQty) },
    { key: "progress", header: "Tiến độ", render: (r) => <ProgressBar value={r.progress} showLabel /> },
    { key: "status", header: "Trạng thái", render: (r) => <OrderStatusBadge status={r.status} /> },
    { key: "startDate", header: "Ngày bắt đầu", render: (r) => formatDate(r.startDate) },
    { key: "dueDate", header: "Ngày hoàn thành", render: (r) => formatDate(r.dueDate) },
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