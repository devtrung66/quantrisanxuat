import { z } from "zod";
import { ORDER_STATUS } from "./constants";

export const orderFormSchema = z.object({
  code: z.string().min(1, "Mã đơn hàng bắt buộc"),
  customer: z.string().min(1, "Khách hàng bắt buộc"),
  product: z.string().min(1, "Sản phẩm bắt buộc"),
  planQty: z.coerce.number().int().positive("Số lượng phải > 0"),
  orderDate: z.string().min(1, "Ngày đặt bắt buộc"),
  dueDate: z.string().min(1, "Hạn giao bắt buộc"),
  status: z.enum([
    ORDER_STATUS.pending,
    ORDER_STATUS.in_progress,
    ORDER_STATUS.completed,
    ORDER_STATUS.cancelled,
  ]),
  note: z.string().optional(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
