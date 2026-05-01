import { AlertCircle } from "lucide-react";

type ErrorCardProps = {
  message: string;
};

export default function ErrorCard({ message }: ErrorCardProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 shadow-sm animate-fade-in">
      <div className="mt-0.5">
        <AlertCircle className="w-5 h-5 text-red-500" />
      </div>

      <div className="flex-1 text-sm font-medium">{message}</div>
    </div>
  );
}
