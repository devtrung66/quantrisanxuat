import { useQuery } from "@tanstack/react-query";
import { getMockStageBars, getMockStageQuantities } from "../adapters/dashboardAdapter";

export function useStageBars() {
  return useQuery({ queryKey: ["dashboard", "stage-bars"], queryFn: async () => getMockStageBars() });
}

export function useStageQuantities() {
  return useQuery({ queryKey: ["dashboard", "stage-quantities"], queryFn: async () => getMockStageQuantities() });
}
