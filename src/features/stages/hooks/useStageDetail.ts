import { useQuery } from "@tanstack/react-query";
import { stageQueries } from "../api/queries";

export function useStageDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["stages", "detail", id],
    queryFn: () => stageQueries.detail(id!),
    enabled: !!id,
  });
}
