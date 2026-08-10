import { create } from "zustand";
import type { OrderStatus } from "../model/constants";

interface OrderFilterState {
  keyword: string;
  status: OrderStatus | "all";
  page: number;
  setKeyword: (v: string) => void;
  setStatus: (v: OrderStatus | "all") => void;
  setPage: (v: number) => void;
  reset: () => void;
}

export const useOrderFilterStore = create<OrderFilterState>((set) => ({
  keyword: "",
  status: "all",
  page: 1,
  setKeyword: (keyword) => set({ keyword, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
  reset: () => set({ keyword: "", status: "all", page: 1 }),
}));
