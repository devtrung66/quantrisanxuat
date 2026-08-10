import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { OrderListPage } from "./ui/pages/OrderListPage";
import { OrderDetailPage } from "./ui/pages/OrderDetailPage";
import { OrderFormPage } from "./ui/pages/OrderFormPage";

export const orderRoutes: RouteObject[] = [
  { path: ROUTES.orders, element: <OrderListPage /> },
  { path: "/orders/new", element: <OrderFormPage /> },
  { path: "/orders/:id", element: <OrderDetailPage /> },
  { path: "/orders/:id/edit", element: <OrderFormPage /> },
];
