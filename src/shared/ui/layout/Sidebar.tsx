import {
  Globe, ClipboardList, PenSquare, Activity, Database, CheckCircle2,
  XCircle, Layers, FileBarChart, FolderTree, Settings, ChevronLeft,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { SidebarGroup } from "./SidebarGroup";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/app/routes";

const ic = "h-[18px] w-[18px]";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-white">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-lg">🏭</span>
        <span className="text-[15px] font-semibold leading-tight">Quản trị<br/>sản xuất</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        <SidebarItem to={ROUTES.dashboard} end icon={<Globe className={ic} />} label="Tổng quan" />
        <SidebarItem to={ROUTES.orders} icon={<ClipboardList className={ic} />} label="Đơn hàng" />
        <SidebarItem to={ROUTES.productionOrders} icon={<PenSquare className={ic} />} label="Lên đơn sản xuất" />
        <SidebarItem to={ROUTES.progress} icon={<Activity className={ic} />} label="Theo dõi tiến độ" />

        <SidebarGroup icon={<Database className={ic} />} label="Nhập liệu">
          <SidebarItem to={ROUTES.dataEntryStandard} icon={<CheckCircle2 className="h-4 w-4" />} label="Hàng đạt chuẩn" />
          <SidebarItem to={ROUTES.dataEntryDefect} icon={<XCircle className="h-4 w-4" />} label="Hàng lỗi" />
        </SidebarGroup>

        <SidebarItem to={ROUTES.stages} icon={<Layers className={ic} />} label="Quản lý công đoạn" />
        <SidebarItem to={ROUTES.reports} icon={<FileBarChart className={ic} />} label="Báo cáo" />

        <SidebarGroup icon={<FolderTree className={ic} />} label="Danh mục" defaultOpen={false}>
          <SidebarItem to={ROUTES.catalog} icon={<FolderTree className="h-4 w-4" />} label="Tất cả danh mục" />
        </SidebarGroup>

        <SidebarItem to={ROUTES.settings} icon={<Settings className={ic} />} label="Cài đặt" />
      </nav>

      <NavLink to={ROUTES.dashboard} className="flex items-center gap-2 border-t border-white/10 px-5 py-4 text-sm text-blue-100/70 hover:text-white">
        <ChevronLeft className="h-4 w-4" /> Thu gọn
      </NavLink>
    </aside>
  );
}
