import { productionOrderService } from "../services/productionOrderService";
import { normService } from "../services/normService";

export const poQueries = {
  list: () => productionOrderService.list(),
  detail: (id: string) => productionOrderService.detail(id),
  sourceOrders: () => productionOrderService.sourceOrders(),
  comments: (id: string) => productionOrderService.comments(id),
  norm: (id: string) => normService.byProductionOrder(id),
};
