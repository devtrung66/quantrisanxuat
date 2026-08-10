import type { Stage, StageFormValues } from "../model/types";
import { MOCK_STAGES, nextStageId } from "../adapters/stageAdapter";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

function sortByOrder(rows: Stage[]) {
  return [...rows].sort((a, b) => a.order - b.order);
}

export const stageService = {
  async list(): Promise<Stage[]> {
    return delay(sortByOrder(MOCK_STAGES));
  },

  async detail(id: string): Promise<Stage | undefined> {
    return delay(MOCK_STAGES.find((s) => s.id === id));
  },

  async create(v: StageFormValues): Promise<Stage> {
    const stage: Stage = {
      id: nextStageId(),
      ...v,
      wip: 0,
      todayStandard: 0,
      todayDefect: 0,
    };
    MOCK_STAGES.push(stage);
    return delay(stage);
  },

  async update(id: string, v: StageFormValues): Promise<Stage> {
    const idx = MOCK_STAGES.findIndex((s) => s.id === id);
    if (idx < 0) throw new Error("Không tìm thấy công đoạn");
    MOCK_STAGES[idx] = { ...MOCK_STAGES[idx], ...v };
    return delay(MOCK_STAGES[idx]);
  },

  async remove(id: string): Promise<void> {
    const idx = MOCK_STAGES.findIndex((s) => s.id === id);
    if (idx >= 0) MOCK_STAGES.splice(idx, 1);
    return delay(undefined);
  },
};
