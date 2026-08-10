import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { reportQueries } from "../api/queries";
import { useReportFilters } from "./useReportFilters";

export function useReportData() {
  const { filter } = useReportFilters();
  return useQuery({
    queryKey: ["reports", "data", filter],
    queryFn: () => reportQueries.data(filter),
    placeholderData: keepPreviousData,
  });
}
