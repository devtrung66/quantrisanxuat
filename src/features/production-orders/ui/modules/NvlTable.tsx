import { useState } from "react";
import { Plus, Trash2, FunctionSquare, Hash, X } from "lucide-react";
import { formatNumber, EmptyState } from "@shared/index";
import { MOCK_MATERIALS } from "@features/catalog";
import type { NormRow } from "../../model/norm.types";
import { UnitBadge } from "../components/UnitBadge";
import { useNormMutation } from "../../hooks/useNormMutation";

const th = "px-3 py-2.5 text-left text-[13px] font-medium text-slate-500 whitespace-nowrap";
const td = "px-3 py-2.5 text-sm text-slate-700 align-middle";

export function NvlTable({ rows, poId }: { rows: NormRow[]; poId: string }) {
  const { addNvl, updateNvl, removeNvl } = useNormMutation(poId);
  const [adding, setAdding] = useState(false);

  // form thêm dòng
  const [matId, setMatId] = useState("");
  const [norm, setNorm] = useState<number>(0);
  const [product, setProduct] = useState("");

  const selectedMat = MOCK_MATERIALS.find((m) => m.id === matId);

  const submitAdd = () => {
    if (!selectedMat || norm <= 0 || !product.trim()) return;
    addNvl.mutate(
      { material: selectedMat.name, unit: selectedMat.unit, normPerUnit: norm, belongProduct: product.trim() },
      { onSuccess: () => { setAdding(false); setMatId(""); setNorm(0); setProduct(""); } }
    );
  };

  return (
    <div className="rounded-lg border border-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <span className="text-sm text-slate-600">▦ Định mức Nguyên vật liệu theo LSX</span>
        <button
          onClick={() => setAdding((v) => !v)}
          className="flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-3.5 w-3.5" /> Thêm dòng
        </button>
      </div>

      {adding && (
        <div className="flex flex-wrap items-end gap-3 border-b border-slate-100 bg-slate-50/60 px-3 py-3">
          <label className="block">
            <span className="mb-1 block text-xs text-slate-500">Nguyên vật liệu</span>
            <select className="w-52 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400"
              value={matId} onChange={(e) => setMatId(e.target.value)}>
              <option value="">-- Chọn NVL --</option>
              {MOCK_MATERIALS.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-slate-500">ĐVT</span>
            <input readOnly value={selectedMat?.unit ?? ""} placeholder="—"
              className="w-24 rounded-lg border border-slate-200 bg-slate-100 px-2 py-1.5 text-sm text-slate-500" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-slate-500">ĐM/1SP</span>
            <input type="number" min={0} step="0.1" value={norm || ""} onChange={(e) => setNorm(Number(e.target.value))}
              className="w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-slate-500">Thuộc SP</span>
            <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Tên sản phẩm"
              className="w-56 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400" />
          </label>
          <button onClick={submitAdd} disabled={addNvl.isPending || !selectedMat || norm <= 0 || !product.trim()}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            {addNvl.isPending ? "Đang thêm..." : "Thêm"}
          </button>
          <button onClick={() => setAdding(false)} className="rounded-lg px-2 py-1.5 text-slate-400 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="px-3 py-1"><EmptyState text="Chưa có định mức nguyên vật liệu" /></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className={`${th} w-10 text-center`}>#</th>
                <th className={th}>Nguyên vật liệu</th>
                <th className={th}>ĐVT</th>
                <th className={`${th} text-right`}><span className="inline-flex items-center gap-1"><Hash className="h-3.5 w-3.5" />ĐM/1SP</span></th>
                <th className={`${th} text-right`}><span className="inline-flex items-center gap-1"><FunctionSquare className="h-3.5 w-3.5" />SL theo LSX</span></th>
                <th className={th}>Thuộc BTP</th>
                <th className={th}>Thuộc SP</th>
                <th className={`${th} w-12`}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className={`${td} text-center text-slate-400`}>{i + 1}</td>
                  <td className={`${td} font-medium text-slate-800`}>{r.material}</td>
                  <td className={td}><UnitBadge unit={r.unit} /></td>
                  <td className={`${td} text-right`}>
                    <input
                      type="number" min={0} step="0.1"
                      defaultValue={r.normPerUnit}
                      onBlur={(e) => {
                        const v = Number(e.target.value);
                        if (v !== r.normPerUnit) updateNvl.mutate({ rowId: r.id, patch: { normPerUnit: v } });
                      }}
                      className="w-20 rounded border border-transparent bg-transparent px-1.5 py-1 text-right text-sm hover:border-slate-200 focus:border-blue-400 focus:bg-white outline-none"
                    />
                  </td>
                  <td className={`${td} text-right font-medium text-slate-800`}>{formatNumber(r.qtyByLsx)}</td>
                  <td className={`${td} text-slate-500`}>{r.belongBtp ?? "—"}</td>
                  <td className={`${td} max-w-[220px] truncate`} title={r.belongProduct}>{r.belongProduct}</td>
                  <td className={`${td} text-center`}>
                    <button
                      onClick={() => { if (confirm(`Xoá "${r.material}"?`)) removeNvl.mutate(r.id); }}
                      className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Xoá dòng"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}