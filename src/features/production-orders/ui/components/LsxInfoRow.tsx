import { ReactNode } from "react";

// 1 dòng thông tin dạng "icon + nhãn ....... giá trị" như Cleeksy.
export function LsxInfoRow({
  icon, label, children, align = "center",
}: {
  icon?: ReactNode;
  label: string;
  children: ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div className={`flex gap-4 py-2.5 ${align === "start" ? "items-start" : "items-center"}`}>
      <div className="flex w-52 shrink-0 items-center gap-2 text-sm text-slate-500">
        {icon && <span className="text-slate-400">{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="min-w-0 flex-1 text-sm text-slate-800">{children}</div>
    </div>
  );
}
