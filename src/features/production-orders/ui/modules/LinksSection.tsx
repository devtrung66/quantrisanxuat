import { FileText, ClipboardList, PackageMinus, PackagePlus, ChevronRight } from "lucide-react";
import { Badge, EmptyState, formatDate } from "@shared/index";
import type { LinkedDoc } from "../../model/types";
import { LINK_KIND_LABEL } from "../../model/constants";

const ICONS: Record<string, React.ReactNode> = {
  order: <ClipboardList className="h-4 w-4" />,
  plan: <FileText className="h-4 w-4" />,
  "material-out": <PackageMinus className="h-4 w-4" />,
  "product-in": <PackagePlus className="h-4 w-4" />,
};

const ICON_BG: Record<string, string> = {
  order: "bg-blue-50 text-blue-600",
  plan: "bg-purple-50 text-purple-600",
  "material-out": "bg-amber-50 text-amber-600",
  "product-in": "bg-green-50 text-green-600",
};

function LinkRow({ doc }: { doc: LinkedDoc }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-lg border border-slate-100 px-3.5 py-3 text-left transition hover:border-slate-200 hover:bg-slate-50/60">
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${ICON_BG[doc.kind]}`}>
        {ICONS[doc.kind]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-800">{doc.code}</span>
          {doc.status && <Badge tone="slate">{doc.status}</Badge>}
        </div>
        <p className="truncate text-xs text-slate-500">
          {LINK_KIND_LABEL[doc.kind]} · {doc.label} · {formatDate(doc.date)}
        </p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
    </button>
  );
}

export function LinksSection({ links }: { links: LinkedDoc[] }) {
  return (
    <section>
      <h3 className="mb-3 text-base font-semibold text-slate-800">Liên kết</h3>
      {links.length === 0 ? (
        <div className="rounded-lg border border-slate-100 px-3 py-1">
          <EmptyState text="Chưa có chứng từ liên kết" />
        </div>
      ) : (
        <div className="space-y-2">
          {links.map((d) => <LinkRow key={d.id} doc={d} />)}
        </div>
      )}
    </section>
  );
}
