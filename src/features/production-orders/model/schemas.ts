import { z } from "zod";

export const allocationSchema = z.object({
  stage: z.string().min(1),
  quantity: z.coerce.number().int().nonnegative("≥ 0"),
  startDate: z.string().min(1, "Chọn ngày bắt đầu"),
  endDate: z.string().min(1, "Chọn ngày kết thúc"),
});

export const productionOrderSchema = z.object({
  orderCode: z.string().min(1, "Chọn đơn hàng nguồn"),
  totalQty: z.coerce.number().int().positive("Số lượng > 0"),
  allocations: z.array(allocationSchema).min(1, "Cần ít nhất 1 công đoạn"),
});

export type ProductionOrderSchema = z.infer<typeof productionOrderSchema>;
