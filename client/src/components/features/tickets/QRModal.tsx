import FormattedDate from "@/utils/dateLongFormat";
import { X, Wallet2, Share, DownloadCloud } from "lucide-react";
import { formatTicketId } from "./TicketNumFormat";

type TicketModalProps = {
  open: boolean;
  onClose: () => void;
  ticket: any;
};

export default function TicketModal({
  open,
  onClose,
  ticket,
}: TicketModalProps) {
  if (!open || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* modal */}
      <div className="relative w-[90%] max-w-xl bg-white rounded-[32px] p-8 shadow-[0_15px_50px_rgba(124,58,237,0.12)] border border-violet-200 flex flex-col items-center text-center">
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-black"
        >
          <X />
        </button>

        {/* QR SECTION */}
        <div className="mb-6 w-full">
          <div
            className={`p-8 rounded-[40px] flex flex-col items-center border-4 border-dashed border-violet-200 ${
              ticket.status === "active" ? "bg-green-400" : "bg-red-400"
            }`}
          >
            <div className="bg-white p-2 rounded-3xl shadow-xl mb-4">
              <img
                alt="Ticket QR Code"
                className="w-56 h-56 object-contain"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${ticket?.qrToken}`}
              />
            </div>

            <p className="font-mono text-sm font-bold text-slate-500 tracking-wider">
              Ticket ID: # {formatTicketId(ticket._id)}
            </p>
          </div>
        </div>

        {/* EVENT INFO */}
        <div className="px-4">
          <h4 className="text-2xl font-bold mb-1">{ticket?.eventId?.name}</h4>
          <h4 className="text-1xl font-bold mb-1 text-slate-600">
            {ticket?.ticketTypeId?.name}
          </h4>

          <p className="text-slate-500 mb-6 text-sm">
            <FormattedDate date={ticket?.ticketTypeId?.date} /> •{" "}
            {ticket?.eventId?.location}
          </p>

          {/* ACTIONS */}
          <div className="w-full flex gap-3">
            <button className="flex-1 bg-violet-600 text-white py-4 px-6 rounded-2xl font-bold hover:bg-violet-700 transition-all flex items-center justify-center gap-2 shadow-md">
              <DownloadCloud size={18} />
              Download QR Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
