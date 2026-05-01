import { Outlet } from "react-router-dom";
import Topbar from "@/components/shared/usersPage/topbar";
import UserFooter from "@/components/shared/usersPage/userFooter";

export default function UserLayout() {
  return (
    <div className="flex-1 w-full">
      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
      <UserFooter />
    </div>
  );
}
