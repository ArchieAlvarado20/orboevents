import React from "react";
import {
  QrCode,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Signal,
  Battery,
  Wifi,
} from "lucide-react";

const DigitalTicketMockup = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 font-sans">
      <div className="relative group">
        {/* Ambient Glow Effects */}
        <div className="absolute -inset-20 bg-violet-400/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/10 blur-[120px] rounded-full" />

        {/* Smartphone Mockup Frame */}
        <div className="relative w-80 h-[640px] bg-slate-900 rounded-[55px] p-3 shadow-[0_50px_100px_-20px_rgba(124,58,237,0.25)] border-[8px] border-slate-800">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-900 rounded-b-3xl z-50 flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-800 rounded-full" />
          </div>

          {/* Screen Content */}
          <div className="w-full h-full bg-white rounded-[42px] overflow-hidden flex flex-col relative">
            {/* Status Bar */}
            <div className="px-8 pt-6 pb-2 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900">9:41</span>
              <div className="flex gap-1.5 items-center">
                <Signal className="w-3 h-3 text-slate-900" />
                <Wifi className="w-3 h-3 text-slate-900" />
                <Battery className="w-4 h-4 text-slate-900" />
              </div>
            </div>

            {/* Ticket Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
              {/* Branding/Logo Placeholder */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center text-white">
                  <QrCode className="w-4 h-4" />
                </div>
                <span className="text-lg font-black tracking-tighter text-violet-600">
                  SmartTick
                </span>
              </div>

              {/* QR Code Container */}
              <div className="w-full aspect-square bg-slate-50 border-2 border-dashed border-violet-100 rounded-[40px] p-8 flex flex-col items-center justify-center relative group/qr">
                <div className="absolute inset-0 bg-violet-600/5 rounded-[40px] opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                <QrCode className="w-full h-full text-slate-900 relative z-10" />
              </div>

              {/* Verified Badge */}
              <div className="flex flex-col items-center gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-full shadow-lg shadow-violet-600/20 transform hover:scale-105 transition-transform cursor-default">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    Verified Ticket
                  </span>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-sm font-bold text-slate-900">
                    Ready to Scan
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    Access Granted
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Interaction Area */}
            <div className="p-8 border-t border-slate-50 bg-slate-50/30">
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-violet-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Gate Access
                    </p>
                    <p className="text-xs font-bold text-slate-900">
                      Zone A • Main Entrance
                    </p>
                  </div>
                </div>
                <Smartphone className="w-5 h-5 text-violet-200" />
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-200 rounded-full" />
          </div>
        </div>

        {/* Physical Buttons Shadow/Visuals */}
        <div className="absolute top-24 -left-1 w-1 h-12 bg-slate-800 rounded-r-sm" />
        <div className="absolute top-40 -left-1 w-1 h-12 bg-slate-800 rounded-r-sm" />
        <div className="absolute top-32 -right-1 w-1 h-16 bg-slate-800 rounded-l-sm" />
      </div>
    </div>
  );
};

export default DigitalTicketMockup;
