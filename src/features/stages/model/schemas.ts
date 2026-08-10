import { z } from "zod";
import { STAGE_STATE } from "./constants";

export const stageFormSchema = z.object({
  name: z.string().min(1, "Tên công đoạn bắt buộc"),
  order: z.coerce.number().int().positive("Thứ tự phải > 0"),
  state: z.enum([STAGE_STATE.active, STAGE_STATE.paused]),
  standardOutput: z.coerce.number().int().nonnegative("Định mức không hợp lệ"),
  defectLimit: z.coerce.number().min(0, "≥ 0").max(100, "≤ 100"),
});

export type StageFormSchema = z.infer<typeof stageFormSchema>;
