export default function TransparentSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="relative w-12 h-12">
        {/* outer blur glow */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md"></div>

        {/* spinner */}
        <div className="w-12 h-12 border-4 border-white/30 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
