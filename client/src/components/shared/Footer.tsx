import Logo from "./Logo";

export default function Footer() {
  return (
    <>
      <footer className="relative z-10 w-full border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* LEFT: Brand + Tagline */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <Logo className="h-16" />

              <p className="text-xs text-slate-500 text-center">
                Modern ticketing system for seamless event management
              </p>
            </div>

            {/* CENTER: Status */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-slate-600 font-medium">
                All systems operational
              </span>
            </div>

            {/* RIGHT: Version */}
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} SmartTicket • v1.0.0
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
