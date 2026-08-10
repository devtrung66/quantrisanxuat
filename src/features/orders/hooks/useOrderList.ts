import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ordersQueries } from "../api/queries";
import { useOrderFilterStore } from "../state/orderFilterStore";

export function useOrderList() {
  const { keyword, status, page } = useOrderFilterStore();
  const query = useQuery({
    queryKey: ["orders", "list", { keyword, status, page }],
    queryFn: () => ordersQueries.list({ keyword, status, page }),
    placeholderData: keepPreviousData,
  });
  return query;
}
