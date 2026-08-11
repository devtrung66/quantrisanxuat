import { Construction } from "lucide-react";

export function SectionPlaceholder({ title }: { title: string }) {
  return (
    <section>
      <h3 className="mb-3 text-base font-semibold text-slate-800">{title}</h3>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-slate-200 py-10 text-center">
        <Construction className="h-6 w-6 text-slate-300" />
        <p className="text-sm text-slate-400">Phần này đang được phát triển.</p>
      </div>
    </section>
  );
}
