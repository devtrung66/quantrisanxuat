export const CATALOG_ENDPOINTS = {
  products: "/catalog/products",
  customers: "/catalog/customers",
  defects: "/catalog/defect-types",
  item: (tab: string, id: string) => `/catalog/${tab}/${id}`,
};
