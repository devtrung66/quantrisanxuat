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

// Nguyên vật liệu (nguồn cho định mức/BOM)
export interface Material {
  id: string;
  code: string;
  name: string;
  unit: string;   // ĐVT
  price: number;  // đơn giá tham khảo
}

export type ProductValues = Omit<Product, "id">;
export type CustomerValues = Omit<Customer, "id">;
export type DefectValues = Omit<DefectType, "id">;
export type MaterialValues = Omit<Material, "id">;

export type CatalogItem = Product | Customer | DefectType | Material;