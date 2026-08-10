import { useState } from "react";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Select, Spinner, EmptyState } from "@shared/index";
import { useProgressOverview } from "../../hooks/useProgressOverview";
import { useOrderProgress } from "../../hooks/useOrderProgress";
import { PROGRESS_ORDER_OPTIONS } from "../../adapters/progressAdapter";
import { ProgressChart } from "../modules/ProgressChart";
import { ProgressTable } from "../modules/ProgressTable";
import { ProgressTimeline } from "../components/ProgressTimeline";

export function ProgressPage() {
  const [code, setCode] = useState(PROGRESS_ORDER_OPTIONS[0].value);
  const overview = useProgressOverview();
  const order = useOrderProgress(code);

  return (
    <PageContainer>
      <div className="space-y-6">
        {overview.isLoading || !overview.data ? <Spinner /> : <ProgressChart overview={overview.data} />}

        <Card
          title="Tiến độ theo đơn hàng"
          action={
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-slate-500">Chọn đơn hàng:</span>
              <Select value={code} options={PROGRESS_ORDER_OPTIONS} onChange={setCode} className="min-w-[280px]" />
            </div>
          }
        >
          {order.isLoading ? (
            <Spinner />
          ) : !order.data ? (
            <EmptyState text="Không có dữ liệu tiến độ cho đơn này" />
          ) : (
            <div className="space-y-8">
              <div className="rounded-lg bg-slate-50 px-6 py-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{order.data.orderCode} — {order.data.customer}</p>
                    <p className="text-xs text-slate-500">{order.data.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{order.data.overall}%</p>
                    <p className="text-xs text-slate-400">Tiến độ tổng</p>
                  </div>
                </div>
                <ProgressTimeline steps={order.data.steps} />
              </div>
              <ProgressTable steps={order.data.steps} />
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}
