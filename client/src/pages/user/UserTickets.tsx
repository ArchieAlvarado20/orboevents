import api from "@/api/interceptor.api";
import { ticketTypeApi } from "@/api/ticketType.api";
import { userEventApi } from "@/api/userEvent.api";
import NoTicketsAvailable from "@/components/features/tickets/NoTicketsAvailable";
import UserTicketCard from "@/components/features/tickets/UserTicketCard";
import BackButton from "@/components/shared/BackButton";
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import { showError, showInfo, showSuccess } from "@/lib/hotToast";
import { currency } from "@/types/currency.type";
import { TicketTypeForm } from "@/types/ticketTypes";

import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { confirmToast } from "@/lib/confirmToast";
import FormattedDate from "@/utils/dateLongFormat";
import useReservation from "@/hooks/reservation/useReservation";
import { SlotType } from "@/hooks/slot/useSlot";
import { slotApi } from "@/api/slot.api";
import { formatTime } from "@/utils/timeLongFormat";

export default function UserTickets() {
  const { id, slotId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<TicketTypeForm[]>([]);
  const [slot, setSlot] = useState<SlotType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const {
    reservations,
    toggleReservation,
    selectedReservations,
    handlePayment,
    cancelReservation,
    fetchReservations,
  } = useReservation();

  const total = (selectedTicket?.price || 0) * quantity;

  const handleSelectTicket = (ticket: any, qty: number) => {
    setSelectedTicket(ticket);
    setQuantity(qty);

    setTimeout(() => {
      document.getElementById("reservation")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const fetchData = async () => {
    if (!id || !slotId) return;
    setLoading(true);

    try {
      const eventRes = await userEventApi.getByEventID(id);
      setEvent(eventRes.data);
    } catch (err) {
      console.error("Event failed", err);
      setError("Failed to load event");
    }

    try {
      const ticketRes = await ticketTypeApi.getTicketTypesByEvent(id, slotId);
      setTickets(ticketRes.data || []);
      // console.log(ticketRes.data);
    } catch (err: unknown) {
      console.error("Tickets failed", err);
      setTickets([]);
    }

    try {
      const slotsRes = await slotApi.getSlotById(slotId);

      setSlot(slotsRes.data);
      console.log(slotsRes.data);
    } catch (err) {
      console.error("Slots failed", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchReservations();
  }, [id]);

  if (loading) {
    return <TransparentSpinner />;
  }

  if (error || !event || !slot) {
    navigate("/events");
    showError("No ticket found.");
  }

  const handleReserve = async () => {
    if (!selectedTicket || !event) return;

    try {
      const res = await api.post(
        "/api/reservations",
        {
          eventId: event._id,
          ticketTypeId: selectedTicket._id,
          slotId: slotId,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("Reservation success:", res.data);
      showSuccess("Ticket Reserved!");
      setQuantity(1);
      fetchReservations();
      setSelectedTicket(null);

      setTimeout(() => {
        const el = document.getElementById("selectedTicket");

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 50);

      // fetchData();
      // navigate("/reservation");
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      showError(error.response?.data?.message || "Reservation failed");
    }
  };

  if (!reservations) {
    return <TransparentSpinner />;
  }

  const checkoutItems = reservations.filter((r) =>
    selectedReservations.some((s) => s._id === r._id),
  );

  const ticketCount = selectedReservations.reduce(
    (acc, r) => acc + r.quantity,
    0,
  );

  const subtotal = checkoutItems.reduce((a, r) => a + (r.totalAmount || 0), 0);

  const serviceFee = 100;

  const grandTotal = subtotal + serviceFee;

  const activeTickets = reservations.filter((t) => t.status === "pending");

  const count = activeTickets.length;

  return (
    <>
      <main className="max-w-7xl mt-24 mx-auto sm:px-4 sm:py-8">
        <div className="mt-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* <!-- BEGIN: ContentArea --> */}
          <div className="lg:col-span-8 space-y-8">
            {/* <!-- BEGIN: EventSummaryCard --> */}

            <section className="bg-white sm:rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(124,58,237,0.18)] soft-shadow flex flex-col md:flex-row border border-slate-100 ">
              <div className="md:w-1/2 relative">
                <img
                  alt="Holi Festival Event"
                  className="w-full h-full max-h-200 object-cover min-w-50 md:min-w-80"
                  src={event?.image || "/images/images.jpg"}
                />
                <BackButton className="mt-2" />
              </div>
              {/* Event Info */}
              <div className="p-5 space-y-3">
                <h1 className="text-2xl font-bold text-slate-900">
                  {event?.name}
                </h1>
                <h1 className="inline-block text-md font-lg text-slate-200 bg-violet-600 rounded-sm px-2 py-1">
                  <FormattedDate date={slot?.date} />
                </h1>

                <h1 className="text-md font-bold text-slate-900 rounded-sm px-2 py-1">
                  Starts at {formatTime(slot?.startTime)}
                </h1>

                <p className="text-slate-600 text-sm">{event.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {event.location}
                  </span>

                  <span className="flex items-center gap-1">
                    {currency.rupees} {event.basePrice}
                  </span>

                  <span className="flex items-center gap-1">
                    <Users size={14} /> {slot?.capacity}
                  </span>
                </div>
              </div>
            </section>
            {/* <!-- END: EventSummaryCard --> */}
            {/* <!-- BEGIN: TicketSelection --> */}
            <section>
              <div className="flex flex-col px-5 md:flex-row justify-between md:items-end gap-2 mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Select Your Experience
                </h2>
                <h2 className="text-sm text-slate-600">
                  Note: Limit 5 tickets reservation per event.
                </h2>
                <Link to="/reservation">
                  {" "}
                  <span className="flex gap-2 text-indigo-600 text-sm font-medium">
                    Go to reservations <ArrowRight />
                  </span>
                </Link>
              </div>
              {!tickets.length ? (
                <div className="flex items-center justify-center min-h-[300px]">
                  <NoTicketsAvailable />
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

                    {tickets.map((ticket) => (
                      <UserTicketCard
                        key={`${ticket._id}-${quantity}`}
                        ticketType={ticket}
                        onSelect={handleSelectTicket}
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
          <aside className=" lg:col-span-4 space-y-6" id="reservation">
            {/* <!-- BEGIN: OrderSummary --> */}
            <div className="bg-white sm:rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(124,58,237,0.18)] soft-shadow  border border-slate-100">
              <div className="bg-indigo-700 text-white p-6 text-center">
                <h3 className="text-lg font-bold">Reservation Summary</h3>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="font-bold text-slate-900">
                      {selectedTicket?.name || "No ticket selected"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {selectedTicket?.privileges?.length
                        ? selectedTicket.privileges.join(", ")
                        : "No privileges"}
                    </p>
                  </div>
                  <p className="font-bold text-slate-900">
                    ₹{selectedTicket?.price.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div className="space-y-3 py-6 border-y border-slate-100">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <p className=" text-slate-900">
                      {quantity > 1 ? ` x (${quantity} tickets)` : ``}
                    </p>
                    <span className="font-medium text-slate-900">
                      ₹{selectedTicket?.price.toFixed(2) * quantity || "0.00"}
                    </span>
                  </div>
                </div>
                <div className="hidden items-center gap-2 mt-6">
                  <input
                    className="grow bg-slate-100 border-none rounded-lg text-sm px-4 py-2.5"
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
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleReserve}
                  disabled={!selectedTicket}
                  className={`w-full font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg group
                      ${
                        selectedTicket
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                      }
                    `}
                >
                  <span>Reserve Ticket</span>
                  <ArrowRight />
                  <ShoppingCart className="w-6 h-6" />
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

            {/* <!-- END: SecurityBadge --> */}
          </aside>
          {/* <!-- END: Sidebar --> */}
        </div>

        {/* Reservation Section */}
        <section>
          <div className=" relative min-h-screen bg-white  font-sans text-slate-900 pb-20">
            <main className=" max-w-7xl mx-auto px-6 py-12 mt-18 border-t border-dashed border-slate-400">
              <div className="flex items-center justify-between gap-3 mb-8">
                <h2 className="text-4xl font-black tracking-tight">
                  Ticket Reserved
                </h2>
                <span className="text-sm font-bold text-violet-600 bg-violet-100 px-1 py-1 rounded-lg w-1/8 text-center">
                  {count} {count === 1 ? "Item" : "Items"}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6" id="selectedTicket">
                  {reservations.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 border border-dashed border-slate-200 text-center">
                      <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">
                        You don’t have any reservations.
                      </p>
                      <Link to="/events">
                        <button className="mt-4 text-violet-600 font-bold hover:underline">
                          Continue Browsing
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      {" "}
                      {reservations.map((r: any) => (
                        <div
                          key={r._id}
                          className="relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 group hover:shadow-md transition-shadow"
                        >
                          <button
                            onClick={() =>
                              confirmToast("Cancel this reservation?", () => {
                                cancelReservation(r._id);
                              })
                            }
                            className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700  rounded-xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <div className=" hidden w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                            <img
                              src={r.eventId?.image || "/images/images.jpg"}
                              alt={r.eventId?.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between rs-start">
                              <div>
                                <div className="flex gap-3">
                                  <h3 className="text-xl font-bold mb-1 ">
                                    {r.ticketTypeId?.name}
                                  </h3>

                                  <input
                                    type="checkbox"
                                    checked={selectedReservations.some(
                                      (s) => s._id === r._id,
                                    )}
                                    onChange={() => toggleReservation(r)}
                                    className="w-5 h-5 mt-5 md:mt-1"
                                  />
                                </div>
                                <h3 className="text-lg font-bold mb-1 text-slate-600">
                                  {r.eventId?.name}
                                </h3>

                                <h3 className="text-md text-slate-600 font-bold mb-1">
                                  <FormattedDate date={r.slotId?.date} />
                                </h3>

                                <p className="text-md text-slate-600 font-bold mb-1">
                                  {formatTime(r.slotId?.startTime)}
                                </p>

                                <p className="text-md text-slate-600 font-bold mb-1">
                                  {r.eventId?.location}
                                </p>

                                <p className="text-xl text-violet-600 mt-2 font-bold mb-1  transition-colors">
                                  ₹ {r.totalAmount.toFixed(2)}
                                </p>
                              </div>
                            </div>

                            <div className="hidden flex items-center justify-between mt-4">
                              <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                                <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-white rounded-lg transition-all">
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center font-bold text-sm">
                                  {r.quantity}
                                </span>
                                <button
                                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-white rounded-lg transition-all"
                                  onClick={() =>
                                    showInfo(
                                      "For now only one ticket per event only!",
                                    )
                                  }
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-2xl font-black text-violet-600"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <Link to="/events">
                    <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-violet-600 transition-colors group">
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Continue Browsing Events
                    </button>
                  </Link>
                </div>

                {/* Sidebar Summary */}
                <div className="space-y-6">
                  <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-violet-600/5">
                    <h3 className="text-2xl font-extrabold mb-8">
                      Order Summary
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Subtotal ({ticketCount} tickets)</span>
                        <span className="text-slate-900 font-bold">
                          ₹ {subtotal.toFixed(2)}
                        </span>
                      </div>
                      {ticketCount > 1 && (
                        <div className="flex justify-between text-slate-500 font-medium pb-4 border-b border-slate-50">
                          <span>Service Fee</span>
                          <span className="text-slate-900 font-bold">
                            ₹ {serviceFee.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xl font-bold">Total</span>
                        <span className="text-3xl font-black text-violet-600">
                          {ticketCount === 0
                            ? "₹ 0"
                            : `₹ ${grandTotal.toFixed(2)}`}
                        </span>
                      </div>
                    </div>

                    <div className="hidden space-y-4 mb-8">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Promo Code
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          // value={promoCode}
                          // onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-600/10 focus:border-violet-600 transition-all"
                        />
                        <button className="bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        confirmToast("Proceed to Checkout now?", () => {
                          handlePayment();
                        })
                      }
                      // disabled={!reservations}
                      className="w-full bg-violet-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-violet-700 transition-all shadow-xl shadow-violet-600/20 flex items-center justify-center gap-3 group"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-center gap-3 text-slate-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          Secure checkout powered by PulsePay
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          15-minute reservation guaranteed
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <!-- BEGIN: SecurityBadge --> */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100  shadow-[0_15px_50px_rgba(124,58,237,0.18)] soft-shadow flex items-start gap-4">
                    <div className="p-2.5 bg-green-50 rounded-full">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
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
                </div>
              </div>
            </main>
          </div>
        </section>
      </main>
    </>
  );
}
