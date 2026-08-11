import { RouteObject } from "react-router-dom";
import { WorkTrackingPage } from "./ui/pages/WorkTrackingPage";

// Route mới cho trang theo dõi công việc.
// Thêm ROUTES.workTracking = "/work-tracking" vào src/app/routes.ts
export const workTrackingRoutes: RouteObject[] = [
  { path: "/work-tracking", element: <WorkTrackingPage /> },
];
