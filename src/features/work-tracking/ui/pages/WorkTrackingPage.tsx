import { useState } from "react";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, Button } from "@shared/index";
import { Plus } from "lucide-react";
import { useWorkFilterStore } from "../../state/workFilterStore";
import { useWorkItems } from "../../hooks/useWorkItems";
import { useCreateWorkItem } from "../../hooks/useWorkMutation";
import { TEAMS } from "../../model/constants";
import type { WorkItemFormValues } from "../../model/schemas";
import { TeamTabs } from "../components/TeamTabs";
import { WorkFilters } from "../modules/WorkFilters";
import { WorkTable } from "../modules/WorkTable";
import { WorkForm } from "../modules/WorkForm";

export function WorkTrackingPage() {
  const { teamId, setTeam } = useWorkFilterStore();
  const { items, isLoading, data } = useWorkItems();
  const create = useCreateWorkItem(teamId);

  const [creating, setCreating] = useState(false);

  const teamName = TEAMS.find((t) => t.id === teamId)?.name ?? "";
  const total = data?.length ?? 0;
  const done = (data ?? []).filter((w) => w.status === "done").length;

  const onSubmit = (v: WorkItemFormValues) => {
    create.mutate(v, { onSuccess: () => setCreating(false) });
  };

  const switchTeam = (id: string) => { setTeam(id); setCreating(false); };

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Theo dõi công việc</h2>
            <p className="text-sm text-slate-400">Quản lý công việc theo tổ sản xuất</p>
          </div>
          <Button onClick={() => setCreating((v) => !v)}>
            <Plus className="mr-1 inline h-4 w-4" /> Thêm công việc
          </Button>
        </div>

        <TeamTabs active={teamId} onChange={switchTeam} />

        {creating && (
          <Card title={`Thêm công việc — Tổ ${teamName}`}>
            <WorkForm
              submitting={create.isPending}
              onSubmit={onSubmit}
              onCancel={() => setCreating(false)}
            />
          </Card>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <WorkFilters />
          <span className="text-sm text-slate-500">
            Tổ {teamName}: {done}/{total} hoàn thành
          </span>
        </div>

        <Card>
          {isLoading ? <Spinner /> : <WorkTable items={items} />}
        </Card>
      </div>
    </PageContainer>
  );
}
