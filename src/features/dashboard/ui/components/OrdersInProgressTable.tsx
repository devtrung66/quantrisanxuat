import { Card, DataTable, ProgressBar, formatNumber, formatDate } from "@shared/index";
import type { Column } from "@shared/index";
import type { OrderInProgress } from "../../model/types";

const columns: Column<OrderInProgress>[] = [
  { key: "code", header: "Mã đơn hàng" },
  { key: "customer", header: "Khách hàng" },
  { key: "product", header: "Sản phẩm" },
  { key: "planQty", header: "SL kế hoạch", align: "right", render: (r) => formatNumber(r.planQty) },
  { key: "progress", header: "Tiến độ", render: (r) => <ProgressBar value={r.progress} showLabel /> },
  { key: "dueDate", header: "Hạn giao", render: (r) => formatDate(r.dueDate) },
];

export function OrdersInProgressTable({ data }: { data: OrderInProgress[] }) {
  return (
    <Card title="Đơn hàng đang thực hiện" action={<a href="#" className="text-[13px] text-blue-600 hover:underline">Xem tất cả →</a>}>
      <DataTable columns={columns} data={data} rowKey={(r) => r.id} />
    </Card>
  );
}
