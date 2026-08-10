import { z } from "zod";
import { THEME, LANGUAGE } from "./constants";

export const profileSchema = z.object({
  fullName: z.string().min(1, "Họ tên bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(1, "SĐT bắt buộc"),
  role: z.string().min(1, "Vai trò bắt buộc"),
});

export const preferenceSchema = z.object({
  theme: z.enum([THEME.light, THEME.dark]),
  language: z.enum([LANGUAGE.vi, LANGUAGE.en]),
  wipThreshold: z.coerce.number().int().nonnegative("≥ 0"),
  emailNotify: z.boolean(),
  defectAlert: z.boolean(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
export type PreferenceSchema = z.infer<typeof preferenceSchema>;
