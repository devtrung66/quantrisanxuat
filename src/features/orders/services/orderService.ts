import type { Order, OrderFilter, OrderFormValues } from "../model/types";
import { MOCK_ORDERS, nextId } from "../adapters/orderAdapter";
import { PAGE_SIZE } from "../model/constants";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

function computeProgress(done: number, plan: number): number {
  if (plan <= 0) return 0;
  return Math.round((done / plan) * 100);
}

export const orderService = {
  async list(filter: OrderFilter) {
    let rows = [...MOCK_ORDERS];
    const kw = filter.keyword.trim().toLowerCase();
    if (kw) {
      rows = rows.filter(
        (o) =>
          o.code.toLowerCase().includes(kw) ||
          o.customer.toLowerCase().includes(kw) ||
          o.content.toLowerCase().includes(kw) ||
          o.chassisNumber.toLowerCase().includes(kw) ||
          o.containerCode.toLowerCase().includes(kw) ||
          o.product.toLowerCase().includes(kw)
      );
    }
    if (filter.status !== "all") rows = rows.filter((o) => o.status === filter.status);

    const total = rows.length;
    const start = (filter.page - 1) * PAGE_SIZE;
    const items = rows.slice(start, start + PAGE_SIZE);
    return delay({ items, total });
  },

  async detail(id: string): Promise<Order | undefined> {
    return delay(MOCK_ORDERS.find((o) => o.id === id));
  },

  async create(values: OrderFormValues): Promise<Order> {
    const order: Order = {
      id: nextId(),
      ...values,
      containerCode: values.containerCode ?? "",
      product: values.product ?? "",
      orderDate: values.orderDate || values.startDate,
      note: values.note,
      doneQty: 0,
      progress: 0,
    };
    MOCK_ORDERS.unshift(order);
    return delay(order);
  },

  async update(id: string, values: OrderFormValues): Promise<Order> {
    const idx = MOCK_ORDERS.findIndex((o) => o.id === id);
    if (idx < 0) throw new Error("Không tìm thấy đơn hàng");
    const prev = MOCK_ORDERS[idx];
    const updated: Order = {
      ...prev,
      ...values,
      containerCode: values.containerCode ?? "",
      product: values.product ?? prev.product,
      orderDate: values.orderDate || prev.orderDate,
      progress: computeProgress(prev.doneQty, values.planQty),
    };
    MOCK_ORDERS[idx] = updated;
    return delay(updated);
  },

  async remove(id: string): Promise<void> {
    const idx = MOCK_ORDERS.findIndex((o) => o.id === id);
    if (idx >= 0) MOCK_ORDERS.splice(idx, 1);
    return delay(undefined);
  },
};