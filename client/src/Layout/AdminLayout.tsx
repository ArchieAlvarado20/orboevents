import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";
import MobileBottomNav from "@/components/shared/BottomNav";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
      <MobileBottomNav />
    </div>
  );
}
