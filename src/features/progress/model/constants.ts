export const STAGE_STATUS = {
  done: "done",
  active: "active",
  pending: "pending",
} as const;

export type StageStatus = (typeof STAGE_STATUS)[keyof typeof STAGE_STATUS];

export const STAGE_STATUS_LABEL: Record<StageStatus, string> = {
  done: "Hoàn thành",
  active: "Đang chạy",
  pending: "Chờ",
};
