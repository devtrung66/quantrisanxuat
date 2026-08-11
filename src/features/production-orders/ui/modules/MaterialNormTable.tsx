import { useState } from "react";
import { Spinner } from "@shared/index";
import type { NormData } from "../../model/norm.types";
import { NORM_TAB } from "../../model/norm.constants";
import type { NormTabKey } from "../../model/norm.constants";
import { NormTabs } from "../components/NormTabs";
import { BomTemplateList } from "../components/BomTemplateList";
import { NvlTable } from "./NvlTable";
import { BtpTable } from "./BtpTable";

export function MaterialNormTable({
  data, isLoading,
}: {
  data: NormData | undefined;
  isLoading: boolean;
}) {
  const [tab, setTab] = useState<NormTabKey>(NORM_TAB.nvl);

  if (isLoading) return <Spinner />;

  const d = data ?? { templates: [], nvlRows: [], btpRows: [] };

  return (
    <section>
      <h3 className="mb-3 text-base font-semibold text-slate-800">Thông tin chi tiết định mức</h3>

      <NormTabs active={tab} onChange={setTab} />

      {tab === NORM_TAB.nvl ? (
        <div className="mt-4 space-y-5">
          <p className="text-sm font-semibold text-slate-700">Định mức NVL sử dụng</p>
          <BomTemplateList templates={d.templates} />
          <NvlTable rows={d.nvlRows} />
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
