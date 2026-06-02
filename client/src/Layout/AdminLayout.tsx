import { useEffect, useState } from "react";
import Topbar from "@/components/shared/Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import MobileBottomNav from "@/components/shared/BottomNav";
import UserMobileSidebar from "@/components/shared/usersPage/MobileSidebar";
import { useAuthInit } from "@/hooks/auth/useAuthInit";
import { showSuccess } from "@/lib/toast";
import Footer from "@/components/shared/Footer";
import SidebarAdmin from "@/components/shared/SidebarAdmin";
import { userInitialForm, UserType } from "@/types/adminUsers.type";
import * as roleApi from "@/api/role.api";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserType>(userInitialForm);
  const navigate = useNavigate();

  useAuthInit({
    setUser,
    navigate,
    showSuccess: (msg: string) => showSuccess(msg),
    showError: (msg: string) => console.log(msg),
  });

  return (
    <div className="flex">
      <SidebarAdmin
        user={user}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1">
        <Topbar user={user} setIsOpen={setIsOpen} />
        <Outlet />
      </div>
      {/* <MobileBottomNav /> */}
    </div>
  );
}
