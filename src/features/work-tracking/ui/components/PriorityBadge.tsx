import { Badge } from "@shared/index";
import { WORK_PRIORITY_LABEL, WORK_PRIORITY_TONE } from "../../model/constants";
import type { WorkPriority } from "../../model/constants";

export function PriorityBadge({ priority }: { priority: WorkPriority }) {
  return <Badge tone={WORK_PRIORITY_TONE[priority]}>{WORK_PRIORITY_LABEL[priority]}</Badge>;
}
