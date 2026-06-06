import ComingSoon from "@/components/shared/ComingSoon";

import { useState } from "react";

export default function Ticket() {
  return (
    <>
      <main className="min-h-screen p-6 bg-slate-50">
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
