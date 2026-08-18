import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bomTemplateService } from "../services/bomTemplateService";
import type { BomNvlLine, BomBtpLine } from "../model/bomTemplate.types";

export function useBomTemplateMutation() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["bom-templates"] });

  const createTemplate = useMutation({
    mutationFn: (input: { code: string; productId: string; productName: string }) => bomTemplateService.create(input),
    onSuccess: invalidate,
  });
  const removeTemplate = useMutation({
    mutationFn: (id: string) => bomTemplateService.remove(id),
    onSuccess: invalidate,
  });

  const addNvl = useMutation({
    mutationFn: (p: { templateId: string; line: Omit<BomNvlLine, "id"> }) => bomTemplateService.addNvl(p.templateId, p.line),
    onSuccess: invalidate,
  });
  const updateNvl = useMutation({
    mutationFn: (p: { templateId: string; lineId: string; patch: Partial<Omit<BomNvlLine, "id">> }) => bomTemplateService.updateNvl(p.templateId, p.lineId, p.patch),
    onSuccess: invalidate,
  });
  const removeNvl = useMutation({
    mutationFn: (p: { templateId: string; lineId: string }) => bomTemplateService.removeNvl(p.templateId, p.lineId),
    onSuccess: invalidate,
  });

  const addBtp = useMutation({
    mutationFn: (p: { templateId: string; line: Omit<BomBtpLine, "id"> }) => bomTemplateService.addBtp(p.templateId, p.line),
    onSuccess: invalidate,
  });
  const updateBtp = useMutation({
    mutationFn: (p: { templateId: string; lineId: string; patch: Partial<Omit<BomBtpLine, "id">> }) => bomTemplateService.updateBtp(p.templateId, p.lineId, p.patch),
    onSuccess: invalidate,
  });
  const removeBtp = useMutation({
    mutationFn: (p: { templateId: string; lineId: string }) => bomTemplateService.removeBtp(p.templateId, p.lineId),
    onSuccess: invalidate,
  });

  return { createTemplate, removeTemplate, addNvl, updateNvl, removeNvl, addBtp, updateBtp, removeBtp };
}