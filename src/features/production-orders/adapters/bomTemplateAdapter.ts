// MOCK kho BĐM mẫu. Thay bằng mapping DTO khi nối API.
import type { BomTemplateFull, BomNvlLine, BomBtpLine } from "../model/bomTemplate.types";

let TSEQ = 2;
let LSEQ = 100;

export const BOM_TEMPLATES: BomTemplateFull[] = [
  {
    id: "bom1",
    code: "BDM-HHVT-010-001",
    productId: "1",              // SP-A (giả định = Tủ quần áo)
    productName: "Tủ quần áo 3 cánh gỗ công nghiệp",
    nvlLines: [
      { id: "l1", material: "Sơn PU phủ mờ", unit: "Lít", normPerUnit: 1.1 },
      { id: "l2", material: "Tay nắm nhôm", unit: "Cái/Con", normPerUnit: 2 },
      { id: "l3", material: "Bản lề Inox 35mm", unit: "Cái/Con", normPerUnit: 7.2 },
      { id: "l4", material: "Ray trượt ngăn kéo", unit: "Cái/Con", normPerUnit: 2 },
      { id: "l5", material: "Ván MDF phủ Melamine", unit: "Tấm", normPerUnit: 3.5 },
      { id: "l6", material: "Vít bắt gỗ 4x40", unit: "Cái/Con", normPerUnit: 48 },
    ],
    btpLines: [
      { id: "b1", btp: "Cánh tủ hoàn thiện", unit: "Cái/Con", normPerUnit: 3 },
      { id: "b2", btp: "Khung tủ lắp ráp", unit: "Bộ", normPerUnit: 1 },
    ],
  },
  {
    id: "bom2",
    code: "BDM-HHVT-001-001",
    productId: "2",              // SP-B (giả định = Bàn Coffee)
    productName: "Bàn Coffee",
    nvlLines: [
      { id: "l7", material: "Chân bàn Inox", unit: "Cái/Con", normPerUnit: 4 },
      { id: "l8", material: "Mặt kính cường lực", unit: "Tấm", normPerUnit: 1 },
      { id: "l9", material: "Ván MDF phủ Melamine", unit: "Tấm", normPerUnit: 1.2 },
    ],
    btpLines: [
      { id: "b3", btp: "Khung bàn hàn", unit: "Bộ", normPerUnit: 1 },
    ],
  },
];

export function getTemplatesByProduct(productId: string): BomTemplateFull[] {
  return BOM_TEMPLATES.filter((t) => t.productId === productId);
}

export function getTemplateById(id: string): BomTemplateFull | undefined {
  return BOM_TEMPLATES.find((t) => t.id === id);
}

export function nextTemplateId(): string { TSEQ += 1; return `bom${TSEQ}`; }
export function nextLineId(): string { LSEQ += 1; return `bl${LSEQ}`; }

// --- CRUD template ---
export function createTemplate(input: { code: string; productId: string; productName: string }): BomTemplateFull {
  const t: BomTemplateFull = {
    id: nextTemplateId(),
    code: input.code,
    productId: input.productId,
    productName: input.productName,
    nvlLines: [],
    btpLines: [],
  };
  BOM_TEMPLATES.unshift(t);
  return t;
}

export function removeTemplate(id: string): void {
  const i = BOM_TEMPLATES.findIndex((t) => t.id === id);
  if (i >= 0) BOM_TEMPLATES.splice(i, 1);
}

// --- CRUD dòng NVL trong template ---
export function addNvlLine(templateId: string, line: Omit<BomNvlLine, "id">): BomNvlLine | undefined {
  const t = getTemplateById(templateId);
  if (!t) return undefined;
  const l: BomNvlLine = { id: nextLineId(), ...line };
  t.nvlLines.push(l);
  return l;
}

export function updateNvlLine(templateId: string, lineId: string, patch: Partial<Omit<BomNvlLine, "id">>): void {
  const t = getTemplateById(templateId);
  if (!t) return;
  const i = t.nvlLines.findIndex((l) => l.id === lineId);
  if (i >= 0) t.nvlLines[i] = { ...t.nvlLines[i], ...patch };
}

export function removeNvlLine(templateId: string, lineId: string): void {
  const t = getTemplateById(templateId);
  if (!t) return;
  const i = t.nvlLines.findIndex((l) => l.id === lineId);
  if (i >= 0) t.nvlLines.splice(i, 1);
}

// --- CRUD dòng BTP trong template ---
export function addBtpLine(templateId: string, line: Omit<BomBtpLine, "id">): BomBtpLine | undefined {
  const t = getTemplateById(templateId);
  if (!t) return undefined;
  const l: BomBtpLine = { id: nextLineId(), ...line };
  t.btpLines.push(l);
  return l;
}

export function updateBtpLine(templateId: string, lineId: string, patch: Partial<Omit<BomBtpLine, "id">>): void {
  const t = getTemplateById(templateId);
  if (!t) return;
  const i = t.btpLines.findIndex((l) => l.id === lineId);
  if (i >= 0) t.btpLines[i] = { ...t.btpLines[i], ...patch };
}

export function removeBtpLine(templateId: string, lineId: string): void {
  const t = getTemplateById(templateId);
  if (!t) return;
  const i = t.btpLines.findIndex((l) => l.id === lineId);
  if (i >= 0) t.btpLines.splice(i, 1);
}