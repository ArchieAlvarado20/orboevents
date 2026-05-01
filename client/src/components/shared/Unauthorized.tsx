import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router";

export default function Unauthorized({
  message = "Admin access only",
}: {
  message?: string;
}) {
  const Navigate = useNavigate();
  return (
    <div className="h-[calc(100vh-4rem)] flex bg-white items-center justify-center  from-slate-50 to-slate-200 p-6">
      <div className="max-w-md w-full text-center bg-white/80  backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-slate-200 ">
        {/* 🔥 Big Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-red-100 ">
            <ShieldAlert className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900  mb-2">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-sm font-medium text-red-500 mb-4">{message}</p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => Navigate("/admin")}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
          >
            Login as an Admin
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-xl bg-slate-200  text-slate-700  hover:bg-slate-300  transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
