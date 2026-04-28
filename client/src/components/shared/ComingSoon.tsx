import { Rocket, Clock3, Sparkles } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="h-[calc(100vh-4rem)] flex bg-white items-center justify-center  from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="text-center max-w-md w-full bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-slate-200 dark:border-slate-800">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-full bg-indigo-100 dark:bg-indigo-500/10">
            <Rocket className="w-14 h-14 text-indigo-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-indigo-600 font-semibold mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          orboevents
          <Sparkles className="w-4 h-4" />
        </p>

        {/* Message */}
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          We are building something amazing for you. Stay tuned for updates.
        </p>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Clock3 className="w-4 h-4" />
          Launching soon
        </div>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/admin/dashboard")}
          className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
