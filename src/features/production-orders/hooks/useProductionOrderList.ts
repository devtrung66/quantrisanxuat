import { useQuery } from "@tanstack/react-query";
import { poQueries } from "../api/queries";

export function useProductionOrderList() {
  return useQuery({
    queryKey: ["production-orders", "list"],
    queryFn: () => poQueries.list(),
  });
}

export function useSourceOrders() {
  return useQuery({
    queryKey: ["production-orders", "source-orders"],
    queryFn: () => poQueries.sourceOrders(),
  });
}
