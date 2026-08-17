import { z } from "zod";
import { ORDER_STATUS } from "./constants";

export const orderFormSchema = z.object({
  code: z.string().min(1, "Tên LSX bắt buộc"),
  content: z.string().min(1, "Nội dung bắt buộc"),
  customer: z.string().min(1, "Khách hàng bắt buộc"),
  chassisNumber: z.string().min(1, "Số khung bắt buộc"),
  containerCode: z.string().optional().or(z.literal("")),
  product: z.string().optional().or(z.literal("")),
  planQty: z.coerce.number().int().positive("Số lượng phải > 0"),
  startDate: z.string().min(1, "Ngày bắt đầu bắt buộc"),
  orderDate: z.string().optional().or(z.literal("")),
  dueDate: z.string().min(1, "Ngày hoàn thành bắt buộc"),
  status: z.enum([
    ORDER_STATUS.pending,
    ORDER_STATUS.in_progress,
    ORDER_STATUS.completed,
    ORDER_STATUS.cancelled,
  ]),
  note: z.string().optional(),
});

export type OrderFormSchema = z.infer<typeof orderFormSchema>;