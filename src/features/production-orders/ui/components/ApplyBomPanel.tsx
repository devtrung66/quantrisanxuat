import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@shared/index";
import { useBomTemplates } from "../../hooks/useBomTemplates";
import { useApplyBom } from "../../hooks/useApplyBom";

export function ApplyBomPanel({ poId, onClose }: { poId: string; onClose: () => void }) {
  const { data: templates, isLoading } = useBomTemplates();
  const apply = useApplyBom(poId);

  const [templateId, setTemplateId] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [mode, setMode] = useState<"append" | "replace">("append");

  const selected = templates?.find((t) => t.id === templateId);

  const submit = () => {
    if (!templateId || qty <= 0) return;
    apply.mutate({ templateId, qty, mode }, { onSuccess: () => onClose() });
  };

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-700">Áp định mức mẫu (BĐM) vào LSX</h4>
        <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-white"><X className="h-4 w-4" /></button>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-400">Đang tải BĐM...</p>
      ) : !templates || templates.length === 0 ? (
        <p className="text-sm text-slate-400">Chưa có BĐM mẫu. Tạo ở Danh mục → Định mức mẫu.</p>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-end gap-3">
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Chọn BĐM</span>
              <select className="w-64 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400"
                value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
                <option value="">-- Chọn bảng định mức --</option>
                {templates.map((t) => <option key={t.id} value={t.id}>{t.code} — {t.productName}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Số lượng SP</span>
              <input type="number" min={0} className="w-28 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400"
                value={qty || ""} onChange={(e) => setQty(Number(e.target.value))} placeholder="VD: 18" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Cách áp</span>
              <select className="w-40 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400"
                value={mode} onChange={(e) => setMode(e.target.value as any)}>
                <option value="append">Nối thêm</option>
                <option value="replace">Thay toàn bộ</option>
              </select>
            </label>
          </div>

          {selected && (
            <p className="text-xs text-slate-500">
              BĐM này có <b>{selected.nvlLines.length}</b> dòng NVL, <b>{selected.btpLines.length}</b> dòng BTP.
              {qty > 0 && <> Sẽ nhân định mức × <b>{qty}</b> SP.</>}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Huỷ</Button>
            <Button onClick={submit} disabled={apply.isPending || !templateId || qty <= 0}>
              {apply.isPending ? "Đang áp..." : "Áp định mức"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}