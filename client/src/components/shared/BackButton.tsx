import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  fallback?: string;
  label?: string;
  className?: string;
};

export default function BackButton({
  fallback = "/",
  label,
  className = "",
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      {label && <span className="text-sm">{label}</span>}
    </button>
  );
}
