import clsx from "clsx";
import { LSX_NAV } from "../../model/constants";
import type { LsxSection } from "../../model/constants";

// Sidebar điều hướng trong 1 LSX. active = section đang xem (scroll-spy),
// onJump = click để cuộn tới section.
export function LsxSidebar({
  active, onJump,
}: {
  active: LsxSection;
  onJump: (id: LsxSection) => void;
}) {
  return (
    <nav className="w-60 shrink-0 border-r border-slate-100 py-2 pr-3">
      {LSX_NAV.map((group, gi) => (
        <div key={gi} className={gi > 0 ? "mt-1" : ""}>
          {group.label && (
            <button
              type="button"
              className="flex w-full items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700"
            >
              <span className="text-slate-400">▾</span>
              {group.label}
            </button>
          )}
          <div className={group.label ? "space-y-0.5" : "space-y-0.5"}>
            {group.items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onJump(item.id)}
                  className={clsx(
                    "block w-full truncate rounded-md py-2 pr-3 text-left text-sm transition",
                    group.label ? "pl-8" : "pl-3",
                    isActive
                      ? "bg-blue-50 font-medium text-blue-600"
                      : "text-slate-600 hover:bg-slate-50",
                    !item.ready && "text-slate-400"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
