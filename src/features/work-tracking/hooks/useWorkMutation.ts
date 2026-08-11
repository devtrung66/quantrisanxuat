import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workMutations } from "../api/mutations";
import type { WorkItemFormValues } from "../model/schemas";

export function useCreateWorkItem(teamId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: WorkItemFormValues) => workMutations.create(teamId, values),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["work-items", teamId] }),
  });
}
