// MOCK định mức NVL/BTP theo LSX. Thay bằng mapping DTO khi nối API.
import type { NormData, NormRow, BtpRow } from "../model/norm.types";

const round2 = (n: number) => Math.round(n * 100) / 100;

// Dữ liệu gốc cho LSX-001 (khớp ảnh khách)
const NORM_DB: Record<string, NormData> = {
  "1": {
    templates: [
      { id: "b1", code: "BDM-HHVT-010-001", productName: "Tủ quần áo 3 cánh gỗ" },
      { id: "b2", code: "BDM-HHVT-001-001", productName: "Bàn Coffee" },
    ],
    nvlRows: buildNvl([
      { material: "Sơn PU phủ mờ", unit: "Lít", normPerUnit: 1.1, product: "Tủ quần áo 3 cánh gỗ công nghiệp" },
      { material: "Tay nắm nhôm", unit: "Cái/Con", normPerUnit: 2, product: "Tủ quần áo 3 cánh gỗ công nghiệp" },
      { material: "Bản lề Inox 35mm", unit: "Cái/Con", normPerUnit: 7.2, product: "Tủ quần áo 3 cánh gỗ công nghiệp" },
      { material: "Ray trượt ngăn kéo", unit: "Cái/Con", normPerUnit: 2, product: "Tủ quần áo 3 cánh gỗ công nghiệp" },
      { material: "Ván MDF phủ Melamine", unit: "Tấm", normPerUnit: 3.5, product: "Tủ quần áo 3 cánh gỗ công nghiệp" },
      { material: "Vít bắt gỗ 4x40", unit: "Cái/Con", normPerUnit: 48, product: "Tủ quần áo 3 cánh gỗ công nghiệp" },
      { material: "Chân bàn Inox", unit: "Cái/Con", normPerUnit: 4, btp: "Khung bàn", product: "Bàn Coffee" },
      { material: "Mặt kính cường lực", unit: "Tấm", normPerUnit: 1, product: "Bàn Coffee" },
    ], 18),
    btpRows: buildBtp([
      { btp: "Cánh tủ hoàn thiện", unit: "Cái/Con", normPerUnit: 3, product: "Tủ quần áo 3 cánh gỗ công nghiệp" },
      { btp: "Khung tủ lắp ráp", unit: "Bộ", normPerUnit: 1, product: "Tủ quần áo 3 cánh gỗ công nghiệp" },
      { btp: "Khung bàn hàn", unit: "Bộ", normPerUnit: 1, product: "Bàn Coffee" },
    ], 18),
  },
  "2": {
    templates: [
      { id: "b3", code: "BDM-HHVT-020-001", productName: "Sản phẩm B" },
    ],
    nvlRows: buildNvl([
      { material: "Gỗ MDF 18mm", unit: "Tấm", normPerUnit: 0.3, product: "Sản phẩm B" },
      { material: "Keo dán gỗ", unit: "Kg", normPerUnit: 0.1, product: "Sản phẩm B" },
    ], 30),
    btpRows: [],
  },
  "4": {
    templates: [],
    nvlRows: [],
    btpRows: [],
  },
};

// SL sản xuất (đơn vị: trăm sản phẩm) — giả lập để ra số đẹp như ảnh
// LSX-001: 18 -> 1.1*18 = 19.8, 2*18 = 36, 7.2*18 = 129.6 (khớp ảnh)
function buildNvl(
  rows: { material: string; unit: string; normPerUnit: number; btp?: string; product: string }[],
  lsxQty: number
): NormRow[] {
  return rows.map((r, i) => ({
    id: `nvl-${i}`,
    material: r.material,
    unit: r.unit,
    normPerUnit: r.normPerUnit,
    qtyByLsx: round2(r.normPerUnit * lsxQty),
    belongBtp: r.btp,
    belongProduct: r.product,
  }));
}

function buildBtp(
  rows: { btp: string; unit: string; normPerUnit: number; product: string }[],
  lsxQty: number
): BtpRow[] {
  return rows.map((r, i) => ({
    id: `btp-${i}`,
    btp: r.btp,
    unit: r.unit,
    normPerUnit: r.normPerUnit,
    qtyByLsx: round2(r.normPerUnit * lsxQty),
    belongProduct: r.product,
  }));
}

export function getMockNormData(poId: string): NormData {
  return NORM_DB[poId] ?? { templates: [], nvlRows: [], btpRows: [] };
}
