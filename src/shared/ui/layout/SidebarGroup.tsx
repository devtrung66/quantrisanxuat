import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface Props {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SidebarGroup({ icon, label, children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-blue-100/80 hover:bg-sidebar-hover hover:text-white transition"
      >
        <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="mt-1 space-y-1 pl-6">{children}</div>}
    </div>
  );
}
