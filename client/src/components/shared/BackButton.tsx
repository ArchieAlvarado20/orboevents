import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft } from "lucide-react";

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
      className={`absolute top-4 left-4  text-white text-xs z-40 font-bold px-3 py-1 rounded-full uppercase tracking-widest ${className}`}
    >
      <ChevronLeft size={24} />
      {label && <span className="text-sm">{label}</span>}
    </button>
  );
}
