import { ShieldAlert } from "lucide-react";

export default function Unauthorized({
  message = "Admin access only",
}: {
  message?: string;
}) {
  return (
    <div className="max-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-md w-full text-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-slate-200 dark:border-slate-800">
        {/* 🔥 Big Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-red-100 dark:bg-red-500/10">
            <ShieldAlert className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-sm font-medium text-red-500 mb-4">{message}</p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
          >
            Login as an Admin
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
