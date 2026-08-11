import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@shared/ui/layout/AppLayout";
import { dashboardRoutes } from "@features/dashboard/router";
import { orderRoutes } from "@features/orders/router";
import { productionOrderRoutes } from "@features/production-orders/router";
import { dataEntryRoutes } from "@features/data-entry/router";
import { progressRoutes } from "@features/progress/router";
import { stageRoutes } from "@features/stages/router";
import { reportRoutes } from "@features/reports/router";
import { catalogRoutes } from "@features/catalog/router";
import { settingsRoutes } from "@features/settings/router";
import { workTrackingRoutes } from "@features/work-tracking/router";

// NotFound cho route không khớp
function NotFound() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h2 className="text-xl font-semibold text-slate-700">Không tìm thấy trang</h2>
      <p className="mt-2 text-sm text-slate-400">Đường dẫn không tồn tại.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      ...dashboardRoutes,
      ...orderRoutes,
      ...productionOrderRoutes,
      ...dataEntryRoutes,
      ...progressRoutes,
      ...stageRoutes,
      ...reportRoutes,
      ...catalogRoutes,
      ...settingsRoutes,
      ...workTrackingRoutes,
      { path: "*", element: <NotFound /> },
    ],
  },
]);
