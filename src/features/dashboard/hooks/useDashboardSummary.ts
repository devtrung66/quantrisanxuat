import { useQuery } from "@tanstack/react-query";
import { getMockSummary } from "../adapters/dashboardAdapter";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: async () => getMockSummary(),
  });
}
