import { useNavigate } from "react-router-dom";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState, Button } from "@shared/index";
import { useOrderList } from "../../hooks/useOrderList";
import { useDeleteOrder } from "../../hooks/useOrderMutation";
import { useOrderFilterStore } from "../../state/orderFilterStore";
import { PAGE_SIZE } from "../../model/constants";
import { OrderFilters } from "../modules/OrderFilters";
import { OrderTable } from "../modules/OrderTable";
import type { Order } from "../../model/types";

export function OrderListPage() {
  const nav = useNavigate();
  const { data, isLoading } = useOrderList();
  const del = useDeleteOrder();
  const { page, setPage } = useOrderFilterStore();

  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const onDelete = (o: Order) => {
    if (confirm(`Xoá đơn hàng ${o.code}?`)) del.mutate(o.id);
  };

  return (
    <PageContainer>
      <div className="space-y-4">
        <OrderFilters onCreate={() => nav("/orders/new")} />
        <Card>
          {isLoading ? (
            <Spinner />
          ) : !data || data.items.length === 0 ? (
            <EmptyState text="Không có đơn hàng phù hợp" />
          ) : (
            <>
              <OrderTable
                data={data.items}
                onView={(o) => nav(`/orders/${o.id}`)}
                onEdit={(o) => nav(`/orders/${o.id}/edit`)}
                onDelete={onDelete}
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">Tổng: {total} đơn hàng</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Trước</Button>
                  <span className="text-sm text-slate-600">Trang {page}/{totalPages}</span>
                  <Button variant="ghost" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Sau →</Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
