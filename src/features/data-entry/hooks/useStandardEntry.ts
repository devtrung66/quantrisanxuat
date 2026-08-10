import { useMutation, useQueryClient } from "@tanstack/react-query";
import { entryMutations } from "../api/mutations";
import type { StandardEntryValues } from "../model/types";

export function useStandardEntry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: StandardEntryValues) => entryMutations.createStandard(v),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["entries"] }),
  });
}
