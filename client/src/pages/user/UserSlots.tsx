import api from "@/api/interceptor.api";
import { slotApi } from "@/api/slot.api";
import { userEventApi } from "@/api/userEvent.api";
import NoSlotsAvailable from "@/components/features/slot/NoSlotsAvailable";
import NoTicketsAvailable from "@/components/features/tickets/NoTicketsAvailable";
import UserTicketCard from "@/components/features/tickets/UserTicketCard";
import BackButton from "@/components/shared/BackButton";
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import SlotCard from "@/components/shared/usersPage/SlotCard";
import { showError, showInfo, showSuccess } from "@/lib/hotToast";
import { currency } from "@/types/currency.type";
import { EventForm } from "@/types/event";
import { SlotFormType } from "@/types/slot.type";
import { TicketTypeForm } from "@/types/ticketTypes";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  MapPin,
  ShieldCheck,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserSlots() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventForm | null>(null);
  const [slots, setSlots] = useState<SlotFormType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const navigate = useNavigate();

  const handleSelectSlot = (slot: any) => {
    setSelectedSlot(slot);
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const eventRes = await userEventApi.getByEventID(id);
        setEvent(eventRes.data);
      } catch (err) {
        console.error("Event failed", err);
        setError("Failed to load event");
      }

      try {
        const slotsRes = await slotApi.getByEventPublic(id);

        setSlots(slotsRes.data || []);
        console.log(slotsRes.data);
      } catch (err) {
        console.error("Slots failed", err);
        setSlots([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  setTimeout(() => {
    const el = document.getElementById("top");

    if (el) {
      el.scrollIntoView({
        block: "center",
      });
    }
  }, 50);

  if (loading) {
    return <TransparentSpinner />;
  }

  if (error || !event) {
    navigate("/events");
    showError("No ticket found.");
  }

  return (
    <>
      <main className="max-w-7xl mt-24 mx-auto sm:px-4 sm:py-8" id="top">
        <div className="mt-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* <!-- BEGIN: ContentArea --> */}
          <div className="lg:col-span-8 space-y-8">
            {/* <!-- BEGIN: EventSummaryCard --> */}

            <div className="bg-white sm:rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(124,58,237,0.18)] soft-shadow flex flex-col md:flex-row border border-slate-100">
              <div className="md:w-1/2 relative">
                <img
                  alt="Holi Festival Event"
                  className="w-full h-full max-h-200 object-cover min-w-50 md:min-w-80"
                  src={event?.image || "/images/images.jpg"}
                />
                <BackButton className="mt-2" />
              </div>
              {/* Info */}
              <div className="p-5 space-y-3">
                <h1 className="text-2xl font-bold text-slate-900">
                  {event.name}
                </h1>

                <p className="text-slate-600 text-sm text-justify py-6 my-4">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {event.location}
                  </span>

                  <span className="flex items-center gap-1">
                    {currency.rupees} {event.basePrice}
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- END: EventSummaryCard --> */}
            {/* <!-- BEGIN: TicketSelection --> */}
            <section>
              <div className="flex flex-col px-5 md:flex-row justify-between md:items-end gap-2 mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Select Your Spot
                </h2>

                {/* <span className="text-indigo-600 text-sm font-medium">
                  Prices include all taxes
                </span> */}
              </div>
              {!slots.length ? (
                <div className="flex items-center justify-center min-h-[300px]">
                  <NoSlotsAvailable />
                </div>
              ) : (
                <div className="flex mx-auto">
                  <div className="grid mx-auto sm:px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-full">
                    {/* <!-- Early Bird - Sold Out --> */}
                    {/* <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-2xl flex flex-col justify-between opacity-60 grayscale relative">
                  <span className="absolute top-4 right-4 bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase">
                    Sold Out
                  </span>
                  <div>
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                      <Rocket className="text-gray-500" />
                    </div>
                    <h3 className="font-bold text-lg">Early Bird</h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Limited availability for early birds
                    </p>
                    <p className="text-2xl font-bold text-slate-400">$29.00</p>
                  </div>
                  <div className="mt-6 flex justify-between items-center text-slate-400">
                    <span className="text-xs">Out of stock</span>
                    <i className="w-5 h-5" data-lucide="slash"></i>
                  </div>
                </div> */}
                    {/* <!-- General - Selected --> */}

                    {slots.map((slot) => (
                      <SlotCard
                        key={slot._id}
                        slots={slot}
                        event={event}
                        onSelect={() => {
                          handleSelectSlot(slot);
                          showInfo(`You select ${slot.name} slot`);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
            {/* <!-- END: TicketSelection --> */}
            {/* <!-- BEGIN: PaymentSection --> */}
            <section className=" hidden bg-white rounded-3xl p-8 border border-slate-100 soft-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <i
                    className="w-5 h-5 text-indigo-600"
                    data-lucide="shield-check"
                  ></i>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Payment Method
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* <!-- Credit Card Option --> */}
                <label className="relative flex items-center p-4 border-2 border-indigo-600 bg-indigo-50/30 rounded-2xl cursor-pointer">
                  <input className="hidden" name="payment" type="radio" />
                  <i
                    className="w-6 h-6 text-indigo-600 mr-4"
                    data-lucide="credit-card"
                  ></i>
                  <div className="flex-grow">
                    <p className="font-bold text-slate-900 leading-none">
                      Credit/Debit Card
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                      Visa, Mastercard, Amex
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  </div>
                </label>
                {/* <!-- Digital Wallet Option --> */}
                <label className="relative flex items-center p-4 border-2 border-slate-200 hover:border-slate-300 rounded-2xl cursor-pointer">
                  <input className="hidden" name="payment" type="radio" />
                  <i
                    className="w-6 h-6 text-slate-400 mr-4"
                    data-lucide="wallet"
                  ></i>
                  <div className="flex-grow">
                    <p className="font-bold text-slate-700 leading-none">
                      Digital Wallets
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                      Apple Pay, Google Pay
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
                </label>
              </div>
              {/* <!-- Form Fields --> */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Cardholder Name
                  </label>
                  <input
                    className="w-full bg-slate-100 border-none rounded-xl py-4 px-6 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                    type="text"
                    value="Johnathan Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-slate-100 border-none rounded-xl py-4 px-6 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                      type="text"
                      value="0000 0000 0000 0000"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                      <div className="w-8 h-5 bg-slate-300 rounded"></div>
                      <div className="w-8 h-5 bg-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- END: PaymentSection --> */}
          </div>
        </div>
      </main>
    </>
  );
}
