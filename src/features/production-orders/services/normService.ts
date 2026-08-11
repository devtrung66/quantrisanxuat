import type { NormData } from "../model/norm.types";
import { getMockNormData } from "../adapters/normAdapter";

function delay<T>(v: T, ms = 300): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const normService = {
  async byProductionOrder(poId: string): Promise<NormData> {
    return delay(getMockNormData(poId));
  },
};
