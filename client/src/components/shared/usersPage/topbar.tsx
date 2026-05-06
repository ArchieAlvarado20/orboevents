import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AlignVerticalSpaceAround,
  Bell,
  Menu,
  Search,
  ShoppingCart,
  User,
  UserCircle,
} from "lucide-react";

import OrboeventsLogo from "../LogoIcon";
import { useScrollToSection } from "@/utils/scrollToSection";
import { useEffect, useState } from "react";
import { handleLogout } from "@/lib/auth";

export default function Topbar({ user, setIsOpen }: any) {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollToSection } = useScrollToSection();

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Events", path: "/events" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let current = "";

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            current = entry.target.id;
          }
        });

        if (current) {
          setActiveSection(current);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-80px 0px -50% 0px", // 🔥 fix fixed header issue
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (link) => {
    if (link.path) {
      return location.pathname === link.path;
    }
    return location.pathname === "/" && activeSection === link.id;
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-white/80  backdrop-blur-md border-b border-gray-100  shadow-[0_4px_20px_rgba(124,58,237,0.08)]">
      <div className="flex justify-between items-center px-6 py-4 mx-auto w-full">
        <div className="flex lg:px-10  justify-between gap-8 w-full">
          <NavLink
            to="/"
            className="text-2xl font-black tracking-tighter text-violet-600   font-headline-lg"
          >
            <OrboeventsLogo className="h-16" />
          </NavLink>
          <nav className="hidden lg:flex items-center  gap-10">
            {navLinks.map((link) => (
              <button
                onClick={() => {
                  if (link.path) {
                    navigate(link.path);
                  } else {
                    navigate("/");
                    setTimeout(() => {
                      scrollToSection(link.id!);
                    }, 100); // ensures landing page loads first
                  }
                }}
                key={link.name}
                className={`text-sm font-bold uppercase tracking-widest transition-colors
        ${
          isActive(link)
            ? "text-violet-600 border-b-2 border-violet-600"
            : "text-slate-600 hover:text-violet-600"
        }
      `}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <nav className="hidden items-center gap-8">
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
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <button
                  onClick={() => handleLogout(navigate, "/login")}
                  className="hidden lg:block px-6 py-2.5 text-sm font-bold text-violet-600 border-2 border-violet-600 hover:bg-violet-50 rounded-xl transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => handleLogout(navigate, "/login?tab=register")}
                  className="hidden lg:block px-6 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-violet-600/20 hover:bg-violet-700 transition-all active:scale-95"
                >
                  Signup
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="hidden lg:block"
              >
                <UserCircle className="w-8 h-8 text-violet-600" />
              </button>
            )}
            {/* MENU BUTTON */}
            <button onClick={() => setIsOpen(true)} className="p-2 lg:hidden">
              <Menu size={28} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
