import { productionOrderService } from "../services/productionOrderService";
import type { ProductionOrderValues } from "../model/types";

export const poMutations = {
  create: (values: ProductionOrderValues) => productionOrderService.create(values),
};
