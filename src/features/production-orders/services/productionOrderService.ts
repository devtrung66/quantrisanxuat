import type { ProductionOrder, ProductionOrderValues, SourceOrder } from "../model/types";
import {
  MOCK_PRODUCTION_ORDERS, SOURCE_ORDERS, nextPoId, nextPoCode,
} from "../adapters/productionOrderAdapter";

function delay<T>(v: T, ms = 300): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

// Business rule: tổng phân bổ công đoạn đầu (Cắt NL) phải = tổng số lượng.
// Các công đoạn sau có thể ≤ do hao hụt. Ở đây validate tổng cơ bản.
export function validateAllocation(totalQty: number, allocations: { quantity: number }[]): string | null {
  const anyNeg = allocations.some((a) => a.quantity < 0);
  if (anyNeg) return "Số lượng phân bổ không được âm";
  const first = allocations[0]?.quantity ?? 0;
  if (first !== totalQty) return `Công đoạn đầu phải bằng tổng số lượng (${totalQty})`;
  // Không công đoạn nào vượt công đoạn trước (dòng chảy sản xuất)
  for (let i = 1; i < allocations.length; i++) {
    if (allocations[i].quantity > allocations[i - 1].quantity) {
      return `Công đoạn "${(allocations[i] as any).stage ?? i + 1}" không được vượt công đoạn trước`;
    }
  }
  return null;
}

export const productionOrderService = {
  async list(): Promise<ProductionOrder[]> {
    return delay([...MOCK_PRODUCTION_ORDERS].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
  },

  async sourceOrders(): Promise<SourceOrder[]> {
    return delay([...SOURCE_ORDERS]);
  },

  async create(values: ProductionOrderValues): Promise<ProductionOrder> {
    const err = validateAllocation(values.totalQty, values.allocations);
    if (err) throw new Error(err);

    const src = SOURCE_ORDERS.find((o) => o.code === values.orderCode);
    const po: ProductionOrder = {
      id: nextPoId(),
      code: nextPoCode(),
      orderCode: values.orderCode,
      customer: src?.customer ?? "-",
      product: src?.product ?? "-",
      totalQty: values.totalQty,
      status: "draft",
      createdAt: new Date().toISOString(),
      allocations: values.allocations,
    };
    MOCK_PRODUCTION_ORDERS.unshift(po);
    return delay(po);
  },
};
