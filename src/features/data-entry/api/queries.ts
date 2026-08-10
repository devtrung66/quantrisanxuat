import { dataEntryService } from "../services/dataEntryService";
import type { EntryType } from "../model/constants";

export const entryQueries = {
  listRecent: (type?: EntryType, limit?: number) => dataEntryService.listRecent(type, limit),
};
