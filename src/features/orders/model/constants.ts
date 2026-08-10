export const ORDER_STATUS = {
  pending: "pending",
  in_progress: "in_progress",
  completed: "completed",
  cancelled: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Chờ sản xuất",
  in_progress: "Đang sản xuất",
  completed: "Hoàn thành",
  cancelled: "Đã huỷ",
};

export const ORDER_STATUS_TONE: Record<OrderStatus, "amber" | "blue" | "green" | "red"> = {
  pending: "amber",
  in_progress: "blue",
  completed: "green",
  cancelled: "red",
};

export const PAGE_SIZE = 8;
