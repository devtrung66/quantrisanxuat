import { useQuery } from "@tanstack/react-query";
import { bomTemplateService } from "../services/bomTemplateService";

export function useBomTemplates() {
  return useQuery({
    queryKey: ["bom-templates", "all"],
    queryFn: () => bomTemplateService.listAll(),
  });
}

export function useBomTemplatesByProduct(productId: string | undefined) {
  return useQuery({
    queryKey: ["bom-templates", "product", productId],
    queryFn: () => bomTemplateService.byProduct(productId!),
    enabled: !!productId,
  });
}