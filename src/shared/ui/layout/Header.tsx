import { Menu } from "lucide-react";
import { NotificationBell } from "../components/NotificationBell";
import { UserMenu } from "../components/UserMenu";

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <Menu className="h-5 w-5 text-slate-500" />
        <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
      </div>
      <div className="flex items-center gap-1">
        <NotificationBell count={2} />
        <UserMenu name="admin" />
      </div>
    </header>
  );
}
