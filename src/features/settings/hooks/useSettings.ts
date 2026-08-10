import { useQuery } from "@tanstack/react-query";
import { settingsQueries } from "../api/queries";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsQueries.get(),
  });
}
