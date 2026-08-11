// Định mức nguyên vật liệu (BOM) cho 1 LSX — theo cấu trúc Cleeksy.

// 2 tab trong section định mức
export type NormTab = "nvl" | "btp";

// BĐM = Bảng Định Mức mẫu được áp vào LSX (header chip phía trên bảng)
export interface BomTemplate {
  id: string;
  code: string;        // BDM-HHVT-010-001
  productName: string; // Tủ quần áo 3 cánh gỗ
}

// 1 dòng định mức NVL theo LSX (bảng chính, nhiều cột)
export interface NormRow {
  id: string;
  material: string;      // Nguyên vật liệu: "Sơn PU phủ mờ"
  unit: string;          // ĐVT: "Lít", "Cái/Con"
  normPerUnit: number;   // Số lượng ĐM/1SP
  qtyByLsx: number;      // SL NVL theo LSX (= normPerUnit * SL sản xuất) — cột fx
  belongBtp?: string;    // Thuộc BTP (bán thành phẩm), có thể trống
  belongProduct: string; // Thuộc SP: "Tủ quần áo 3 cánh gỗ công nghiệp"
}

// 1 dòng định mức BTP (bán thành phẩm) — tab thứ 2
export interface BtpRow {
  id: string;
  btp: string;           // tên bán thành phẩm: "Cánh tủ", "Khung tủ"
  unit: string;
  normPerUnit: number;   // ĐM/1SP
  qtyByLsx: number;      // SL theo LSX
  belongProduct: string; // thuộc SP
}

// Toàn bộ dữ liệu định mức của 1 LSX
export interface NormData {
  templates: BomTemplate[];  // danh sách BĐM đã áp
  nvlRows: NormRow[];        // bảng NVL
  btpRows: BtpRow[];         // bảng BTP
}
