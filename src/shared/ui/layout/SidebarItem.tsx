import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  to: string;
  icon: ReactNode;
  label: string;
  end?: boolean;
}

export function SidebarItem({ to, icon, label, end }: Props) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
          isActive ? "bg-sidebar-active text-white font-medium" : "text-blue-100/80 hover:bg-sidebar-hover hover:text-white"
        )
      }
    >
      <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
