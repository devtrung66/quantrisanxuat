import { RouteObject } from "react-router-dom";
import { DashboardPage } from "./ui/pages/DashboardPage";
import { ROUTES } from "@/app/routes";

export const dashboardRoutes: RouteObject[] = [
  { path: ROUTES.dashboard, index: true, element: <DashboardPage /> },
];
