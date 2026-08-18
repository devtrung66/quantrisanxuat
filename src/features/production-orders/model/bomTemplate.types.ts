// Bảng Định Mức mẫu (BĐM) — gắn với 1 sản phẩm, tái dùng cho mọi LSX.

// 1 dòng NVL trong BĐM mẫu (chưa nhân số lượng)
export interface BomNvlLine {
  id: string;
  material: string;     // tên NVL (từ Danh mục)
  unit: string;         // ĐVT
  normPerUnit: number;  // ĐM / 1 SP
  belongBtp?: string;   // thuộc BTP (nếu có)
}

// 1 dòng BTP trong BĐM mẫu
export interface BomBtpLine {
  id: string;
  btp: string;          // tên bán thành phẩm
  unit: string;
  normPerUnit: number;  // ĐM / 1 SP
}

// BĐM mẫu của 1 sản phẩm
export interface BomTemplateFull {
  id: string;
  code: string;         // BDM-HHVT-010-001
  productId: string;    // id sản phẩm (khớp catalog MOCK_PRODUCTS)
  productName: string;  // tên SP (hiển thị)
  nvlLines: BomNvlLine[];
  btpLines: BomBtpLine[];
}