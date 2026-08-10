import type { ProgressOverview, OrderProgress } from "../model/types";
import { getMockOverview, getMockOrderProgress } from "../adapters/progressAdapter";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const progressService = {
  async overview(): Promise<ProgressOverview> {
    return delay(getMockOverview());
  },
  async orderProgress(code: string): Promise<OrderProgress | undefined> {
    return delay(getMockOrderProgress(code));
  },
};
