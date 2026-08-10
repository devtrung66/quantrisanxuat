import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { ProgressPage } from "./ui/pages/ProgressPage";

export const progressRoutes: RouteObject[] = [
  { path: ROUTES.progress, element: <ProgressPage /> },
];
