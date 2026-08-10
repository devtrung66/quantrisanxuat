import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState, Button } from "@shared/index";
import { LayoutGrid, List } from "lucide-react";
import { useStageList } from "../../hooks/useStageList";
import { useCreateStage, useUpdateStage, useDeleteStage } from "../../hooks/useStageMutation";
import { StageCard } from "../components/StageCard";
import { StageTable } from "../modules/StageTable";
import { StageForm } from "../modules/StageForm";
import type { Stage, StageFormValues } from "../../model/types";

type View = "grid" | "table";

export function StageListPage() {
  const nav = useNavigate();
  const { data, isLoading } = useStageList();
  const create = useCreateStage();
  const del = useDeleteStage();

  const [view, setView] = useState<View>("grid");
  const [editing, setEditing] = useState<Stage | null>(null);
  const [creating, setCreating] = useState(false);

  const update = useUpdateStage(editing?.id ?? "");

  const onDelete = (s: Stage) => { if (confirm(`Xoá công đoạn "${s.name}"?`)) del.mutate(s.id); };

  const onSubmit = (v: StageFormValues) => {
    if (creating) { create.mutate(v, { onSuccess: () => setCreating(false) }); }
    else if (editing) { update.mutate(v, { onSuccess: () => setEditing(null) }); }
  };

  const showForm = creating || !!editing;

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            <button onClick={() => setView("grid")} className={`flex items-center gap-1 rounded px-3 py-1.5 text-sm ${view === "grid" ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}><LayoutGrid className="h-4 w-4" /> Thẻ</button>
            <button onClick={() => setView("table")} className={`flex items-center gap-1 rounded px-3 py-1.5 text-sm ${view === "table" ? "bg-blue-50 text-blue-600" : "text-slate-500"}`}><List className="h-4 w-4" /> Bảng</button>
          </div>
          <Button onClick={() => { setCreating(true); setEditing(null); }}>+ Thêm công đoạn</Button>
        </div>

        {showForm && (
          <Card title={creating ? "Thêm công đoạn" : `Sửa: ${editing?.name}`}>
            <StageForm
              initial={editing ?? undefined}
              submitting={create.isPending || update.isPending}
              onSubmit={onSubmit}
              onCancel={() => { setCreating(false); setEditing(null); }}
            />
          </Card>
        )}

        {isLoading ? (
          <Spinner />
        ) : !data || data.length === 0 ? (
          <Card><EmptyState text="Chưa có công đoạn" /></Card>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((s) => <StageCard key={s.id} stage={s} onClick={() => nav(`/stages/${s.id}`)} />)}
          </div>
        ) : (
          <Card>
            <StageTable data={data} onView={(s) => nav(`/stages/${s.id}`)} onEdit={(s) => { setEditing(s); setCreating(false); }} onDelete={onDelete} />
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
