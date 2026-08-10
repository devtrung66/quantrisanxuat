import { useMutation, useQueryClient } from "@tanstack/react-query";
import { catalogMutations } from "../api/mutations";
import type { CatalogTab } from "../model/constants";
import type { ProductValues, CustomerValues, DefectValues } from "../model/types";

type AnyValues = ProductValues | CustomerValues | DefectValues;

export function useCatalogMutation(tab: CatalogTab) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["catalog", tab] });

  const create = useMutation({
    mutationFn: (v: AnyValues) => catalogMutations.create(tab, v),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: (p: { id: string; values: AnyValues }) => catalogMutations.update(tab, p.id, p.values),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: string) => catalogMutations.remove(tab, id),
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
