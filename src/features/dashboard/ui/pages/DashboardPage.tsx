import { useState } from "react";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Spinner } from "@shared/index";
import { useDashboardSummary } from "../../hooks/useDashboardSummary";
import { useOrdersInProgress } from "../../hooks/useOrdersInProgress";
import { useStageBars, useStageQuantities } from "../../hooks/useStageQuantities";
import { getMockOrderOptions } from "../../adapters/dashboardAdapter";
import { KpiCards } from "../components/KpiCards";
import { OrdersInProgressTable } from "../components/OrdersInProgressTable";
import { StageProgressChart } from "../components/StageProgressChart";
import { StageQuantityTable } from "../components/StageQuantityTable";
import { QuickEntryPanel } from "../components/QuickEntryPanel";

export function DashboardPage() {
  const orderOptions = getMockOrderOptions();
  const [order, setOrder] = useState(orderOptions[0].value);

  const summary = useDashboardSummary();
  const orders = useOrdersInProgress();
  const stageBars = useStageBars();
  const stageQty = useStageQuantities();

  if (summary.isLoading || !summary.data) return <Spinner />;

  return (
    <PageContainer>
      <div className="space-y-6">
        <KpiCards s={summary.data} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {orders.data && <OrdersInProgressTable data={orders.data} />}
          {stageBars.data && <StageProgressChart data={stageBars.data} />}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            {stageQty.data && (
              <StageQuantityTable
                data={stageQty.data}
                orderValue={order}
                orderOptions={orderOptions}
                onOrderChange={setOrder}
              />
            )}
          </div>
          <QuickEntryPanel />
        </div>
      </div>
    </PageContainer>
  );
}
