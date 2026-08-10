import type { EntryRecord, StandardEntryValues, DefectEntryValues } from "../model/types";
import type { EntryType } from "../model/constants";
import { MOCK_ENTRIES, nextEntryId } from "../adapters/dataEntryAdapter";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const dataEntryService = {
  async listRecent(type?: EntryType, limit = 10) {
    let rows = [...MOCK_ENTRIES].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (type) rows = rows.filter((r) => r.type === type);
    return delay(rows.slice(0, limit));
  },

  async createStandard(v: StandardEntryValues): Promise<EntryRecord> {
    const rec: EntryRecord = {
      id: nextEntryId(),
      type: "standard",
      ...v,
      createdAt: new Date().toISOString(),
      createdBy: "admin",
    };
    MOCK_ENTRIES.unshift(rec);
    return delay(rec);
  },

  async createDefect(v: DefectEntryValues): Promise<EntryRecord> {
    const rec: EntryRecord = {
      id: nextEntryId(),
      type: "defect",
      ...v,
      createdAt: new Date().toISOString(),
      createdBy: "admin",
    };
    MOCK_ENTRIES.unshift(rec);
    return delay(rec);
  },
};
