import type { Theme, Language } from "./constants";

export interface ProfileSettings {
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

export interface PreferenceSettings {
  theme: Theme;
  language: Language;
  wipThreshold: number;
  emailNotify: boolean;
  defectAlert: boolean;
}

export interface AppSettings {
  profile: ProfileSettings;
  preferences: PreferenceSettings;
}

export type ProfileValues = ProfileSettings;
export type PreferenceValues = PreferenceSettings;
