export const ENTRY_TYPE = {
  standard: "standard",
  defect: "defect",
} as const;

export type EntryType = (typeof ENTRY_TYPE)[keyof typeof ENTRY_TYPE];

export const ENTRY_TYPE_LABEL: Record<EntryType, string> = {
  standard: "Đạt chuẩn",
  defect: "Lỗi",
};

// Loại lỗi (dùng cho form Hàng lỗi)
export const DEFECT_REASONS = [
  { value: "material", label: "Lỗi nguyên liệu" },
  { value: "machine", label: "Lỗi máy móc" },
  { value: "operator", label: "Lỗi thao tác" },
  { value: "measurement", label: "Sai kích thước" },
  { value: "other", label: "Khác" },
] as const;
