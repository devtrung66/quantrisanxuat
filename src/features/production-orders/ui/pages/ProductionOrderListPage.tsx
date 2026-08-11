import { useNavigate } from "react-router-dom";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, DataTable, Badge, Spinner, EmptyState, Button, formatNumber } from "@shared/index";
import type { Column } from "@shared/index";
import { useProductionOrderList } from "../../hooks/useProductionOrderList";
import { PO_STATUS_LABEL, PO_STATUS_TONE } from "../../model/constants";
import type { ProductionOrder } from "../../model/types";

function formatDate(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function ProductionOrderListPage() {
  const nav = useNavigate();
  const { data, isLoading } = useProductionOrderList();

  const columns: Column<ProductionOrder>[] = [
    {
      key: "code", header: "Mã lệnh SX",
      render: (r) => (
        <button
          onClick={() => nav(`/production-orders/${r.id}`)}
          className="font-medium text-blue-600 hover:underline"
        >
          {r.code}
        </button>
      ),
    },
    { key: "orderCode", header: "Đơn hàng" },
    { key: "customer", header: "Khách hàng" },
    { key: "product", header: "Sản phẩm" },
    { key: "totalQty", header: "Số lượng", align: "right", render: (r) => formatNumber(r.totalQty) },
    { key: "status", header: "Trạng thái", render: (r) => <Badge tone={PO_STATUS_TONE[r.status]}>{PO_STATUS_LABEL[r.status]}</Badge> },
    { key: "createdAt", header: "Ngày tạo", render: (r) => formatDate(r.createdAt) },
  ];

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Danh sách lệnh sản xuất</h2>
          <Button onClick={() => nav("/production-orders/new")}>+ Tạo lệnh sản xuất</Button>
        </div>
        <Card>
          {isLoading ? <Spinner /> : !data || data.length === 0 ? <EmptyState text="Chưa có lệnh sản xuất" /> : (
            <DataTable columns={columns} data={data} rowKey={(r) => r.id} />
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
