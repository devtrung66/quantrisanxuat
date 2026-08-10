import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersMutations } from "../api/mutations";
import type { OrderFormValues } from "../model/types";

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: OrderFormValues) => ordersMutations.create(values),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useUpdateOrder(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: OrderFormValues) => ordersMutations.update(id, values),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useDeleteOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ordersMutations.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}
