export const ROUTES = {
  dashboard: "/",
  orders: "/orders",
  productionOrders: "/production-orders",
  progress: "/progress",
  dataEntryStandard: "/data-entry/standard",
  dataEntryDefect: "/data-entry/defect",
  stages: "/stages",
  reports: "/reports",
  catalog: "/catalog",
  bomTemplates: "/bom-templates",
  settings: "/settings",
  workTracking: "/work-tracking",
} as const;

export const ROUTE_TITLES: Record<string, string> = {
  [ROUTES.dashboard]: "Tổng quan",
  [ROUTES.orders]: "Đơn hàng",
  [ROUTES.productionOrders]: "Lên đơn sản xuất",
  [ROUTES.progress]: "Theo dõi tiến độ",
  [ROUTES.dataEntryStandard]: "Nhập hàng đạt chuẩn",
  [ROUTES.dataEntryDefect]: "Nhập hàng lỗi",
  [ROUTES.stages]: "Quản lý công đoạn",
  [ROUTES.reports]: "Báo cáo",
  [ROUTES.catalog]: "Danh mục",
  [ROUTES.settings]: "Cài đặt",
  [ROUTES.workTracking]: "Theo dõi công việc",
};
