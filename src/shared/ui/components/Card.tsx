import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}

export function Card({ children, className, title, action }: Props) {
  return (
    <div className={clsx("rounded-xl bg-white shadow-sm border border-slate-100", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          {title && <h3 className="text-[15px] font-semibold text-slate-800">{title}</h3>}
          {action}
        </div>
      )}
      <div className={clsx(title || action ? "px-5 pb-5" : "p-5")}>{children}</div>
    </div>
  );
}
