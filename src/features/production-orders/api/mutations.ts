import { productionOrderService } from "../services/productionOrderService";
import { normService } from "../services/normService";
import type { ProductionOrderValues } from "../model/types";
import type { NormRow } from "../model/norm.types";

export const poMutations = {
  create: (values: ProductionOrderValues) => productionOrderService.create(values),
  addComment: (poId: string, content: string) => productionOrderService.addComment(poId, content),
  updateAllocation: (poId: string, stage: string, patch: { quantity?: number; assignee?: string; state?: "pending" | "active" | "done"; startDate?: string; endDate?: string }) => productionOrderService.updateAllocation(poId, stage, patch),
  addNvl: (poId: string, input: { material: string; unit: string; normPerUnit: number; belongProduct: string; belongBtp?: string }) => normService.addNvl(poId, input),
  updateNvl: (poId: string, rowId: string, patch: Partial<Pick<NormRow, "normPerUnit" | "material" | "unit" | "belongProduct" | "belongBtp">>) => normService.updateNvl(poId, rowId, patch),
  removeNvl: (poId: string, rowId: string) => normService.removeNvl(poId, rowId),
  applyBom: (poId: string, templateId: string, qty: number, mode?: "replace" | "append") => normService.applyTemplate(poId, templateId, qty, mode ?? "append"),
};