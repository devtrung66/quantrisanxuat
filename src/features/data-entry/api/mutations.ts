import { dataEntryService } from "../services/dataEntryService";
import type { StandardEntryValues, DefectEntryValues } from "../model/types";

export const entryMutations = {
  createStandard: (v: StandardEntryValues) => dataEntryService.createStandard(v),
  createDefect: (v: DefectEntryValues) => dataEntryService.createDefect(v),
};
