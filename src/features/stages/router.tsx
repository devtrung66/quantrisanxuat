import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { StageListPage } from "./ui/pages/StageListPage";
import { StageDetailPage } from "./ui/pages/StageDetailPage";

export const stageRoutes: RouteObject[] = [
  { path: ROUTES.stages, element: <StageListPage /> },
  { path: "/stages/:id", element: <StageDetailPage /> },
];
