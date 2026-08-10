import { useMutation, useQueryClient } from "@tanstack/react-query";
import { stageMutations } from "../api/mutations";
import type { StageFormValues } from "../model/types";

export function useCreateStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: StageFormValues) => stageMutations.create(v),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["stages"] }),
  });
}

export function useUpdateStage(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: StageFormValues) => stageMutations.update(id, v),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["stages"] }),
  });
}

export function useDeleteStage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => stageMutations.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["stages"] }),
  });
}
