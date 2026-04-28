import { Link } from "react-router-dom";
import Logo from "../Logo";
export default function Topbar() {
  return (
    <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-violet-100/50 shadow-lg shadow-violet-600/5 antialiased font-['Plus_Jakarta_Sans']">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Logo className="h-16" />
        <nav className="hidden md:flex items-center gap-8">
          <Link
            className="text-violet-600 font-bold border-b-2 border-violet-600"
            to="/"
          >
            Events
          </Link>
          <Link
            className="text-slate-600 font-medium hover:text-violet-500 transition-colors duration-200"
            to="/category"
          >
            Categories
          </Link>
          <a
            className="text-slate-600 font-medium hover:text-violet-500 transition-colors duration-200"
            href="#"
          >
            Organizers
          </a>
          <a
            className="text-slate-600 font-medium hover:text-violet-500 transition-colors duration-200"
            href="#"
          >
            About
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:block px-6 py-2 rounded-full border-2 border-violet-600 text-violet-600 font-semibold text-sm hover:-translate-y-0.5 transition-transform">
            <Link to={"/admin"}> Sign In</Link>
          </button>
          <button className="bg-violet-600 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg shadow-violet-600/20 hover:-translate-y-0.5 transition-transform active:scale-95">
            Explore Events
          </button>
        </div>
      </div>
    </header>
  );
}
