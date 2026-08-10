import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState } from "@shared/index";
import { XCircle } from "lucide-react";
import { useDefectEntry, useRecentEntries } from "../../hooks/useEntryMutation";
import { DefectEntryForm } from "../modules/DefectEntryForm";
import { EntryHistoryTable } from "../modules/EntryHistoryTable";
import type { DefectEntryValues } from "../../model/types";

export function DefectEntryPage() {
  const create = useDefectEntry();
  const recent = useRecentEntries("defect", 10);

  const onSubmit = (v: DefectEntryValues) => create.mutate(v);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white"><XCircle className="h-5 w-5" /></span>
            <h3 className="text-base font-semibold text-slate-800">Nhập hàng lỗi</h3>
          </div>
          <DefectEntryForm submitting={create.isPending} onSubmit={onSubmit} />
        </Card>
        <Card title="Phiếu nhập gần đây (hàng lỗi)">
          {recent.isLoading ? <Spinner /> : !recent.data || recent.data.length === 0 ? <EmptyState /> : <EntryHistoryTable data={recent.data} />}
        </Card>
      </div>
    </PageContainer>
  );
}
