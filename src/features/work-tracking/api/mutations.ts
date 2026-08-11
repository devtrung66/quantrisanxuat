import { workService } from "../services/workService";
import type { WorkItemFormValues } from "../model/schemas";

export const workMutations = {
  create: (teamId: string, values: WorkItemFormValues) => workService.create(teamId, values),
};
