export const WORK_ENDPOINTS = {
  list: "/work-items",
  byTeam: (teamId: string) => `/work-items?team=${teamId}`,
  workers: "/workers",
};
