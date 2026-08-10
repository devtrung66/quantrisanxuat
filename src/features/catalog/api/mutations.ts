import { catalogService } from "../services/catalogService";
import type { CatalogTab } from "../model/constants";
import type { ProductValues, CustomerValues, DefectValues } from "../model/types";

type AnyValues = ProductValues | CustomerValues | DefectValues;

export const catalogMutations = {
  create: (tab: CatalogTab, v: AnyValues) => catalogService.create(tab, v),
  update: (tab: CatalogTab, id: string, v: AnyValues) => catalogService.update(tab, id, v),
  remove: (tab: CatalogTab, id: string) => catalogService.remove(tab, id),
};
