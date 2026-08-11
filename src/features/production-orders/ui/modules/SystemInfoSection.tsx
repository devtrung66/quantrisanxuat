import { UserPlus, Clock, UserCog, RefreshCw, Hash } from "lucide-react";
import type { SystemInfo } from "../../model/types";
import { LsxInfoRow } from "../components/LsxInfoRow";

function formatDateTime(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}, ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const ic = "h-4 w-4";

export function SystemInfoSection({ info }: { info?: SystemInfo }) {
  return (
    <section>
      <h3 className="mb-3 text-base font-semibold text-slate-800">Thông tin hệ thống</h3>
      {!info ? (
        <p className="text-sm text-slate-400">Không có thông tin hệ thống.</p>
      ) : (
        <div className="rounded-lg border border-slate-100 px-4 py-1">
          <LsxInfoRow icon={<UserPlus className={ic} />} label="Người tạo">{info.createdBy}</LsxInfoRow>
          <LsxInfoRow icon={<Clock className={ic} />} label="Thời gian tạo">{formatDateTime(info.createdAt)}</LsxInfoRow>
          <LsxInfoRow icon={<UserCog className={ic} />} label="Người cập nhật cuối">{info.updatedBy}</LsxInfoRow>
          <LsxInfoRow icon={<RefreshCw className={ic} />} label="Cập nhật lần cuối">{formatDateTime(info.updatedAt)}</LsxInfoRow>
          <LsxInfoRow icon={<Hash className={ic} />} label="Mã hệ thống">
            <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">{info.systemId}</span>
          </LsxInfoRow>
        </div>
      )}
    </section>
  );
}
