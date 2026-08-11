// MOCK. Thay bằng mapping DTO khi nối API.
import type { ProductionOrder, SourceOrder, Comment } from "../model/types";
import { ALLOCATION_STAGES } from "../model/constants";

let SEQ = 4;

export const SOURCE_ORDERS: SourceOrder[] = [
  { code: "DH2405001", customer: "Công ty ABC", product: "SP A", planQty: 2000 },
  { code: "DH2405002", customer: "Công ty DEF", product: "SP B", planQty: 3000 },
  { code: "DH2405004", customer: "Công ty JKL", product: "SP D", planQty: 2500 },
  { code: "DH2405005", customer: "Công ty MNO", product: "SP E", planQty: 1800 },
];

// Phân bổ công đoạn giảm dần thực tế (có assignee + trạng thái)
function alloc(total: number, states: ("pending" | "active" | "done")[]) {
  const ratios = [1, 0.95, 0.9, 0.85, 0.8];
  const assignees = ["Tổ Cắt", "Tổ Gia công", "Tổ Lắp ráp", "Tổ KCS", "Tổ Đóng gói"];
  return ALLOCATION_STAGES.map((stage, i) => ({
    stage,
    quantity: Math.round(total * ratios[i]),
    startDate: "2025-05-27",
    endDate: "2025-06-07",
    assignee: assignees[i],
    state: states[i] ?? "pending",
  }));
}

export const MOCK_PRODUCTION_ORDERS: ProductionOrder[] = [
  {
    id: "1",
    code: "LSX-05/2025-001",
    orderCode: "DH2405001",
    customer: "Công ty ABC",
    product: "SP A",
    totalQty: 2000,
    status: "in_progress",
    createdAt: "2025-05-27T09:00:00",
    allocations: alloc(2000, ["done", "done", "active", "pending", "pending"]),
    plan: { code: "KHSX-05/2025-001", date: "2025-05-27", source: "Theo ĐBH" },
    workshop: { code: "X-002", name: "Xưởng 2" },
    plannedStart: "2025-05-27T16:24:00",
    plannedEnd: "2025-06-07T16:24:00",
    description: "",
    products: [
      { id: "p1", code: "SP-A", name: "Sản phẩm A", unit: "Cái", quantity: 1200 },
      { id: "p2", code: "SP-A2", name: "Sản phẩm A - biến thể 2", unit: "Cái", quantity: 800 },
    ],
    links: [
      { id: "l1", kind: "order", code: "DH2405001", label: "Công ty ABC - SP A", date: "2025-05-25", status: "Đang SX" },
      { id: "l2", kind: "plan", code: "KHSX-05/2025-001", label: "Kế hoạch tháng 05", date: "2025-05-27" },
      { id: "l3", kind: "material-out", code: "PXK-05/2025-011", label: "Xuất NVL cho công đoạn cắt", date: "2025-05-27", status: "Đã xuất" },
      { id: "l4", kind: "product-in", code: "PNK-05/2025-004", label: "Nhập thành phẩm đợt 1", date: "2025-06-01", status: "Một phần" },
    ],
    system: {
      createdBy: "Nguyễn Văn A",
      createdAt: "2025-05-27T09:00:00",
      updatedBy: "Trần Thị B",
      updatedAt: "2025-06-01T14:30:00",
      systemId: "po_01H8ABC001",
    },
    process: [
      { key: "draft", label: "Nháp", state: "done", actor: "Nguyễn Văn A", at: "2025-05-27T09:00:00" },
      { key: "released", label: "Đã ban hành", state: "done", actor: "Trần Thị B", at: "2025-05-27T10:15:00" },
      { key: "in_progress", label: "Đang sản xuất", state: "active", actor: "Xưởng 2", at: "2025-05-28T08:00:00" },
      { key: "done", label: "Hoàn thành", state: "pending" },
    ],
    tasks: [
      { id: "t1", title: "Chuẩn bị nguyên liệu thép tấm", assignee: "Tổ Cắt", dueDate: "2025-05-28", status: "done", priority: "high" },
      { id: "t2", title: "Gia công chi tiết SP-A", assignee: "Tổ Gia công", dueDate: "2025-06-02", status: "doing", priority: "medium" },
      { id: "t3", title: "Kiểm tra chất lượng lô đầu", assignee: "Tổ KCS", dueDate: "2025-06-05", status: "todo", priority: "high" },
      { id: "t4", title: "Đóng gói và dán nhãn", assignee: "Tổ Đóng gói", dueDate: "2025-06-07", status: "todo", priority: "low" },
    ],
  },
  {
    id: "2",
    code: "LSX-05/2025-002",
    orderCode: "DH2405002",
    customer: "Công ty DEF",
    product: "SP B",
    totalQty: 3000,
    status: "released",
    createdAt: "2025-05-28T10:30:00",
    allocations: alloc(3000, ["done", "active", "pending", "pending", "pending"]),
    plan: { code: "KHSX-05/2025-002", date: "2025-05-28", source: "Theo ĐBH" },
    workshop: { code: "X-001", name: "Xưởng 1" },
    plannedStart: "2025-05-28T08:00:00",
    plannedEnd: "2025-06-10T17:00:00",
    description: "",
    products: [
      { id: "p3", code: "SP-B", name: "Sản phẩm B", unit: "Bộ", quantity: 3000 },
    ],
    links: [
      { id: "l5", kind: "order", code: "DH2405002", label: "Công ty DEF - SP B", date: "2025-05-26", status: "Đã ban hành" },
      { id: "l6", kind: "plan", code: "KHSX-05/2025-002", label: "Kế hoạch tháng 05", date: "2025-05-28" },
    ],
    system: {
      createdBy: "Nguyễn Văn A",
      createdAt: "2025-05-28T10:30:00",
      updatedBy: "Nguyễn Văn A",
      updatedAt: "2025-05-28T10:30:00",
      systemId: "po_01H8ABC002",
    },
    process: [
      { key: "draft", label: "Nháp", state: "done", actor: "Nguyễn Văn A", at: "2025-05-28T10:30:00" },
      { key: "released", label: "Đã ban hành", state: "active", actor: "Trần Thị B", at: "2025-05-28T11:00:00" },
      { key: "in_progress", label: "Đang sản xuất", state: "pending" },
      { key: "done", label: "Hoàn thành", state: "pending" },
    ],
    tasks: [
      { id: "t5", title: "Duyệt định mức với xưởng 1", assignee: "Quản đốc", dueDate: "2025-05-29", status: "doing", priority: "high" },
    ],
  },
  {
    id: "4",
    code: "LSX-05/2025-004",
    orderCode: "DH2405004",
    customer: "Công ty JKL",
    product: "SP D",
    totalQty: 2500,
    status: "draft",
    createdAt: "2025-05-30T09:00:00",
    allocations: alloc(2500, ["pending", "pending", "pending", "pending", "pending"]),
    plan: { code: "KHSX-05/2025-004", date: "2025-05-30", source: "Theo ĐBH" },
    workshop: { code: "X-001", name: "Xưởng 1" },
    plannedStart: "2025-05-30T08:00:00",
    plannedEnd: "2025-06-15T17:00:00",
    description: "",
    products: [
      { id: "p6", code: "SP-D", name: "Sản phẩm D", unit: "Cái", quantity: 2500 },
    ],
    links: [
      { id: "l7", kind: "order", code: "DH2405004", label: "Công ty JKL - SP D", date: "2025-05-29", status: "Nháp" },
    ],
    system: {
      createdBy: "admin",
      createdAt: "2025-05-30T09:00:00",
      updatedBy: "admin",
      updatedAt: "2025-05-30T09:00:00",
      systemId: "po_01H8ABC004",
    },
    process: [
      { key: "draft", label: "Nháp", state: "active", actor: "admin", at: "2025-05-30T09:00:00" },
      { key: "released", label: "Đã ban hành", state: "pending" },
      { key: "in_progress", label: "Đang sản xuất", state: "pending" },
      { key: "done", label: "Hoàn thành", state: "pending" },
    ],
    tasks: [],
  },
];

// Bình luận mock theo LSX
export const MOCK_COMMENTS: Record<string, Comment[]> = {
  "1": [
    { id: "c1", author: "Nguyễn Văn A", avatar: "A", content: "Đã xác nhận định mức với xưởng, tiến hành cắt nguyên liệu.", createdAt: "2025-05-27T10:15:00" },
    { id: "c2", author: "Trần Thị B", avatar: "B", content: "Lưu ý SP-A2 dùng nguyên liệu khác, kiểm tra tồn kho trước.", createdAt: "2025-05-27T11:02:00" },
  ],
  "2": [],
  "4": [],
};

export function nextPoId(): string {
  SEQ += 1;
  return String(SEQ);
}

export function nextPoCode(): string {
  return `LSX-05/2025-${String(SEQ + 1).padStart(3, "0")}`;
}

let CSEQ = 2;
export function nextCommentId(): string {
  CSEQ += 1;
  return `c${CSEQ}`;
}
