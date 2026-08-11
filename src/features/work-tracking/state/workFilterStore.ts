import { create } from "zustand";
import { TEAMS } from "../model/constants";
import type { WorkPriority, WorkStatus } from "../model/constants";

interface WorkFilterState {
  teamId: string;
  keyword: string;
  priority: WorkPriority | "all";
  status: WorkStatus | "all";
  setTeam: (id: string) => void;
  setKeyword: (v: string) => void;
  setPriority: (v: WorkPriority | "all") => void;
  setStatus: (v: WorkStatus | "all") => void;
}

export const useWorkFilterStore = create<WorkFilterState>((set) => ({
  teamId: TEAMS[0].id,
  keyword: "",
  priority: "all",
  status: "all",
  setTeam: (teamId) => set({ teamId, keyword: "", priority: "all", status: "all" }),
  setKeyword: (keyword) => set({ keyword }),
  setPriority: (priority) => set({ priority }),
  setStatus: (status) => set({ status }),
}));
