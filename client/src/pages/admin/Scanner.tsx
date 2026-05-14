import ComingSoon from "@/components/shared/ComingSoon";
import {
  Camera,
  CheckCircle,
  FlashlightIcon,
  Lightbulb,
  QrCode,
} from "lucide-react";
import { useState } from "react";

export default function Scanner() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <main className={` flex ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}>
        <div className="max-w-container-max mx-auto">
          {/* <!-- Page Header --> */}
          <div className="mb-0 space-y-1">
            <ComingSoon />
          </div>
        </div>
        <div
          className={`hidden flex-1 justify-center mb-12 p-4 min-h-screen overflow-y-auto ${isCollapsed ? "md:ml-16" : "md:ml-64"}`}
        >
          <div className="w-full overflow-hidden h-screen max-w-4xl flex flex-col lg:flex-row gap-8 items-stretch mt-5 min-h-screen">
            {/* <!-- Left: Scanner Viewport Section --> */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="text-center md:text-left mb-2">
                <h2 className="font-h2 text-h2 text-slate-900">QR Scanner</h2>
                <p className="font-body-sm text-body-sm text-secondary">
                  Align the ticket QR code within the frame to scan.
                </p>
              </div>

              {/* <!-- Scanner Camera Area --> */}
              <div
                className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 bg-slate-950 rounded-xl overflow-hidden shadow-2xl scanner-viewport"
                data-alt="Dark aesthetic camera viewfinder showing a blurred live feed of a concert venue with soft teal and purple lighting"
              >
                {/* <!-- Scanning Animation/Frame Overlay --> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* <!-- Corners --> */}
                    <div className="scan-frame-corner border-t-4 border-l-4 -top-1 -left-1 rounded-tl-lg"></div>
                    <div className="scan-frame-corner border-t-4 border-r-4 -top-1 -right-1 rounded-tr-lg"></div>
                    <div className="scan-frame-corner border-b-4 border-l-4 -bottom-1 -left-1 rounded-bl-lg"></div>
                    <div className="scan-frame-corner border-b-4 border-r-4 -bottom-1 -right-1 rounded-br-lg"></div>
                    {/* <!-- Active Scan Line --> */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/60 shadow-[0_0_15px_rgba(70,72,212,0.8)] opacity-70"></div>
                  </div>
                </div>
                {/* <!-- Camera Controls Overlay --> */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                    <FlashlightIcon />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* <!-- Action Button --> */}
              <div className="flex justify-center lg:justify-start">
                <button className="px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-container transition-all">
                  <QrCode />
                  Scan Now
                </button>
              </div>
            </div>
            {/* <!-- Right: Recent Scans & Stats (Bento Grid Style) --> */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {/* <!-- Last Scanned Card --> */}
                <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-label-xs font-label-xs text-secondary uppercase tracking-wider">
                      Last Scanned
                    </span>
                    <span className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container text-xs font-bold">
                      2m ago
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200">
                      <img
                        alt="Profile"
                        className="w-full h-full object-cover"
                        data-alt="Professional studio headshot of a young man with a friendly expression on a neutral background"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbyj83LtD4sDAFisHpAri3RhrqNE_FcBms18XSLR1Hd6Kx7r2zQaCKLmxmX_5zJvPgP3DoHvMcCnSKnpEMJSNDwHLNkU1xEhrVEdEId3OFfm1bF0W8x4EIq_zbK5I-QcDPBN9Xk3aHcqxXrYt2Gsbmlysyp5o2n5XfAzMJS_JCyVz7_1i4c1YX34xgBPftRaESyAcaONmibeikq5G-Ly48dYxoVbGciw2C9nV4g0mi9l9FyQXqAVyVGRi21r-9e_fz8Kt8gSEye-uG"
                      />
                    </div>
                    <div>
                      <h4 className="font-label-md text-slate-900">
                        Marcus Sterling
                      </h4>
                      <p className="text-body-sm text-secondary">
                        VIP Backstage Pass
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        <CheckCircle />
                      </div>
                      <span className="font-label-md text-slate-900">
                        Valid Ticket
                      </span>
                    </div>
                    <span className="text-label-xs font-semibold text-slate-500">
                      #TK-88291
                    </span>
                  </div>
                </div>
                {/* <!-- Stats Quick View --> */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col gap-1">
                    <span className="text-label-xs text-secondary">
                      Total Scans
                    </span>
                    <span className="text-h3 font-h3 text-slate-900">
                      1,284
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col gap-1">
                    <span className="text-label-xs text-secondary">
                      Pending
                    </span>
                    <span className="text-h3 font-h3 text-slate-900">452</span>
                  </div>
                </div>
                {/* <!-- Helper Tip --> */}
                <div className="bg-slate-900 text-white p-6 rounded-xl flex items-start gap-4">
                  <Lightbulb />
                  <div>
                    <h5 className="text-sm font-bold mb-1">Scanning Tip</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Ensure the brightness on the attendee's device is turned
                      up for faster detection in dark environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
