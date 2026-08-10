export const THEME = {
  light: "light",
  dark: "dark",
} as const;
export type Theme = (typeof THEME)[keyof typeof THEME];
export const THEME_LABEL: Record<Theme, string> = { light: "Sáng", dark: "Tối" };

export const LANGUAGE = {
  vi: "vi",
  en: "en",
} as const;
export type Language = (typeof LANGUAGE)[keyof typeof LANGUAGE];
export const LANGUAGE_LABEL: Record<Language, string> = { vi: "Tiếng Việt", en: "English" };

// Ngưỡng cảnh báo WIP cấu hình toàn hệ thống
export const DEFAULT_WIP_THRESHOLD = 150;
