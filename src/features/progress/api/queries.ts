import { progressService } from "../services/progressService";

export const progressQueries = {
  overview: () => progressService.overview(),
  orderProgress: (code: string) => progressService.orderProgress(code),
};
