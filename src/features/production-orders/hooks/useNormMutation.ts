import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poMutations } from "../api/mutations";
import type { NormRow } from "../model/norm.types";

export function useNormMutation(poId: string) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["production-orders", "norm", poId] });

  const addNvl = useMutation({
    mutationFn: (input: { material: string; unit: string; normPerUnit: number; belongProduct: string; belongBtp?: string }) =>
      poMutations.addNvl(poId, input),
    onSuccess: invalidate,
  });

  const updateNvl = useMutation({
    mutationFn: (p: { rowId: string; patch: Partial<Pick<NormRow, "normPerUnit" | "material" | "unit" | "belongProduct" | "belongBtp">> }) =>
      poMutations.updateNvl(poId, p.rowId, p.patch),
    onSuccess: invalidate,
  });

  const removeNvl = useMutation({
    mutationFn: (rowId: string) => poMutations.removeNvl(poId, rowId),
    onSuccess: invalidate,
  });

  return { addNvl, updateNvl, removeNvl };
}