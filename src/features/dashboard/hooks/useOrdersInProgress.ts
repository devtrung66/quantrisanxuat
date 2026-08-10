import { useQuery } from "@tanstack/react-query";
import { getMockOrders } from "../adapters/dashboardAdapter";

export function useOrdersInProgress() {
  return useQuery({
    queryKey: ["dashboard", "orders-in-progress"],
    queryFn: async () => getMockOrders(),
  });
}
