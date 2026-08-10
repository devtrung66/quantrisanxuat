import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { CatalogPage } from "./ui/pages/CatalogPage";

export const catalogRoutes: RouteObject[] = [
  { path: ROUTES.catalog, element: <CatalogPage /> },
];
