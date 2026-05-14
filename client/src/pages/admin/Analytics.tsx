import MobileBottomNav from "@/components/shared/BottomNav";
import ComingSoon from "@/components/shared/ComingSoon";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { useState } from "react";

export default function Analytics() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <main className={`flex ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}>
        <div className="mx-auto">
          {/* <!-- Page Header --> */}
          <div className="mb-0 space-y-1">
            <ComingSoon />
          </div>
        </div>
      </main>
    </>
  );
}
