// Read API. Phase 1 uỷ quyền cho service (mock). Khi nối backend thật,
// đổi phần thân sang gọi client.get(ORDER_ENDPOINTS...).
import { orderService } from "../services/orderService";
import type { OrderFilter } from "../model/types";

export const ordersQueries = {
  list: (filter: OrderFilter) => orderService.list(filter),
  detail: (id: string) => orderService.detail(id),
};
