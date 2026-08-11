import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { poQueries } from "../api/queries";
import { poMutations } from "../api/mutations";

export function useProductionOrderDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["production-orders", "detail", id],
    queryFn: () => poQueries.detail(id!),
    enabled: !!id,
  });
}

export function useLsxComments(id: string | undefined) {
  return useQuery({
    queryKey: ["production-orders", "comments", id],
    queryFn: () => poQueries.comments(id!),
    enabled: !!id,
  });
}

export function useAddComment(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => poMutations.addComment(id, content),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["production-orders", "comments", id] }),
  });
}
