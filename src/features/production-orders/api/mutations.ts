import { productionOrderService } from "../services/productionOrderService";
import type { ProductionOrderValues } from "../model/types";

export const poMutations = {
  create: (values: ProductionOrderValues) => productionOrderService.create(values),
  addComment: (poId: string, content: string) => productionOrderService.addComment(poId, content),
};
