import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { ReportPage } from "./ui/pages/ReportPage";

export const reportRoutes: RouteObject[] = [
  { path: ROUTES.reports, element: <ReportPage /> },
];
