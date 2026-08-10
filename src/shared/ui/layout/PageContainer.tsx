import { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1400px] px-6 py-6">{children}</div>;
}
