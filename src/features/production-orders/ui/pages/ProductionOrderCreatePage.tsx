import { useNavigate } from "react-router-dom";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, Button } from "@shared/index";
import { useSourceOrders } from "../../hooks/useProductionOrderList";
import { useCreateProductionOrder } from "../../hooks/useProductionOrderMutation";
import { ProductionOrderForm } from "../modules/ProductionOrderForm";
import type { ProductionOrderValues } from "../../model/types";

export function ProductionOrderCreatePage() {
  const nav = useNavigate();
  const sources = useSourceOrders();
  const create = useCreateProductionOrder();

  const onSubmit = (v: ProductionOrderValues) => {
    create.mutate(v, { onSuccess: () => nav("/production-orders") });
  };

  return (
    <PageContainer>
      <div className="mb-4">
        <Button variant="ghost" onClick={() => nav("/production-orders")}>← Danh sách</Button>
      </div>
      <Card title="Tạo lệnh sản xuất">
        {sources.isLoading || !sources.data ? (
          <Spinner />
        ) : (
          <ProductionOrderForm
            sources={sources.data}
            submitting={create.isPending}
            serverError={create.isError ? (create.error as Error).message : undefined}
            onSubmit={onSubmit}
            onCancel={() => nav("/production-orders")}
          />
        )}
      </Card>
    </PageContainer>
  );
}
