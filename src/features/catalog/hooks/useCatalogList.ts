import { useQuery } from "@tanstack/react-query";
import { catalogQueries } from "../api/queries";
import type { CatalogTab } from "../model/constants";

export function useCatalogList(tab: CatalogTab) {
  return useQuery({
    queryKey: ["catalog", tab],
    queryFn: () => catalogQueries.list(tab),
  });
}
