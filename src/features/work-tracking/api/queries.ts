import { workService } from "../services/workService";

export const workQueries = {
  listByTeam: (teamId: string) => workService.listByTeam(teamId),
  workers: () => workService.workers(),
};
