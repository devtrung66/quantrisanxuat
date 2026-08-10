import type { AppSettings, ProfileValues, PreferenceValues } from "../model/types";
import { MOCK_SETTINGS } from "../adapters/settingsAdapter";

function delay<T>(v: T, ms = 250): Promise<T> {
  return new Promise((res) => setTimeout(() => res(v), ms));
}

export const settingsService = {
  async get(): Promise<AppSettings> {
    return delay({ ...MOCK_SETTINGS });
  },

  async updateProfile(values: ProfileValues): Promise<AppSettings> {
    MOCK_SETTINGS.profile = { ...values };
    return delay({ ...MOCK_SETTINGS });
  },

  async updatePreferences(values: PreferenceValues): Promise<AppSettings> {
    MOCK_SETTINGS.preferences = { ...values };
    return delay({ ...MOCK_SETTINGS });
  },
};
