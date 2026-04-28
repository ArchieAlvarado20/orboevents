import MobileBottomNav from "@/components/shared/BottomNav";
import ComingSoon from "@/components/shared/ComingSoon";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { useState } from "react";

export default function Analytics() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Topbar />
      <div className="flex max-h-[calc(100vh-72px)]">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
          className={`flex-1 mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}
        >
          <div className="max-w-container-max mx-auto">
            {/* <!-- Page Header --> */}
            <div className="mb-0 space-y-1">
              <ComingSoon />
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav active="analytics" />
    </>
  );
}
