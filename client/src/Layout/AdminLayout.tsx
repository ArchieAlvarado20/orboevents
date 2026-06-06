import { useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import MobileBottomNav from "@/components/shared/BottomNav";
import UserMobileSidebar from "@/components/shared/usersPage/MobileSidebar";
import { useAuthInit } from "@/hooks/auth/useAuthInit";
import { showSuccess, showError } from "@/lib/toast";
import Footer from "@/components/shared/Footer";
import { useEffect } from "react";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useAuthInit({
    setUser,
    navigate,
    showSuccess: (msg: string) => showSuccess(msg),
    showError: (msg: string) => console.log(msg),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    if (user && user.role?.name !== "Super-Admin") {
      showError("Unauthorized: Admin access only!");
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="flex">
      <Sidebar
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
