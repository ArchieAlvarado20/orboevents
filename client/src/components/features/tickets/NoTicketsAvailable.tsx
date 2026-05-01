import { TicketX } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NoTicketsAvailableProps = {
  message?: string;
  showBackButton?: boolean;
  backLabel?: string;
  backPath?: string;
};

export default function NoTicketsAvailable({
  message = "No tickets available",
  showBackButton = false,
  backLabel = "Go back",
  backPath = "/",
}: NoTicketsAvailableProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-full bg-gray-100 mb-4">
        <TicketX className="w-8 h-8 text-gray-400" />
      </div>

      <h2 className="text-lg font-semibold text-gray-700">{message}</h2>

      <p className="text-sm text-gray-400 mt-1">
        This event currently has no available tickets.
      </p>

      {showBackButton && (
        <button
          onClick={() => navigate(backPath)}
          className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          {backLabel}
        </button>
      )}
    </div>
  );
}
