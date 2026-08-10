import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";

export function ExportButton({
  onCsv, onExcel, disabled,
}: {
  onCsv: () => void;
  onExcel: () => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        <Download className="h-4 w-4" /> Xuất báo cáo <ChevronDown className="h-4 w-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
            <button onClick={() => { onCsv(); setOpen(false); }} className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">📄 CSV (.csv)</button>
            <button onClick={() => { onExcel(); setOpen(false); }} className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">📊 Excel (.xls)</button>
          </div>
        </>
      )}
    </div>
  );
}
