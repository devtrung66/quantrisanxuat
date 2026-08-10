import { User, ChevronDown } from "lucide-react";

export function UserMenu({ name = "admin" }: { name?: string }) {
  return (
    <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-slate-100">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
        <User className="h-4 w-4 text-slate-500" />
      </span>
      <span className="text-sm text-slate-700">{name}</span>
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}
