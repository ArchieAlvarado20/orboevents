import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "@/components/shared/usersPage/topbar";
import UserFooter from "@/components/shared/usersPage/userFooter";
import { useAuthInit } from "@/hooks/auth/useAuthInit";
import { useEffect, useState } from "react";
import { showSuccess } from "@/lib/hotToast";
import UserMobileSidebar from "@/components/shared/usersPage/MobileSidebar";
import ScrollToTop from "@/components/shared/topUponNavigate";

export default function UserLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useAuthInit({
    setUser,
    navigate,
    showSuccess: (msg: string) => showSuccess(msg),
    showError: (msg: string) => console.log(msg),
  });

  return (
    <div className="flex-1 w-full">
      <div className="flex-1">
        <Topbar user={user} setIsOpen={setIsOpen} />
        <Outlet />
      </div>
      <UserFooter />
      <UserMobileSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user || ""}
      />
    </div>
  );
}
