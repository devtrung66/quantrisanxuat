import { stageService } from "../services/stageService";

export const stageQueries = {
  list: () => stageService.list(),
  detail: (id: string) => stageService.detail(id),
};
