import type {
  Product, Customer, DefectType, Material,
  ProductValues, CustomerValues, DefectValues, MaterialValues,
} from "../model/types";
import type { CatalogTab } from "../model/constants";
import {
  MOCK_PRODUCTS, MOCK_CUSTOMERS, MOCK_DEFECTS, MOCK_MATERIALS,
  nextProductId, nextCustomerId, nextDefectId, nextMaterialId,
} from "../adapters/catalogAdapter";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

type AnyValues = ProductValues | CustomerValues | DefectValues | MaterialValues;

function storeOf(tab: CatalogTab): any[] {
  if (tab === "product") return MOCK_PRODUCTS;
  if (tab === "customer") return MOCK_CUSTOMERS;
  if (tab === "defect") return MOCK_DEFECTS;
  return MOCK_MATERIALS;
}

export const catalogService = {
  async list(tab: CatalogTab): Promise<(Product | Customer | DefectType | Material)[]> {
    return delay([...storeOf(tab)]);
  },

  async create(tab: CatalogTab, values: AnyValues) {
    if (tab === "product") { const it: Product = { id: nextProductId(), ...(values as ProductValues) }; MOCK_PRODUCTS.unshift(it); return delay(it); }
    if (tab === "customer") { const it: Customer = { id: nextCustomerId(), ...(values as CustomerValues) }; MOCK_CUSTOMERS.unshift(it); return delay(it); }
    if (tab === "defect") { const it: DefectType = { id: nextDefectId(), ...(values as DefectValues) }; MOCK_DEFECTS.unshift(it); return delay(it); }
    const it: Material = { id: nextMaterialId(), ...(values as MaterialValues) }; MOCK_MATERIALS.unshift(it); return delay(it);
  },

  async update(tab: CatalogTab, id: string, values: AnyValues) {
    const store = storeOf(tab);
    const idx = store.findIndex((x: any) => x.id === id);
    if (idx < 0) throw new Error("Không tìm thấy");
    store[idx] = { ...store[idx], ...values };
    return delay(store[idx]);
  },

  async remove(tab: CatalogTab, id: string): Promise<void> {
    const store = storeOf(tab);
    const idx = store.findIndex((x: any) => x.id === id);
    if (idx >= 0) store.splice(idx, 1);
    return delay(undefined);
  },
};