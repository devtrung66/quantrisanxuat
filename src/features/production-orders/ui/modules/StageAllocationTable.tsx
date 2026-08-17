import type { StageAllocation } from "../../model/types";
import { STAGE_STATE_LABEL, STAGE_STATE_TONE } from "../../model/constants";
import { useAllocationMutation } from "../../hooks/useAllocationMutation";

const TEAMS = ["Tổ Gia công", "Tổ Chế tạo", "Tổ Lắp ráp", "Tổ Cơ điện", "Tổ Sơn", "Tổ KCS", "Tổ Bàn giao"];

const TONE_BADGE: Record<string, string> = {
  slate: "bg-slate-100 text-slate-600",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
};

const th = "px-3 py-2.5 text-left text-[13px] font-medium text-slate-500 whitespace-nowrap";
const td = "px-3 py-2.5 text-sm text-slate-700 align-middle";
const cellInput = "w-full rounded border border-transparent bg-transparent px-1.5 py-1 text-sm hover:border-slate-200 focus:border-blue-400 focus:bg-white outline-none";

export function StageAllocationTable({ allocations, poId }: { allocations: StageAllocation[]; poId: string }) {
  const mut = useAllocationMutation(poId);

  const patch = (stage: string, p: Parameters<typeof mut.mutate>[0]["patch"]) =>
    mut.mutate({ stage, patch: p });

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-100">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60">
            <th className={`${th} w-10 text-center`}>#</th>
            <th className={th}>Công đoạn</th>
            <th className={`${th} text-right`}>Số lượng</th>
            <th className={th}>Tổ phụ trách</th>
            <th className={th}>Bắt đầu</th>
            <th className={th}>Kết thúc</th>
            <th className={th}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((a, i) => {
            const state = a.state ?? "pending";
            const assignee = a.assignee ?? "";
            const tone = STAGE_STATE_TONE[state] ?? "slate";
            return (
              <tr key={a.stage} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className={`${td} text-center`}>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">{i + 1}</span>
                </td>
                <td className={`${td} font-medium text-slate-800`}>{a.stage}</td>
                <td className={`${td} text-right`}>
                  <input type="number" min={0} defaultValue={a.quantity}
                    onBlur={(e) => { const v = Number(e.target.value); if (v !== a.quantity) patch(a.stage, { quantity: v }); }}
                    className={`${cellInput} w-24 text-right`} />
                </td>
                <td className={td}>
                  <select value={assignee} onChange={(e) => patch(a.stage, { assignee: e.target.value })}
                    className={`${cellInput} w-36`}>
                    {assignee !== "" && !TEAMS.includes(assignee) && <option value={assignee}>{assignee}</option>}
                    {assignee === "" && <option value="">— Chọn tổ —</option>}
                    {TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </td>
                <td className={td}>
                  <input type="date" value={a.startDate ?? ""} onChange={(e) => patch(a.stage, { startDate: e.target.value })}
                    className={`${cellInput} w-32`} />
                </td>
                <td className={td}>
                  <input type="date" value={a.endDate ?? ""} onChange={(e) => patch(a.stage, { endDate: e.target.value })}
                    className={`${cellInput} w-32`} />
                </td>
                <td className={td}>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${TONE_BADGE[tone]}`}>
                      {STAGE_STATE_LABEL[state] ?? state}
                    </span>
                    <select value={state} onChange={(e) => patch(a.stage, { state: e.target.value as any })}
                      className={`${cellInput} w-28`}>
                      <option value="pending">Chờ</option>
                      <option value="active">Đang chạy</option>
                      <option value="done">Xong</option>
                    </select>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="border-t border-slate-100 px-3 py-2 text-xs text-slate-400">
        Quy trình sản xuất: {allocations.map((a) => a.stage).join(" → ")}
      </div>
    </div>
  );
}