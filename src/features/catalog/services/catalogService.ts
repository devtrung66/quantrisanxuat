import type {
  Product, Customer, DefectType,
  ProductValues, CustomerValues, DefectValues,
} from "../model/types";
import type { CatalogTab } from "../model/constants";
import {
  MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_DEFECTS,
  nextProductId, nextCustomerId, nextDefectId,
} from "../adapters/catalogAdapter";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const catalogService = {
  async list(tab: CatalogTab): Promise<(Product | Customer | DefectType)[]> {
    if (tab === "product") return delay([...MOCK_PRODUCTS]);
    if (tab === "customer") return delay([...MOCK_CUSTOMERS]);
    return delay([...MOCK_DEFECTS]);
  },

  async create(tab: CatalogTab, values: ProductValues | CustomerValues | DefectValues) {
    if (tab === "product") {
      const item: Product = { id: nextProductId(), ...(values as ProductValues) };
      MOCK_PRODUCTS.unshift(item); return delay(item);
    }
    if (tab === "customer") {
      const item: Customer = { id: nextCustomerId(), ...(values as CustomerValues) };
      MOCK_CUSTOMERS.unshift(item); return delay(item);
    }
    const item: DefectType = { id: nextDefectId(), ...(values as DefectValues) };
    MOCK_DEFECTS.unshift(item); return delay(item);
  },

  async update(tab: CatalogTab, id: string, values: ProductValues | CustomerValues | DefectValues) {
    const store =
      tab === "product" ? MOCK_PRODUCTS : tab === "customer" ? MOCK_CUSTOMERS : MOCK_DEFECTS;
    const idx = store.findIndex((x: any) => x.id === id);
    if (idx < 0) throw new Error("Không tìm thấy");
    (store as any)[idx] = { ...(store as any)[idx], ...values };
    return delay((store as any)[idx]);
  },

  async remove(tab: CatalogTab, id: string): Promise<void> {
    const store =
      tab === "product" ? MOCK_PRODUCTS : tab === "customer" ? MOCK_CUSTOMERS : MOCK_DEFECTS;
    const idx = store.findIndex((x: any) => x.id === id);
    if (idx >= 0) store.splice(idx, 1);
    return delay(undefined);
  },
};
