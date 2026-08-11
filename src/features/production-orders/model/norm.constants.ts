// Cấu hình cho section định mức.

export const NORM_TAB = {
  nvl: "nvl",
  btp: "btp",
} as const;

export type NormTabKey = (typeof NORM_TAB)[keyof typeof NORM_TAB];

export const NORM_TAB_LABEL: Record<NormTabKey, string> = {
  nvl: "Định mức nguyên vật liệu",
  btp: "Định mức BTP",
};

// Màu badge cho đơn vị tính (ĐVT)
export const UNIT_TONE: Record<string, "blue" | "slate" | "green" | "amber"> = {
  "Lít": "blue",
  "Cái/Con": "slate",
  "Bộ": "green",
  "Kg": "amber",
  "Tấm": "slate",
  "m": "slate",
};
