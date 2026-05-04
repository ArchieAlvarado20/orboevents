import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "@/components/shared/usersPage/topbar";
import UserFooter from "@/components/shared/usersPage/userFooter";
import { useAuthInit } from "@/hooks/auth/useAuthInit";
import { useState } from "react";
import { showSuccess } from "@/lib/toast";

export default function UserLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useAuthInit({
    setUser,
    navigate,
    showSuccess: (msg: string) => showSuccess(msg),
    showError: (msg: string) => console.log(msg),
  });
  return (
    <div className="flex-1 w-full">
      <div className="flex-1">
        <Topbar user={user} />
        <Outlet />
      </div>
      <UserFooter />
    </div>
  );
}
