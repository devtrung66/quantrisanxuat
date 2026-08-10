import { Badge } from "@shared/index";
import { ORDER_STATUS_LABEL, ORDER_STATUS_TONE } from "../../model/constants";
import type { OrderStatus } from "../../model/constants";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge tone={ORDER_STATUS_TONE[status]}>{ORDER_STATUS_LABEL[status]}</Badge>;
}
