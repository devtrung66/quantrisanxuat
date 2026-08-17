export const CATALOG_TAB = {
  product: "product",
  customer: "customer",
  defect: "defect",
  material: "material",
} as const;

export type CatalogTab = (typeof CATALOG_TAB)[keyof typeof CATALOG_TAB];

export const CATALOG_TAB_LABEL: Record<CatalogTab, string> = {
  product: "Sản phẩm",
  customer: "Khách hàng",
  defect: "Loại lỗi",
  material: "Nguyên vật liệu",
};

export const DEFECT_SEVERITY = {
  low: "low",
  medium: "medium",
  high: "high",
} as const;

export type DefectSeverity = (typeof DEFECT_SEVERITY)[keyof typeof DEFECT_SEVERITY];

export const DEFECT_SEVERITY_LABEL: Record<DefectSeverity, string> = {
  low: "Nhẹ",
  medium: "Trung bình",
  high: "Nghiêm trọng",
};

export const DEFECT_SEVERITY_TONE: Record<DefectSeverity, "green" | "amber" | "red"> = {
  low: "green",
  medium: "amber",
  high: "red",
};

// ĐVT cho NVL (đồng bộ với bảng định mức)
export const MATERIAL_UNITS = ["Lít", "Cái/Con", "Kg", "Mét", "Tấm", "Bộ", "Thùng"] as const;