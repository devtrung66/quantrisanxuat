import { useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsMutations } from "../api/mutations";
import type { ProfileValues, PreferenceValues } from "../model/types";

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: ProfileValues) => settingsMutations.updateProfile(v),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}

export function useUpdatePreferences() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: PreferenceValues) => settingsMutations.updatePreferences(v),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}
