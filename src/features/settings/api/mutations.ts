import { settingsService } from "../services/settingsService";
import type { ProfileValues, PreferenceValues } from "../model/types";

export const settingsMutations = {
  updateProfile: (v: ProfileValues) => settingsService.updateProfile(v),
  updatePreferences: (v: PreferenceValues) => settingsService.updatePreferences(v),
};
