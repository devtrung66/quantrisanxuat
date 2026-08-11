import { useQuery } from "@tanstack/react-query";
import { poQueries } from "../api/queries";

export function useMaterialNorm(id: string | undefined) {
  return useQuery({
    queryKey: ["production-orders", "norm", id],
    queryFn: () => poQueries.norm(id!),
    enabled: !!id,
  });
}
