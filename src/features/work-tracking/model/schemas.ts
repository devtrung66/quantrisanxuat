import { z } from "zod";
import { WORK_PRIORITY, WORK_STATUS } from "./constants";

export const workItemSchema = z.object({
  lsxCode: z.string().min(1, "Mã lệnh SX bắt buộc"),
  content: z.string().min(1, "Nội dung công việc bắt buộc"),
  priority: z.enum([WORK_PRIORITY.normal, WORK_PRIORITY.urgent, WORK_PRIORITY.now]),
  status: z.enum([WORK_STATUS.doing, WORK_STATUS.done, WORK_STATUS.pending]),
  startDate: z.string().min(1, "Chọn ngày bắt đầu"),
  endDate: z.string().min(1, "Chọn ngày kết thúc"),
  workers: z.array(z.string()).min(1, "Chọn ít nhất 1 người thực hiện"),
  evaluation: z.string().optional(),
  supervisorNote: z.string().optional(),
});

export type WorkItemFormValues = z.infer<typeof workItemSchema>;
