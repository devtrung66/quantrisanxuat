import type { WorkPriority, WorkStatus } from "./constants";

// 1 người thực hiện (chip màu)
export interface Worker {
  id: string;
  name: string;    // ĐOÀN, HUY, PHONG...
}

// 1 dòng công việc theo tổ (khớp cột Google Sheet của khách)
export interface WorkItem {
  id: string;
  seq: number;              // T.T
  lsxCode: string;          // LỆNH SẢN XUẤT: L154, L221...
  content: string;          // NỘI DUNG CÔNG VIỆC (nhiều dòng)
  priority: WorkPriority;   // THỨ TỰ ƯU TIÊN
  status: WorkStatus;       // TÌNH TRẠNG
  startDate: string;        // NGÀY BẮT ĐẦU (ISO)
  endDate: string;          // NGÀY KẾT THÚC (ISO)
  endNote?: string;         // ghi chú ngày KT (vd "Hoàn thành ngày 06/04/2026")
  workers: string[];        // NGƯỜI THỰC HIỆN (nhiều người, lưu id)
  evaluation?: string;      // ĐÁNH GIÁ
  supervisorNote?: string;  // Ý KIẾN TỪ QUẢN ĐỐC
}

// 1 tổ / bộ phận (tab)
export interface Team {
  id: string;      // slug: hoan-thien, to-may...
  name: string;    // HOÀN THIỆN, TỔ MAY...
}
