import type { ReportData, ReportFilter } from "../model/types";
import { getMockReport } from "../adapters/reportAdapter";

function delay<T>(v: T, ms = 300): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const reportService = {
  async getData(filter: ReportFilter): Promise<ReportData> {
    return delay(getMockReport(filter));
  },
};
