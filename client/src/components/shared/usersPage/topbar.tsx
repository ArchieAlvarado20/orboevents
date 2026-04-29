import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { Bell, Search, UserCircle } from "lucide-react";

type Props = {
  active?: "/" | "events" | "category" | "organizers" | "about";
};

export default function Topbar({ active = "events" }: Props) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80  backdrop-blur-md border-b border-gray-100  shadow-[0_4px_20px_rgba(124,58,237,0.08)]">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className="text-2xl font-black tracking-tighter text-violet-600  font-headline-lg"
          >
            <Logo className="h-16" />
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/events"
              className={`text-slate-600 font-bold border-b-2 ${active === "events" ? "border-violet-600" : "border-transparent"}`}
            >
              Events
            </NavLink>
            <NavLink
              to="/category"
              className={`text-slate-600 font-medium border-b-2 ${active === "category" ? "border-violet-600" : "border-transparent"}`}
            >
              Categories
            </NavLink>
            <NavLink
              className={`text-slate-600 font-medium border-b-2 ${active === "organizers" ? "border-violet-600" : "border-transparent"}`}
              to="/organizer"
            >
              Organizers
            </NavLink>
            <NavLink
              className={`text-slate-600 font-medium border-b-2 ${active === "about" ? "border-violet-600" : "border-transparent"}`}
              to="/about"
            >
              About
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-gray-50  rounded-full px-4 py-2 border border-transparent focus-within:border-primary transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              className="bg-transparent border-0 focus:ring-0 focus:outline-none text-sm font-body-md w-48"
              placeholder="Search events..."
              type="text"
            />
          </div>
          <button className="p-2 hover:bg-gray-100  rounded-full transition-colors relative">
            <Bell className="w-6 h-6 text-gray-600 " />
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100  rounded-full transition-colors">
            <UserCircle className="w-6 h-6 text-gray-600 " />
          </button>
        </div>
      </div>
    </header>
  );
}
