import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState, Button, Badge, ProgressBar, formatNumber, formatPercent } from "@shared/index";
import { AlertTriangle } from "lucide-react";
import { useStageDetail } from "../../hooks/useStageDetail";
import { STAGE_STATE_LABEL, STAGE_STATE_TONE, WIP_WARN_THRESHOLD } from "../../model/constants";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

export function StageDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data, isLoading } = useStageDetail(id);

  if (isLoading) return <PageContainer><Spinner /></PageContainer>;
  if (!data) return <PageContainer><Card><EmptyState text="Không tìm thấy công đoạn" /></Card></PageContainer>;

  const total = data.todayStandard + data.todayDefect;
  const passRate = total <= 0 ? 0 : (data.todayStandard / total) * 100;
  const defectRate = total <= 0 ? 0 : (data.todayDefect / total) * 100;
  const overDefect = defectRate > data.defectLimit;
  const overWip = data.wip >= WIP_WARN_THRESHOLD;

  return (
    <PageContainer>
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" onClick={() => nav("/stages")}>← Danh sách</Button>
      </div>

      {(overDefect || overWip) && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4" />
          <div>
            {overDefect && <p>Tỷ lệ lỗi {formatPercent(defectRate)} vượt ngưỡng cho phép {formatPercent(data.defectLimit)}.</p>}
            {overWip && <p>Tồn WIP {formatNumber(data.wip)} vượt ngưỡng {formatNumber(WIP_WARN_THRESHOLD)}.</p>}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title={`Công đoạn ${data.order}: ${data.name}`}>
          <Row label="Trạng thái" value={<Badge tone={STAGE_STATE_TONE[data.state]}>{STAGE_STATE_LABEL[data.state]}</Badge>} />
          <Row label="Định mức / ca" value={formatNumber(data.standardOutput)} />
          <Row label="Ngưỡng lỗi cho phép" value={formatPercent(data.defectLimit)} />
          <Row label="Tồn / WIP" value={formatNumber(data.wip)} />
        </Card>

        <Card title="Sản lượng hôm nay">
          <Row label="Đạt chuẩn" value={<span className="text-green-600">{formatNumber(data.todayStandard)}</span>} />
          <Row label="Lỗi" value={<span className="text-red-600">{formatNumber(data.todayDefect)}</span>} />
          <div className="pt-4">
            <div className="mb-1 flex justify-between text-sm text-slate-500"><span>Tỷ lệ đạt</span><span>{formatPercent(passRate)}</span></div>
            <ProgressBar value={passRate} tone="green" />
          </div>
          <div className="pt-3">
            <div className="mb-1 flex justify-between text-sm text-slate-500"><span>Tỷ lệ lỗi</span><span className={overDefect ? "text-red-600" : ""}>{formatPercent(defectRate)}</span></div>
            <ProgressBar value={defectRate} tone={overDefect ? "red" : "amber"} />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
