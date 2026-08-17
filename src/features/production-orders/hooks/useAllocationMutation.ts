import { useMutation, useQueryClient } from "@tanstack/react-query";
import { poMutations } from "../api/mutations";

type AllocPatch = {
  quantity?: number;
  assignee?: string;
  state?: "pending" | "active" | "done";
  startDate?: string;
  endDate?: string;
};

export function useAllocationMutation(poId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: { stage: string; patch: AllocPatch }) =>
      poMutations.updateAllocation(poId, p.stage, p.patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["production-orders", "detail", poId] }),
  });
}