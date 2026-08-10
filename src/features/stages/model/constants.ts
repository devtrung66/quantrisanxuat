export const STAGE_STATE = {
  active: "active",
  paused: "paused",
} as const;

export type StageState = (typeof STAGE_STATE)[keyof typeof STAGE_STATE];

export const STAGE_STATE_LABEL: Record<StageState, string> = {
  active: "Đang hoạt động",
  paused: "Tạm dừng",
};

export const STAGE_STATE_TONE: Record<StageState, "green" | "slate"> = {
  active: "green",
  paused: "slate",
};

// Ngưỡng WIP cảnh báo (mặc định)
export const WIP_WARN_THRESHOLD = 150;
