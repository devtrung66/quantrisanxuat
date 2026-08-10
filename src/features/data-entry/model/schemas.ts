import { z } from "zod";

const base = {
  orderCode: z.string().min(1, "Chọn đơn hàng"),
  stage: z.string().min(1, "Chọn công đoạn"),
  quantity: z.coerce.number().int().positive("Số lượng phải > 0"),
  note: z.string().optional(),
};

export const standardEntrySchema = z.object(base);

export const defectEntrySchema = z.object({
  ...base,
  reason: z.string().min(1, "Chọn nguyên nhân lỗi"),
});

export type StandardEntrySchema = z.infer<typeof standardEntrySchema>;
export type DefectEntrySchema = z.infer<typeof defectEntrySchema>;
