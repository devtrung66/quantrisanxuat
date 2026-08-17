import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
  className?: string;
  width?: string;   // vd "140px", "20%", "1fr"
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
}

export function DataTable<T>({ columns, data, rowKey }: Props<T>) {
  const alignCls = (a?: string) => (a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left");
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed text-sm">
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} style={c.width ? { width: c.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((c) => (
              <th key={c.key} className={`px-3 py-3 text-[13px] font-semibold text-slate-500 ${alignCls(c.align)}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)} className="border-b border-slate-50 hover:bg-slate-50/60">
              {columns.map((c) => (
                <td key={c.key} className={`px-3 py-3.5 align-middle text-slate-700 ${alignCls(c.align)} ${c.className ?? ""}`}>
                  {c.render ? c.render(row) : (row as any)[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}