import { Select } from "@shared/index";
import { useReportFilters } from "../../hooks/useReportFilters";
import { REPORT_RANGE_LABEL } from "../../model/constants";
import { REPORT_ORDER_OPTIONS } from "../../adapters/reportAdapter";

const rangeOptions = Object.entries(REPORT_RANGE_LABEL).map(([value, label]) => ({ value, label }));
const inputCls = "rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-400";

export function ReportFilters() {
  const { filter, store } = useReportFilters();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={filter.range} options={rangeOptions} onChange={(v) => store.setRange(v as any)} />
      <input type="date" className={inputCls} value={filter.fromDate} onChange={(e) => store.setFromDate(e.target.value)} />
      <span className="text-slate-400">→</span>
      <input type="date" className={inputCls} value={filter.toDate} onChange={(e) => store.setToDate(e.target.value)} />
      <Select value={filter.orderCode} options={REPORT_ORDER_OPTIONS} onChange={store.setOrderCode} className="min-w-[240px]" />
    </div>
  );
}
