import UserTicketCard from "@/components/features/tickets/UserTickettCard";
import Topbar from "@/components/shared/usersPage/topbar";
import UserFooter from "@/components/shared/usersPage/userFooter";
import { formatTime } from "@/lib/timeLongFormat";
import axios from "axios";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Event {
  _id: string;
  name?: string;
  date: string;
  location: string;
  image?: string;
  startTime?: string;
  endTime?: string;
  status?: "active" | "pending" | "completed";
  description: string;
  price?: number;
  ticketTypes?: {
    _id: string;
    name: string;
    price: number;
  }[];
}

export default function UserTickets() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  const colors = [
    { name: "green", label: "Green", hex: "#22c55e" },
    { name: "yellow", label: "Yellow", hex: "#eab308" },
    { name: "red", label: "Red", hex: "#ef4444" },
  ];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/event/${id}`,
        );

        setEvent(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <>
      <Topbar />

      {/* <!-- END: MainHeader --> */}
      <main className="max-w-7xl mt-20 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* <!-- BEGIN: ContentArea --> */}
          <div className="lg:col-span-8 space-y-8">
            {/* <!-- BEGIN: EventSummaryCard --> */}

            <section className="bg-white rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(124,58,237,0.18)] soft-shadow flex flex-col md:flex-row border border-slate-100">
              <div className="md:w-1/2 relative">
                <img
                  alt="Holi Festival Event"
                  className="w-full h-full object-cover"
                  src={event.image}
                />
                <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {event.status || "active"}
                </span>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {event.name}
                </h1>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <i
                      className="w-5 h-5 text-indigo-500"
                      data-lucide="calendar"
                    ></i>
                    <span className="text-sm font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        timeZone: "UTC",
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <i
                      className="w-5 h-5 text-indigo-500"
                      data-lucide="clock"
                    ></i>
                    <span className="text-sm font-medium">
                      {formatTime(event.startTime || "")} -{" "}
                      {formatTime(event.endTime || "")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <i
                      className="w-5 h-5 text-indigo-500"
                      data-lucide="map-pin"
                    ></i>
                    <span className="text-sm font-medium">
                      {event.location || "Location not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- END: EventSummaryCard --> */}
            {/* <!-- BEGIN: TicketSelection --> */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Select Your Experience
                </h2>
                <span className="text-indigo-600 text-sm font-medium">
                  Prices include all taxes
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* <!-- Early Bird - Sold Out --> */}
                <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 flex flex-col justify-between opacity-60 grayscale relative">
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
                </div>
                {/* <!-- General - Selected --> */}
                <UserTicketCard
                  name="Most Popular"
                  accessLevel="General Admission"
                  description="Access to all public festival areas"
                  price={45}
                  color="green"
                  onSelect={() =>
                    navigate(`/user/tickets/${event._id}/general`)
                  }
                />

                {/* <!-- VIP - Available --> */}
                <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 flex flex-col justify-between hover:border-indigo-200 transition-all">
                  <div>
                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
                      <i
                        className="w-6 h-6 text-pink-500"
                        data-lucide="award"
                      ></i>
                    </div>
                    <h3 className="font-bold text-lg">VIP</h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Express entry, VIP lounge &amp; kit
                    </p>
                    <p className="text-2xl font-bold text-slate-900">$95.00</p>
                  </div>
                  <button className="mt-6 w-full py-2.5 px-4 border-2 border-pink-500 text-pink-500 font-bold rounded-xl hover:bg-pink-50 transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </section>
            {/* <!-- END: TicketSelection --> */}
            {/* <!-- BEGIN: PaymentSection --> */}
            <section className="bg-white rounded-3xl p-8 border border-slate-100 soft-shadow">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      Expiry Date
                    </label>
                    <input
                      className="w-full bg-slate-100 border-none rounded-xl py-4 px-6 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="MM / YY"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      CVV
                    </label>
                    <input
                      className="w-full bg-slate-100 border-none rounded-xl py-4 px-6 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                      type="password"
                      value="***"
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- END: PaymentSection --> */}
          </div>
          {/* <!-- END: ContentArea --> */}
          {/* <!-- BEGIN: Sidebar --> */}
          <aside className="lg:col-span-4 space-y-6">
            {/* <!-- BEGIN: OrderSummary --> */}
            <div className="bg-white rounded-3xl overflow-hidden soft-shadow border border-slate-100">
              <div className="bg-indigo-700 text-white p-6 text-center">
                <h3 className="text-lg font-bold">Order Summary</h3>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="font-bold text-slate-900">
                      General Admission × 2
                    </p>
                    <p className="text-xs text-slate-500">
                      Primary Entry + Color Kit
                    </p>
                  </div>
                  <p className="font-bold text-slate-900">$90.00</p>
                </div>
                <div className="space-y-3 py-6 border-y border-slate-100">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">$90.00</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Service Fee</span>
                    <span className="font-medium text-slate-900">$4.50</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Tax (GST 5%)</span>
                    <span className="font-medium text-slate-900">$4.72</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    className="flex-grow bg-slate-100 border-none rounded-lg text-sm px-4 py-2.5"
                    placeholder="Promo code"
                    type="text"
                  />
                  <button className="px-5 py-2.5 bg-indigo-100 text-indigo-700 font-bold rounded-lg text-sm hover:bg-indigo-200 transition-colors">
                    Apply
                  </button>
                </div>
                <div className="flex justify-between items-center mt-10 mb-8">
                  <span className="text-xl font-bold text-slate-900">
                    Total Amount
                  </span>
                  <span className="text-4xl font-black text-indigo-600">
                    $99.22
                  </span>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-200 group">
                  <span>Complete Payment</span>
                  <i
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    data-lucide="arrow-right"
                  ></i>
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-6 leading-relaxed">
                  By clicking Complete Payment, you agree to the
                  <br />
                  <a className="text-indigo-600 underline" href="#">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a className="text-indigo-600 underline" href="#">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
            {/* <!-- END: OrderSummary --> */}
            {/* <!-- BEGIN: SecurityBadge --> */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-green-50 rounded-full">
                <i
                  className="w-6 h-6 text-green-500"
                  data-lucide="shield-check"
                ></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  SSL Encrypted Payment
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-1">
                  Your personal data is protected by industry-standard
                  encryption.
                </p>
              </div>
            </div>
            {/* <!-- END: SecurityBadge --> */}
          </aside>
          {/* <!-- END: Sidebar --> */}
        </div>
      </main>
      <UserFooter />
    </>
  );
}
