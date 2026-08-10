import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { ProductionOrderListPage } from "./ui/pages/ProductionOrderListPage";
import { ProductionOrderCreatePage } from "./ui/pages/ProductionOrderCreatePage";

export const productionOrderRoutes: RouteObject[] = [
  { path: ROUTES.productionOrders, element: <ProductionOrderListPage /> },
  { path: "/production-orders/new", element: <ProductionOrderCreatePage /> },
];
