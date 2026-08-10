import type { EntryType } from "./constants";

export interface EntryRecord {
  id: string;
  type: EntryType;
  orderCode: string;
  stage: string;
  quantity: number;
  reason?: string;      // chỉ với type = defect
  note?: string;
  createdAt: string;    // ISO datetime
  createdBy: string;
}

export type StandardEntryValues = {
  orderCode: string;
  stage: string;
  quantity: number;
  note?: string;
};

export type DefectEntryValues = {
  orderCode: string;
  stage: string;
  quantity: number;
  reason: string;
  note?: string;
};
