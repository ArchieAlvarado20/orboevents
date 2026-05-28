import { FaAndroid, FaApple, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "../Logo";
import { QrCode } from "lucide-react";
import OrboeventsLogo from "../LogoIcon";
import Button from "../Button";

export default function UserFooter() {
  return (
    <>
      <footer className="bg-slate-50 pt-10 pb-10 border-t border-slate-200 lg:px-5">
        <div className="max-w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <OrboeventsLogo />
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Redefining the event entry experience with smart technology and
                community energy.
              </p>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">
                Quick Links
              </h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Featured Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Organizer Portal
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Safety & Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Pricing Plans
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">
                Support
              </h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    API Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">
                Newsletter
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Stay updated on the latest events near you.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-600/10 focus:border-violet-600 transition-all"
                />
                <Button variant="primary">Join</Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400 font-bold">
              © 2026 Orboevents Systems Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-slate-400 hover:text-violet-600 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-violet-600 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
