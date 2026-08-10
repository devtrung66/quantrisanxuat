import { useQuery } from "@tanstack/react-query";
import { progressQueries } from "../api/queries";

export function useOrderProgress(code: string | undefined) {
  return useQuery({
    queryKey: ["progress", "order", code],
    queryFn: () => progressQueries.orderProgress(code!),
    enabled: !!code,
  });
}
