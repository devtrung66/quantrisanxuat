import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState, formatNumber, formatPercent } from "@shared/index";
import { ClipboardList, CheckCircle2, XCircle, Percent } from "lucide-react";
import { useReportData } from "../../hooks/useReportData";
import { exportService } from "../../services/exportService";
import { ReportFilters } from "../modules/ReportFilters";
import { ReportChart } from "../modules/ReportChart";
import { ReportTable } from "../modules/ReportTable";
import { ReportSummaryCard } from "../components/ReportSummaryCard";
import { ExportButton } from "../components/ExportButton";

export function ReportPage() {
  const { data, isLoading, isFetching } = useReportData();

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ReportFilters />
          <ExportButton
            disabled={!data || data.rows.length === 0}
            onCsv={() => data && exportService.toCsv(data.rows)}
            onExcel={() => data && exportService.toExcel(data.rows)}
          />
        </div>

        {isLoading || !data ? (
          <Spinner />
        ) : (
          <>
            <div className={`grid grid-cols-2 gap-4 xl:grid-cols-4 ${isFetching ? "opacity-60" : ""}`}>
              <ReportSummaryCard label="Sản lượng kế hoạch" value={formatNumber(data.summary.totalPlan)} tone="slate" icon={<ClipboardList className="h-4 w-4" />} />
              <ReportSummaryCard label="Đạt chuẩn" value={formatNumber(data.summary.totalStandard)} tone="green" icon={<CheckCircle2 className="h-4 w-4" />} />
              <ReportSummaryCard label="Lỗi" value={formatNumber(data.summary.totalDefect)} tone="red" icon={<XCircle className="h-4 w-4" />} />
              <ReportSummaryCard label="Tỷ lệ đạt" value={formatPercent(data.summary.passRate)} tone="blue" icon={<Percent className="h-4 w-4" />} />
            </div>

            <ReportChart data={data.chart} />

            <Card title="Chi tiết theo công đoạn">
              {data.rows.length === 0 ? <EmptyState /> : <ReportTable rows={data.rows} />}
            </Card>
          </>
        )}
      </div>
    </PageContainer>
  );
}
