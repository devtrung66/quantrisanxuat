import { useQuery } from "@tanstack/react-query";
import { workQueries } from "../api/queries";
import { useWorkFilterStore } from "../state/workFilterStore";
import type { WorkItem } from "../model/types";

export function useWorkItems() {
  const { teamId, keyword, priority, status } = useWorkFilterStore();

  const query = useQuery({
    queryKey: ["work-items", teamId],
    queryFn: () => workQueries.listByTeam(teamId),
  });

  // lọc client-side theo từ khóa / ưu tiên / trạng thái
  const items: WorkItem[] = (query.data ?? []).filter((w) => {
    if (priority !== "all" && w.priority !== priority) return false;
    if (status !== "all" && w.status !== status) return false;
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      const hit =
        w.lsxCode.toLowerCase().includes(kw) ||
        w.content.toLowerCase().includes(kw) ||
        (w.supervisorNote ?? "").toLowerCase().includes(kw);
      if (!hit) return false;
    }
    return true;
  });

  return { ...query, items };
}
