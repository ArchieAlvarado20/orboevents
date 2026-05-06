import React from "react";
import Logo from "./Logo";

const OrboeventsLogo = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon portion using SVG */}
      <div className="relative w-12 h-12 mt-3 shrink-0">
        <Logo />
      </div>

      {/* Text portion */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tighter text-[#003B71]">
          orbo<span className="text-[#F58220]">events</span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">
          Event Ticketing Platform
        </span>
      </div>
    </div>
  );
};

export default OrboeventsLogo;
