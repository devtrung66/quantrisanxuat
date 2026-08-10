// Barrel gộp cho tiện import + hook đọc lịch sử.
import { useQuery } from "@tanstack/react-query";
import { entryQueries } from "../api/queries";
import type { EntryType } from "../model/constants";

export { useStandardEntry } from "./useStandardEntry";
export { useDefectEntry } from "./useDefectEntry";

export function useRecentEntries(type?: EntryType, limit = 10) {
  return useQuery({
    queryKey: ["entries", "recent", { type, limit }],
    queryFn: () => entryQueries.listRecent(type, limit),
  });
}
