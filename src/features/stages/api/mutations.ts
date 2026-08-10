import { stageService } from "../services/stageService";
import type { StageFormValues } from "../model/types";

export const stageMutations = {
  create: (v: StageFormValues) => stageService.create(v),
  update: (id: string, v: StageFormValues) => stageService.update(id, v),
  remove: (id: string) => stageService.remove(id),
};
