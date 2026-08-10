// Business logic cho việc xuất báo cáo (định nghĩa cột + gọi builder).
import type { ReportRow } from "../model/types";
import { buildCsv, downloadTextFile, type CsvColumn } from "../lib/csvExporter";
import { buildExcelXml, type XlsColumn } from "../lib/excelExporter";

const round2 = (n: number) => Math.round(n * 100) / 100;

const csvColumns: CsvColumn<ReportRow>[] = [
  { header: "Công đoạn", value: (r) => r.stage },
  { header: "Kế hoạch", value: (r) => r.plan },
  { header: "Đạt chuẩn", value: (r) => r.standard },
  { header: "Lỗi", value: (r) => r.defect },
  { header: "Tồn/WIP", value: (r) => r.wip },
  { header: "Tỷ lệ đạt (%)", value: (r) => round2(r.passRate) },
];

const xlsColumns: XlsColumn<ReportRow>[] = [
  { header: "Công đoạn", value: (r) => r.stage, type: "String" },
  { header: "Kế hoạch", value: (r) => r.plan, type: "Number" },
  { header: "Đạt chuẩn", value: (r) => r.standard, type: "Number" },
  { header: "Lỗi", value: (r) => r.defect, type: "Number" },
  { header: "Tồn/WIP", value: (r) => r.wip, type: "Number" },
  { header: "Tỷ lệ đạt (%)", value: (r) => round2(r.passRate), type: "Number" },
];

function stamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`;
}

export const exportService = {
  toCsv(rows: ReportRow[]) {
    const content = buildCsv(csvColumns, rows);
    downloadTextFile(`bao-cao-san-xuat_${stamp()}.csv`, content, "text/csv;charset=utf-8");
  },
  toExcel(rows: ReportRow[]) {
    const content = buildExcelXml("Báo cáo sản xuất", xlsColumns, rows);
    downloadTextFile(`bao-cao-san-xuat_${stamp()}.xls`, content, "application/vnd.ms-excel");
  },
};
