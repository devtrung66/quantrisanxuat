import { z } from "zod";
import { DEFECT_SEVERITY } from "./constants";

export const productSchema = z.object({
  code: z.string().min(1, "Mã bắt buộc"),
  name: z.string().min(1, "Tên bắt buộc"),
  unit: z.string().min(1, "Đơn vị bắt buộc"),
  active: z.boolean(),
});

export const customerSchema = z.object({
  code: z.string().min(1, "Mã bắt buộc"),
  name: z.string().min(1, "Tên bắt buộc"),
  phone: z.string().min(1, "SĐT bắt buộc"),
  address: z.string().min(1, "Địa chỉ bắt buộc"),
});

export const defectSchema = z.object({
  code: z.string().min(1, "Mã bắt buộc"),
  name: z.string().min(1, "Tên bắt buộc"),
  severity: z.enum([DEFECT_SEVERITY.low, DEFECT_SEVERITY.medium, DEFECT_SEVERITY.high]),
});

export const materialSchema = z.object({
  code: z.string().min(1, "Mã bắt buộc"),
  name: z.string().min(1, "Tên bắt buộc"),
  unit: z.string().min(1, "ĐVT bắt buộc"),
  price: z.coerce.number().nonnegative("Đơn giá ≥ 0"),
});