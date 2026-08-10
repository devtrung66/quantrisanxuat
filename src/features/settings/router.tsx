import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { SettingsPage } from "./ui/pages/SettingsPage";

export const settingsRoutes: RouteObject[] = [
  { path: ROUTES.settings, element: <SettingsPage /> },
];
