export const REPORT_RANGE = {
  today: "today",
  week: "week",
  month: "month",
  custom: "custom",
} as const;

export type ReportRange = (typeof REPORT_RANGE)[keyof typeof REPORT_RANGE];

export const REPORT_RANGE_LABEL: Record<ReportRange, string> = {
  today: "Hôm nay",
  week: "Tuần này",
  month: "Tháng này",
  custom: "Tuỳ chọn",
};

export const EXPORT_FORMAT = {
  csv: "csv",
  excel: "excel",
} as const;

export type ExportFormat = (typeof EXPORT_FORMAT)[keyof typeof EXPORT_FORMAT];
