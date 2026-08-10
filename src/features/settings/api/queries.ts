import { settingsService } from "../services/settingsService";

export const settingsQueries = {
  get: () => settingsService.get(),
};
