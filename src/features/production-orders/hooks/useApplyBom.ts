import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poMutations } from "../api/mutations";

export function useApplyBom(poId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: { templateId: string; qty: number; mode?: "replace" | "append" }) =>
      poMutations.applyBom(poId, p.templateId, p.qty, p.mode),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["production-orders", "norm", poId] }),
  });
}