import { handleLogout } from "@/lib/auth";
import { Bell, LogOut, UserCircle } from "lucide-react";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import OrboeventsLogo from "./LogoIcon";

export default function Topbar({ user, setIsOpen }: any) {
  return (
    <header className="sticky top-0 flex items-center justify-between w-full px-6 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <span className="flex flex-2  z-50  gap-1 text-xl font-bold tracking-tight text-slate-900">
        <OrboeventsLogo className="h-16 -ml-5 md:ml-0" />
      </span>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-block md:hidden "
        >
          <UserCircle className="w-8 h-8 text-violet-600" />
        </button>
      </div>
    </header>
  );
}
