import { Badge } from "@shared/index";
import { UNIT_TONE } from "../../model/norm.constants";

export function UnitBadge({ unit }: { unit: string }) {
  return <Badge tone={UNIT_TONE[unit] ?? "slate"}>{unit}</Badge>;
}
