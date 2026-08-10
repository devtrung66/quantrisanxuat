export const tokens = {
  color: {
    sidebar: "#0b2b5c",
    sidebarActive: "#1e63d6",
    page: "#f1f5f9",
    green: "#16a34a",
    amber: "#f59e0b",
    red: "#dc2626",
    blue: "#2563eb",
    slate: "#64748b",
  },
} as const;

export type ProgressTone = "green" | "amber" | "red" | "blue";

export function toneByPercent(pct: number): ProgressTone {
  if (pct >= 80) return "green";
  if (pct >= 50) return "blue";
  if (pct >= 30) return "amber";
  return "red";
}
