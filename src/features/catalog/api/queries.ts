import { catalogService } from "../services/catalogService";
import type { CatalogTab } from "../model/constants";

export const catalogQueries = {
  list: (tab: CatalogTab) => catalogService.list(tab),
};
