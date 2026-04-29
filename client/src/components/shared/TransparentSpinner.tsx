export default function TransparentSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative w-12 h-12">
        {/* outer blur glow */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md"></div>

        {/* spinner */}
        <div className="w-12 h-12 border-4 border-white/30 border-t-indigo-500 rounded-full animate-spin backdrop-blur-sm"></div>
      </div>
    </div>
  );
}
