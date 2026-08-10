import { orderService } from "../services/orderService";
import type { OrderFormValues } from "../model/types";

export const ordersMutations = {
  create: (values: OrderFormValues) => orderService.create(values),
  update: (id: string, values: OrderFormValues) => orderService.update(id, values),
  remove: (id: string) => orderService.remove(id),
};
