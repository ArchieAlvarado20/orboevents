import { FaAndroid, FaApple } from "react-icons/fa";
import Logo from "../Logo";

export default function UserFooter() {
  return (
    <>
      <footer className="w-full rounded-t-[32px] bg-slate-50 border-t border-slate-200 antialiased font-['Plus_Jakarta_Sans'] text-sm">
        <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Logo className="h-16" />
            </div>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Connecting people through extraordinary live experiences.
              Discover, book, and enjoy events that matter.
            </p>
            <div className="flex gap-4">
              <span
                className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-violet-600 transition-colors"
                data-icon="public"
              >
                public
              </span>
              <span
                className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-violet-600 transition-colors"
                data-icon="language"
              >
                language
              </span>
              <span
                className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-violet-600 transition-colors"
                data-icon="hub"
              >
                hub
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-[10px]">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-all inline-block"
                  href="#"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  className="text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-all inline-block"
                  href="#"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  className="text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-all inline-block"
                  href="#"
                >
                  Trending Now
                </a>
              </li>
              <li>
                <a
                  className="text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-all inline-block"
                  href="#"
                >
                  Organizers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-[10px]">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  className="text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-all inline-block"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-all inline-block"
                  href="#"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-all inline-block"
                  href="#"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  className="text-slate-500 hover:text-violet-600 hover:translate-x-1 transition-all inline-block"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-[10px]">
              Download
            </h4>
            <p className="text-slate-500 mb-6">
              Get our mobile app for better experience.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-2xl cursor-pointer hover:border-violet-600 transition-colors">
                <FaApple />
                <div>
                  <p className="text-[8px] uppercase text-slate-400 leading-none">
                    App Store
                  </p>
                  <p className="font-bold text-xs">iOS App</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-2xl cursor-pointer hover:border-violet-600 transition-colors">
                <FaAndroid />
                <div>
                  <p className="text-[8px] uppercase text-slate-400 leading-none">
                    Google Play
                  </p>
                  <p className="font-bold text-xs">Android App</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-6 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © 2026 orboevents. Discover your next community experience.
          </p>
          <div className="flex gap-8 text-slate-400 text-xs">
            <a className="hover:text-violet-600" href="#">
              Terms
            </a>
            <a className="hover:text-violet-600" href="#">
              Privacy
            </a>
            <a className="hover:text-violet-600" href="#">
              Cookies
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
