// MOCK. Thay bằng mapping DTO khi nối API.
import type { WorkItem, Worker } from "../model/types";

export const WORKERS: Worker[] = [
  { id: "w1", name: "ĐOÀN" },
  { id: "w2", name: "HUY" },
  { id: "w3", name: "PHONG" },
  { id: "w4", name: "HẬU" },
  { id: "w5", name: "HẢI" },
  { id: "w6", name: "OANH" },
];

// Công việc theo từng tổ. Key = team id.
export const WORK_DB: Record<string, WorkItem[]> = {
  "hoan-thien": [
    {
      id: "wk9", seq: 9, lsxCode: "L154",
      content: "Kiểm tra sửa chữa điều chỉnh xe chữa cháy UD để bàn giao tới khách hàng.",
      priority: "normal", status: "doing",
      startDate: "2026-03-12", endDate: "2026-03-14",
      workers: ["w1", "w2", "w3", "w4", "w6"],
      supervisorNote: "Chưa nắm được tình trạng xe",
    },
    {
      id: "wk12", seq: 12, lsxCode: "L32-260312",
      content: "Gia công đơn hàng 30 thùng TMT\n- Bắn tôn ốp ngoài\n- Bắn tôn ốp trong\n- Lắp đặt acxo\n- Lắp bạt\n- Lắp đặt cửa sau",
      priority: "urgent", status: "doing",
      startDate: "2026-03-18", endDate: "2026-04-17",
      workers: ["w1", "w3", "w4", "w5"],
      supervisorNote: "Chưa triển khai",
    },
    {
      id: "wk14", seq: 14, lsxCode: "L15",
      content: "Thi công tháo thiết bị theo bảng kiểm phục vụ kiểm tra.\nLắp đặt thiết bị sau khi nghiệm thu đăng kiểm 31-03-2026",
      priority: "now", status: "doing",
      startDate: "2026-03-26", endDate: "2026-03-26",
      workers: ["w4", "w3", "w5", "w6"],
      evaluation: "ĐẠT ĐÚNG THỜI GIAN",
    },
    {
      id: "wk15", seq: 15, lsxCode: "L221",
      content: "Thực hiện các công việc cho 03 xe:\n- Thi công lắp đặt thùng đổ\n- Thi công cản trước\n- Thi công lắp đặt đèn tìm kiếm\n- Thi công sửa cản hông\n- Lắp đặt truyền động\n- Lắp đặt bảng điều khiển\n- Giá đỡ láng sau\n- Chỉnh sửa cản sau\n- Lắp đặt sàn thao tác phía sau\n- Lắp đặt đèn hậu\n- Thi công lắp đặt lại hệ thống đường ống\n- Lắp đặt bơm mồi",
      priority: "urgent", status: "done",
      startDate: "2026-03-26", endDate: "2026-03-27",
      endNote: "Hoàn thành ngày 06/04/2026",
      workers: ["w1", "w2", "w3", "w4", "w5", "w6"],
      supervisorNote: "Chưa vận hành kiểm tra",
    },
    {
      id: "wk16", seq: 16, lsxCode: "L242",
      content: "Thi công hệ thống truyền động - Phong\nThi công hệ thống đường ống - Huy",
      priority: "urgent", status: "doing",
      startDate: "2026-03-31", endDate: "2026-04-02",
      workers: ["w2", "w3"],
      supervisorNote: "Tính lại các phương án lắp đặt hệ thống truyền động",
    },
    {
      id: "wk18", seq: 18, lsxCode: "L112",
      content: "Xe chữa cháy KCN Bá Thiện\n- Lắp đặt hệ thống tưới rửa đường phía đầu xe\n- Hoàn thiện lắp đặt xe",
      priority: "urgent", status: "doing",
      startDate: "2026-04-06", endDate: "2026-04-07",
      workers: ["w2"],
    },
  ],
  "to-may": [
    {
      id: "tm1", seq: 1, lsxCode: "L200",
      content: "May bạt phủ thùng xe tải 5 tấn",
      priority: "normal", status: "doing",
      startDate: "2026-04-01", endDate: "2026-04-05",
      workers: ["w6"],
    },
  ],
  "che-tao": [],
  "co-dien": [
    {
      id: "cd1", seq: 1, lsxCode: "L221",
      content: "Đấu nối hệ thống điện đèn tìm kiếm và bảng điều khiển",
      priority: "urgent", status: "done",
      startDate: "2026-03-28", endDate: "2026-03-30",
      workers: ["w5"],
      evaluation: "ĐẠT ĐÚNG THỜI GIAN",
    },
  ],
  "to-son": [],
};

export function getMockWorkItems(teamId: string): WorkItem[] {
  return WORK_DB[teamId] ?? [];
}

export function getWorkerName(id: string): string {
  return WORKERS.find((w) => w.id === id)?.name ?? id;
}

// Sinh id + seq cho công việc mới
let WSEQ = 100;
export function nextWorkId(): string {
  WSEQ += 1;
  return `wk${WSEQ}`;
}

// Thêm 1 công việc vào tổ (mock, mất khi reload)
export function addWorkItem(teamId: string, item: WorkItem): WorkItem {
  if (!WORK_DB[teamId]) WORK_DB[teamId] = [];
  WORK_DB[teamId].unshift(item);
  return item;
}

// Số thứ tự kế tiếp trong tổ
export function nextSeq(teamId: string): number {
  const rows = WORK_DB[teamId] ?? [];
  return rows.reduce((max, r) => Math.max(max, r.seq), 0) + 1;
}
