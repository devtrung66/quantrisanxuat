import { useState } from "react";
import { PageContainer } from "@shared/ui/layout/PageContainer";
import { Card, Spinner, EmptyState, Button, Badge } from "@shared/index";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import { MOCK_MATERIALS } from "@features/catalog";
import { MOCK_PRODUCTS } from "@features/catalog/adapters/catalogAdapter";
import { useBomTemplates } from "../../hooks/useBomTemplates";
import { useBomTemplateMutation } from "../../hooks/useBomTemplateMutation";
import type { BomTemplateFull } from "../../model/bomTemplate.types";

const inputCls = "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-400";
const cellInput = "w-full rounded border border-transparent bg-transparent px-1.5 py-1 text-sm hover:border-slate-200 focus:border-blue-400 focus:bg-white outline-none";

export function BomTemplatePage() {
  const { data, isLoading } = useBomTemplates();
  const m = useBomTemplateMutation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  // form tao template
  const [newCode, setNewCode] = useState("");
  const [newProductId, setNewProductId] = useState("");

  const selected = data?.find((t) => t.id === selectedId) ?? null;

  const createTemplate = () => {
    const p = MOCK_PRODUCTS.find((x) => x.id === newProductId);
    if (!newCode.trim() || !p) return;
    m.createTemplate.mutate(
      { code: newCode.trim(), productId: p.id, productName: p.name },
      { onSuccess: () => { setCreating(false); setNewCode(""); setNewProductId(""); } }
    );
  };

  return (
    <PageContainer>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Định mức mẫu (BĐM)</h2>
          <p className="text-sm text-slate-400">Bảng định mức chuẩn theo sản phẩm — dùng lại khi tạo lệnh sản xuất</p>
        </div>
        <Button onClick={() => setCreating((v) => !v)}>+ Tạo BĐM</Button>
      </div>

      {creating && (
        <Card className="mb-4">
          <div className="flex flex-wrap items-end gap-3">
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Mã BĐM</span>
              <input className={`${inputCls} w-52`} placeholder="BDM-HHVT-020-001" value={newCode} onChange={(e) => setNewCode(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Sản phẩm</span>
              <select className={`${inputCls} w-64`} value={newProductId} onChange={(e) => setNewProductId(e.target.value)}>
                <option value="">-- Chọn sản phẩm --</option>
                {MOCK_PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.code} — {p.name}</option>)}
              </select>
            </label>
            <Button onClick={createTemplate} disabled={m.createTemplate.isPending || !newCode.trim() || !newProductId}>Tạo</Button>
            <Button variant="ghost" onClick={() => setCreating(false)}>Huỷ</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Danh sách BĐM */}
        <Card title="Danh sách BĐM" className="lg:col-span-1">
          {isLoading ? <Spinner /> : !data || data.length === 0 ? <EmptyState text="Chưa có BĐM" /> : (
            <div className="space-y-2">
              {data.map((t) => (
                <button key={t.id} onClick={() => setSelectedId(t.id)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left transition ${selectedId === t.id ? "border-blue-300 bg-blue-50" : "border-slate-100 hover:bg-slate-50"}`}>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{t.code}</p>
                    <p className="text-xs text-slate-500">{t.productName}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{t.nvlLines.length} NVL · {t.btpLines.length} BTP</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Chi tiết BĐM đang chọn */}
        <div className="lg:col-span-2">
          {!selected ? (
            <Card><EmptyState text="Chọn 1 BĐM bên trái để xem & sửa định mức" /></Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-800">{selected.code}</h3>
                      <Badge tone="blue">{selected.productName}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-red-600"
                    onClick={() => { if (confirm(`Xoá BĐM ${selected.code}?`)) { m.removeTemplate.mutate(selected.id); setSelectedId(null); } }}>
                    Xoá BĐM
                  </Button>
                </div>
              </Card>

              {/* Bảng NVL */}
              <Card title="Định mức Nguyên vật liệu (/ 1 SP)">
                <NvlLinesEditor template={selected} m={m} />
              </Card>

              {/* Bảng BTP */}
              <Card title="Định mức Bán thành phẩm (/ 1 SP)">
                <BtpLinesEditor template={selected} m={m} />
              </Card>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

// ---- Editor dòng NVL ----
function NvlLinesEditor({ template, m }: { template: BomTemplateFull; m: ReturnType<typeof useBomTemplateMutation> }) {
  const [matId, setMatId] = useState("");
  const [norm, setNorm] = useState<number>(0);
  const selMat = MOCK_MATERIALS.find((x) => x.id === matId);

  const add = () => {
    if (!selMat || norm <= 0) return;
    m.addNvl.mutate({ templateId: template.id, line: { material: selMat.name, unit: selMat.unit, normPerUnit: norm } },
      { onSuccess: () => { setMatId(""); setNorm(0); } });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <select className={`${inputCls} w-52`} value={matId} onChange={(e) => setMatId(e.target.value)}>
          <option value="">-- Chọn NVL --</option>
          {MOCK_MATERIALS.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.unit})</option>)}
        </select>
        <input type="number" min={0} step="0.1" className={`${inputCls} w-28`} placeholder="ĐM/1SP" value={norm || ""} onChange={(e) => setNorm(Number(e.target.value))} />
        <Button onClick={add} disabled={m.addNvl.isPending || !selMat || norm <= 0} className="px-3 py-1.5 text-sm">+ Thêm</Button>
      </div>

      {template.nvlLines.length === 0 ? <EmptyState text="Chưa có dòng NVL" /> : (
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/60">
              <tr className="border-b border-slate-100">
                <th className="px-3 py-2 text-left text-[13px] font-medium text-slate-500 w-8">#</th>
                <th className="px-3 py-2 text-left text-[13px] font-medium text-slate-500">Nguyên vật liệu</th>
                <th className="px-3 py-2 text-left text-[13px] font-medium text-slate-500 w-24">ĐVT</th>
                <th className="px-3 py-2 text-right text-[13px] font-medium text-slate-500 w-28">ĐM/1SP</th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {template.nvlLines.map((l, i) => (
                <tr key={l.id} className="border-b border-slate-50">
                  <td className="px-3 py-2 text-center text-slate-400">{i + 1}</td>
                  <td className="px-3 py-2 font-medium text-slate-800">{l.material}</td>
                  <td className="px-3 py-2 text-slate-500">{l.unit}</td>
                  <td className="px-3 py-2 text-right">
                    <input type="number" min={0} step="0.1" defaultValue={l.normPerUnit}
                      onBlur={(e) => { const v = Number(e.target.value); if (v !== l.normPerUnit) m.updateNvl.mutate({ templateId: template.id, lineId: l.id, patch: { normPerUnit: v } }); }}
                      className={`${cellInput} w-20 text-right`} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button onClick={() => m.removeNvl.mutate({ templateId: template.id, lineId: l.id })} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600">
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

// ---- Editor dòng BTP ----
function BtpLinesEditor({ template, m }: { template: BomTemplateFull; m: ReturnType<typeof useBomTemplateMutation> }) {
  const [btp, setBtp] = useState("");
  const [unit, setUnit] = useState("Bộ");
  const [norm, setNorm] = useState<number>(0);

  const add = () => {
    if (!btp.trim() || norm <= 0) return;
    m.addBtp.mutate({ templateId: template.id, line: { btp: btp.trim(), unit, normPerUnit: norm } },
      { onSuccess: () => { setBtp(""); setNorm(0); } });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <input className={`${inputCls} w-48`} placeholder="Tên BTP" value={btp} onChange={(e) => setBtp(e.target.value)} />
        <select className={`${inputCls} w-24`} value={unit} onChange={(e) => setUnit(e.target.value)}>
          {["Bộ", "Cái/Con", "Tấm", "Kg", "Mét"].map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
        <input type="number" min={0} step="0.1" className={`${inputCls} w-28`} placeholder="ĐM/1SP" value={norm || ""} onChange={(e) => setNorm(Number(e.target.value))} />
        <Button onClick={add} disabled={m.addBtp.isPending || !btp.trim() || norm <= 0} className="px-3 py-1.5 text-sm">+ Thêm</Button>
      </div>

      {template.btpLines.length === 0 ? <EmptyState text="Chưa có dòng BTP" /> : (
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/60">
              <tr className="border-b border-slate-100">
                <th className="px-3 py-2 text-left text-[13px] font-medium text-slate-500 w-8">#</th>
                <th className="px-3 py-2 text-left text-[13px] font-medium text-slate-500">Bán thành phẩm</th>
                <th className="px-3 py-2 text-left text-[13px] font-medium text-slate-500 w-24">ĐVT</th>
                <th className="px-3 py-2 text-right text-[13px] font-medium text-slate-500 w-28">ĐM/1SP</th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {template.btpLines.map((l, i) => (
                <tr key={l.id} className="border-b border-slate-50">
                  <td className="px-3 py-2 text-center text-slate-400">{i + 1}</td>
                  <td className="px-3 py-2 font-medium text-slate-800">{l.btp}</td>
                  <td className="px-3 py-2 text-slate-500">{l.unit}</td>
                  <td className="px-3 py-2 text-right">
                    <input type="number" min={0} step="0.1" defaultValue={l.normPerUnit}
                      onBlur={(e) => { const v = Number(e.target.value); if (v !== l.normPerUnit) m.updateBtp.mutate({ templateId: template.id, lineId: l.id, patch: { normPerUnit: v } }); }}
                      className={`${cellInput} w-20 text-right`} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button onClick={() => m.removeBtp.mutate({ templateId: template.id, lineId: l.id })} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600">
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