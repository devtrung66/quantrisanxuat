import { RouteObject } from "react-router-dom";
import { ROUTES } from "@/app/routes";
import { StandardEntryPage } from "./ui/pages/StandardEntryPage";
import { DefectEntryPage } from "./ui/pages/DefectEntryPage";

export const dataEntryRoutes: RouteObject[] = [
  { path: ROUTES.dataEntryStandard, element: <StandardEntryPage /> },
  { path: ROUTES.dataEntryDefect, element: <DefectEntryPage /> },
];
