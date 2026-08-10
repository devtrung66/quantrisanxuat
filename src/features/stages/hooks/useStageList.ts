import { useQuery } from "@tanstack/react-query";
import { stageQueries } from "../api/queries";

export function useStageList() {
  return useQuery({
    queryKey: ["stages", "list"],
    queryFn: () => stageQueries.list(),
  });
}
