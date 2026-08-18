import type { BomTemplateFull, BomNvlLine, BomBtpLine } from "../model/bomTemplate.types";
import * as A from "../adapters/bomTemplateAdapter";

function delay<T>(v: T, ms = 200): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const bomTemplateService = {
  async listAll(): Promise<BomTemplateFull[]> {
    return delay([...A.BOM_TEMPLATES]);
  },
  async byProduct(productId: string): Promise<BomTemplateFull[]> {
    return delay(A.getTemplatesByProduct(productId));
  },
  async detail(id: string): Promise<BomTemplateFull | undefined> {
    return delay(A.getTemplateById(id));
  },
  async create(input: { code: string; productId: string; productName: string }) {
    return delay(A.createTemplate(input));
  },
  async remove(id: string) { A.removeTemplate(id); return delay(undefined); },
  async addNvl(templateId: string, line: Omit<BomNvlLine, "id">) { return delay(A.addNvlLine(templateId, line)); },
  async updateNvl(templateId: string, lineId: string, patch: Partial<Omit<BomNvlLine, "id">>) { A.updateNvlLine(templateId, lineId, patch); return delay(undefined); },
  async removeNvl(templateId: string, lineId: string) { A.removeNvlLine(templateId, lineId); return delay(undefined); },
  async addBtp(templateId: string, line: Omit<BomBtpLine, "id">) { return delay(A.addBtpLine(templateId, line)); },
  async updateBtp(templateId: string, lineId: string, patch: Partial<Omit<BomBtpLine, "id">>) { A.updateBtpLine(templateId, lineId, patch); return delay(undefined); },
  async removeBtp(templateId: string, lineId: string) { A.removeBtpLine(templateId, lineId); return delay(undefined); },
};