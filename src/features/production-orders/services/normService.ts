import type { NormData, NormRow } from "../model/norm.types";
import {
  getMockNormData, addNvlRow, updateNvlRow, removeNvlRow,
} from "../adapters/normAdapter";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const normService = {
  async byProductionOrder(poId: string): Promise<NormData> {
    return delay(getMockNormData(poId));
  },

  async addNvl(
    poId: string,
    input: { material: string; unit: string; normPerUnit: number; belongProduct: string; belongBtp?: string }
  ): Promise<NormRow> {
    return delay(addNvlRow(poId, input));
  },

  async updateNvl(
    poId: string, rowId: string,
    patch: Partial<Pick<NormRow, "normPerUnit" | "material" | "unit" | "belongProduct" | "belongBtp">>
  ): Promise<NormRow | undefined> {
    return delay(updateNvlRow(poId, rowId, patch));
  },

  async removeNvl(poId: string, rowId: string): Promise<void> {
    removeNvlRow(poId, rowId);
    return delay(undefined);
  },
};