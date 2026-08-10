import { useReportFilterStore } from "../state/reportFilterStore";
import type { ReportFilter } from "../model/types";

export function useReportFilters(): { filter: ReportFilter; store: ReturnType<typeof useReportFilterStore.getState> } {
  const state = useReportFilterStore();
  const filter: ReportFilter = {
    range: state.range,
    fromDate: state.fromDate,
    toDate: state.toDate,
    orderCode: state.orderCode,
  };
  return { filter, store: state };
}
