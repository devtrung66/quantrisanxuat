import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState, Button, ProgressBar, formatNumber, formatDate } from "@shared/index";
import { useOrderDetail } from "../../hooks/useOrderDetail";
import { OrderStatusBadge } from "../components/OrderStatusBadge";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

export function OrderDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, isLoading } = useOrderDetail(id);

  if (isLoading) return <PageContainer><Spinner /></PageContainer>;
  if (!data) return <PageContainer><Card><EmptyState text="Không tìm thấy đơn hàng" /></Card></PageContainer>;

  return (
    <PageContainer>
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" onClick={() => nav("/orders")}>← Danh sách</Button>
        <Button onClick={() => nav(`/orders/${data.id}/edit`)}>Sửa</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title={`LSX ${data.code}`}>
          <Row label="Nội dung" value={<span className="max-w-[260px] text-right">{data.content}</span>} />
          <Row label="Khách hàng" value={data.customer} />
          <Row label="Số Khung" value={data.chassisNumber} />
          <Row label="Mã số thùng" value={data.containerCode || "-"} />
          <Row label="Trạng thái" value={<OrderStatusBadge status={data.status} />} />
          <Row label="Ngày bắt đầu" value={formatDate(data.startDate)} />
          <Row label="Ngày hoàn thành" value={formatDate(data.dueDate)} />
        </Card>
        <Card title="Sản lượng">
          <Row label="Số lượng" value={formatNumber(data.planQty)} />
          <Row label="Đã hoàn thành" value={formatNumber(data.doneQty)} />
          <div className="pt-4">
            <p className="mb-2 text-sm text-slate-500">Tiến độ</p>
            <ProgressBar value={data.progress} showLabel />
          </div>
          {data.note && <div className="pt-4"><p className="text-sm text-slate-500">Ghi chú</p><p className="mt-1 text-sm text-slate-700">{data.note}</p></div>}
        </Card>
      </div>
    </PageContainer>
  );
}