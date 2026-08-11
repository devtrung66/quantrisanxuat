import type { WorkItem, Worker } from "../model/types";
import type { WorkItemFormValues } from "../model/schemas";
import {
  getMockWorkItems, WORKERS, addWorkItem, nextWorkId, nextSeq,
} from "../adapters/workAdapter";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const workService = {
  async listByTeam(teamId: string): Promise<WorkItem[]> {
    return delay(getMockWorkItems(teamId));
  },
  async workers(): Promise<Worker[]> {
    return delay([...WORKERS]);
  },
  async create(teamId: string, values: WorkItemFormValues): Promise<WorkItem> {
    const item: WorkItem = {
      id: nextWorkId(),
      seq: nextSeq(teamId),
      lsxCode: values.lsxCode,
      content: values.content,
      priority: values.priority,
      status: values.status,
      startDate: values.startDate,
      endDate: values.endDate,
      workers: values.workers,
      evaluation: values.evaluation || undefined,
      supervisorNote: values.supervisorNote || undefined,
    };
    addWorkItem(teamId, item);
    return delay(item);
  },
};
