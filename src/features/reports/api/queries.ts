import { reportService } from "../services/reportService";
import type { ReportFilter } from "../model/types";

export const reportQueries = {
  data: (filter: ReportFilter) => reportService.getData(filter),
};
