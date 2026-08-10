import { useQuery } from "@tanstack/react-query";
import { ordersQueries } from "../api/queries";

export function useOrderDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["orders", "detail", id],
    queryFn: () => ordersQueries.detail(id!),
    enabled: !!id,
  });
}
