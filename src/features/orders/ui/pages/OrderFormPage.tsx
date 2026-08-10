import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, Button } from "@shared/index";
import { useOrderDetail } from "../../hooks/useOrderDetail";
import { useCreateOrder, useUpdateOrder } from "../../hooks/useOrderMutation";
import { OrderForm } from "../modules/OrderForm";
import type { OrderFormValues } from "../../model/types";

export function OrderFormPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const isEdit = !!id;

  const detail = useOrderDetail(id);
  const create = useCreateOrder();
  const update = useUpdateOrder(id ?? "");

  const submitting = create.isPending || update.isPending;

  const onSubmit = (values: OrderFormValues) => {
    const done = () => nav("/orders");
    if (isEdit) update.mutate(values, { onSuccess: done });
    else create.mutate(values, { onSuccess: done });
  };

  if (isEdit && detail.isLoading) return <PageContainer><Spinner /></PageContainer>;

  return (
    <PageContainer>
      <div className="mb-4">
        <Button variant="ghost" onClick={() => nav("/orders")}>← Danh sách</Button>
      </div>
      <Card title={isEdit ? "Sửa đơn hàng" : "Thêm đơn hàng"}>
        <OrderForm
          initial={detail.data}
          submitting={submitting}
          onSubmit={onSubmit}
          onCancel={() => nav("/orders")}
        />
      </Card>
    </PageContainer>
  );
}
