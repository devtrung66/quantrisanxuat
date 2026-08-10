import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState } from "@shared/index";
import { CheckCircle2 } from "lucide-react";
import { useStandardEntry, useRecentEntries } from "../../hooks/useEntryMutation";
import { StandardEntryForm } from "../modules/StandardEntryForm";
import { EntryHistoryTable } from "../modules/EntryHistoryTable";
import type { StandardEntryValues } from "../../model/types";

export function StandardEntryPage() {
  const create = useStandardEntry();
  const recent = useRecentEntries("standard", 10);

  const onSubmit = (v: StandardEntryValues) => create.mutate(v);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white"><CheckCircle2 className="h-5 w-5" /></span>
            <h3 className="text-base font-semibold text-slate-800">Nhập hàng đạt chuẩn</h3>
          </div>
          <StandardEntryForm submitting={create.isPending} onSubmit={onSubmit} />
        </Card>
        <Card title="Phiếu nhập gần đây (đạt chuẩn)">
          {recent.isLoading ? <Spinner /> : !recent.data || recent.data.length === 0 ? <EmptyState /> : <EntryHistoryTable data={recent.data} />}
        </Card>
      </div>
    </PageContainer>
  );
}
