export const ORDER_ENDPOINTS = {
  list: "/orders",
  detail: (id: string) => `/orders/${id}`,
  create: "/orders",
  update: (id: string) => `/orders/${id}`,
  remove: (id: string) => `/orders/${id}`,
};
