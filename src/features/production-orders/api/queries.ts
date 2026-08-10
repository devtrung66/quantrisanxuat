import { productionOrderService } from "../services/productionOrderService";

export const poQueries = {
  list: () => productionOrderService.list(),
  sourceOrders: () => productionOrderService.sourceOrders(),
};
