import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import { Bell, Search, ShoppingCart, UserCircle } from "lucide-react";
import { useState } from "react";
import UserMobileSidebar from "./MobileSidebar";
import Button from "../Button";

export default function Topbar({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);

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
              className={({ isActive }) =>
                ` font-medium border-b-2 ${
                  isActive
                    ? "border-violet-600 font-bold text-indigo-600"
                    : "border-transparent"
                }`
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                ` font-medium border-b-2 ${isActive ? "border-violet-600 font-bold text-indigo-600" : "border-transparent"}`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/organizer"
              className={({ isActive }) =>
                ` font-medium border-b-2 ${isActive ? "border-violet-600 font-bold  text-indigo-600" : "border-transparent"}`
              }
            >
              Organizers
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                ` font-medium border-b-2 ${isActive ? "border-violet-600 font-bold text-indigo-600" : "border-transparent"}`
              }
            >
              About
            </NavLink>
          </nav>
        </div>

        <div className=" gap-4 md:inline-flex">
          <div className="hidden lg:flex items-center bg-gray-50  rounded-full px-4 py-2 border border-transparent focus-within:border-primary transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              className="bg-transparent border-0 focus:ring-0 focus:outline-none text-sm font-body-md w-48"
              placeholder="Search events..."
              type="text"
            />
          </div>
          {!user ? (
            <>
              <Link to="/login" className="">
                {/* <LogInIcon className="sm:hidden w-6 h-6 text-purple-600  " /> */}
                <Button
                  variant="primary"
                  className="text-indigo-900 bg-violet-600"
                >
                  LOGIN
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/reservation">
                <div className="hidden md:block relative p-2 text-violet-600">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    1
                  </span>
                </div>
              </Link>
              <button className="p-2 hover:bg-gray-100  rounded-full transition-colors relative">
                <Bell className="hidden md:block w-6 h-6 text-gray-600 " />
              </button>
              <button className="hidden md:block p-2 hover:bg-gray-100  rounded-full transition-colors">
                <UserCircle className="w-6 h-6 text-gray-600 " />
              </button>{" "}
            </>
          )}
        </div>
        <UserMobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
}
