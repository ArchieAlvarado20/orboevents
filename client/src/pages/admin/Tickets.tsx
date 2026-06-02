import ComingSoon from "@/components/shared/ComingSoon";

import { useState } from "react";

export default function Ticket() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
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
    </>
  );
}
