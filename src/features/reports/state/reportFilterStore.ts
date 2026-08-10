import { create } from "zustand";
import type { ReportRange } from "../model/constants";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

interface ReportFilterState {
  range: ReportRange;
  fromDate: string;
  toDate: string;
  orderCode: string;
  setRange: (r: ReportRange) => void;
  setFromDate: (v: string) => void;
  setToDate: (v: string) => void;
  setOrderCode: (v: string) => void;
}

export const useReportFilterStore = create<ReportFilterState>((set) => ({
  range: "week",
  fromDate: daysAgo(7),
  toDate: today(),
  orderCode: "",
  setRange: (range) => {
    if (range === "today") set({ range, fromDate: today(), toDate: today() });
    else if (range === "week") set({ range, fromDate: daysAgo(7), toDate: today() });
    else if (range === "month") set({ range, fromDate: daysAgo(30), toDate: today() });
    else set({ range });
  },
  setFromDate: (fromDate) => set({ fromDate, range: "custom" }),
  setToDate: (toDate) => set({ toDate, range: "custom" }),
  setOrderCode: (orderCode) => set({ orderCode }),
}));
