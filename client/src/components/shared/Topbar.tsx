import { handleLogout } from "@/lib/auth";
import { Bell, LogOut } from "lucide-react";
import Logo from "./Logo";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between w-full px-6 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <span className="flex flex-2 gap-1 text-xl font-bold tracking-tight text-slate-900">
        <Logo className="h-16 -ml-5 md:ml-0" />
      </span>

      <button onClick={handleLogout}>
        <LogOut />{" "}
      </button>
      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 transition rounded-full">
          <Bell className="w-5 h-5" />
        </button>

        <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200">
          <img
            alt="Admin User Profile"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjXjES9_ysj6ZDzKArFr4JB6gHfeQxcTtCvkwOkIKnrGriTd9ZLpiYdm-84cbHK51YEuk_vlSTpIR1-qeGa-MoD9nOrj0UZ7zX4pjg9qjoK_WNkgwt7aVCLHP7TjZb3NNDxlV2IKQCrFuFLVOiKQsCP0SMW4aC4mxjqrqacs34006A9r8KxRM-MVCUNgKqxPIHBh2XjInj3ZFJOkOMev4nrcwolRdoXZ0oL6-3cD3ettN7newa2o6xks98Aa4ThbPxzRCRvOjbey76"
          />
        </div>
      </div>
    </header>
  );
}
