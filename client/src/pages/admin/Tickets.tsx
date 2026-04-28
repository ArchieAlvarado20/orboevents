import MobileBottomNav from "@/components/shared/BottomNav";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { useState } from "react";

export default function Ticket() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      {/* <!-- TopAppBar --> */}
      <Topbar />

      {/* <!-- Main Content Area --> */}
      <main className="flex mb-12 min-h-screen">
        {/* <!-- Navigation Drawer (SideNav) --> */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        {/* <!-- Page Canvas --> */}
        {/* <div className="flex-1 p-4 md:p-4 flex flex-col items-center justify-center">
          {open && (
            <TicketTypeModal
              eventId={event._id}
              onClose={() => setOpen(false)}
            />
          )}
        </div> */}
        {/* <!-- Bottom Navigation (Mobile Only) --> */}
        <MobileBottomNav active="scan" />
      </main>
    </>
  );
}
