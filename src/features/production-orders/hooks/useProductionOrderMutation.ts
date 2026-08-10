import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poMutations } from "../api/mutations";
import type { ProductionOrderValues } from "../model/types";

export function useCreateProductionOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: ProductionOrderValues) => poMutations.create(values),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["production-orders"] }),
  });
}
