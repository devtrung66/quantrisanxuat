// MOCK store. Thay bằng mapping DTO khi nối API.
import type { AppSettings } from "../model/types";
import { DEFAULT_WIP_THRESHOLD } from "../model/constants";

export const MOCK_SETTINGS: AppSettings = {
  profile: {
    fullName: "Quản trị viên",
    email: "admin@qtsx.local",
    phone: "0900000000",
    role: "Administrator",
  },
  preferences: {
    theme: "light",
    language: "vi",
    wipThreshold: DEFAULT_WIP_THRESHOLD,
    emailNotify: true,
    defectAlert: true,
  },
};
