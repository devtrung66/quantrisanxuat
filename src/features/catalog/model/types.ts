import type { DefectSeverity } from "./constants";

export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  active: boolean;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  phone: string;
  address: string;
}

export interface DefectType {
  id: string;
  code: string;
  name: string;
  severity: DefectSeverity;
}

export type ProductValues = Omit<Product, "id">;
export type CustomerValues = Omit<Customer, "id">;
export type DefectValues = Omit<DefectType, "id">;

// Union tiện cho form động
export type CatalogItem = Product | Customer | DefectType;
