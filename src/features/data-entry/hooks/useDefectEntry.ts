import { useMutation, useQueryClient } from "@tanstack/react-query";
import { entryMutations } from "../api/mutations";
import type { DefectEntryValues } from "../model/types";

export function useDefectEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: DefectEntryValues) => entryMutations.createDefect(v),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["entries"] }),
  });
}
