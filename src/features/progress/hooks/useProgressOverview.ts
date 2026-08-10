import { useQuery } from "@tanstack/react-query";
import { progressQueries } from "../api/queries";

export function useProgressOverview() {
  return useQuery({
    queryKey: ["progress", "overview"],
    queryFn: () => progressQueries.overview(),
  });
}
