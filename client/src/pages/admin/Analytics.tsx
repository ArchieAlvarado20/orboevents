import MobileBottomNav from "@/components/shared/BottomNav";
import ComingSoon from "@/components/shared/ComingSoon";
import Sidebar from "@/components/shared/SidebarAdmin";
import Topbar from "@/components/shared/Topbar";
import { useState } from "react";

export default function Analytics() {
  return (
    <>
      <main className="min-h-screen p-6 bg-slate-50">
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
