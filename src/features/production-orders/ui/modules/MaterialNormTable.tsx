import { useState } from "react";
import { Spinner } from "@shared/index";
import { Sparkles } from "lucide-react";
import type { NormData } from "../../model/norm.types";
import { NORM_TAB } from "../../model/norm.constants";
import type { NormTabKey } from "../../model/norm.constants";
import { NormTabs } from "../components/NormTabs";
import { BomTemplateList } from "../components/BomTemplateList";
import { ApplyBomPanel } from "../components/ApplyBomPanel";
import { NvlTable } from "./NvlTable";
import { BtpTable } from "./BtpTable";

export function MaterialNormTable({
  data, isLoading, poId,
}: {
  data: NormData | undefined;
  isLoading: boolean;
  poId: string;
}) {
  const [tab, setTab] = useState<NormTabKey>(NORM_TAB.nvl);
  const [showApply, setShowApply] = useState(false);
  if (isLoading) return <Spinner />;
  const d = data ?? { templates: [], nvlRows: [], btpRows: [] };
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">Thông tin chi tiết định mức</h3>
        <button
          onClick={() => setShowApply((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
        >
          <Sparkles className="h-4 w-4" /> Áp định mức mẫu
        </button>
      </div>

      {showApply && (
        <div className="mb-4">
          <ApplyBomPanel poId={poId} onClose={() => setShowApply(false)} />
        </div>
      )}

      <NormTabs active={tab} onChange={setTab} />
      {tab === NORM_TAB.nvl ? (
        <div className="mt-4 space-y-5">
          <p className="text-sm font-semibold text-slate-700">Định mức NVL sử dụng</p>
          <BomTemplateList templates={d.templates} />
          <NvlTable rows={d.nvlRows} poId={poId} />
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          <p className="text-sm font-semibold text-slate-700">Định mức bán thành phẩm</p>
          <BtpTable rows={d.btpRows} />
        </div>
      )}
    </section>
  );
}