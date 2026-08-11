import { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1760px] px-6 py-6">{children}</div>;
}
