import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronLeft,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Tag,
  CreditCard,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showError, showInfo, showSuccess } from "@/lib/toast";
import FormattedDate from "@/utils/dateLongFormat";
import { confirmToast } from "@/lib/confirmToast";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 animate-pulse flex gap-6">
      <div className="w-36 h-28 rounded-2xl bg-slate-200 shrink-0" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-slate-200 rounded-full w-1/2" />
        <div className="h-3 bg-slate-200 rounded-full w-1/3" />
        <div className="h-3 bg-slate-200 rounded-full w-1/4" />
        <div className="h-6 bg-slate-200 rounded-full w-1/5 mt-4" />
      </div>
    </div>
  );
}

export default function Reservation() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservations, setSelectedReservations] = useState<any[]>([]);
  const [payLoading, setPayLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reservations/my`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      const data = res.data.reservations || [];
      setReservations(data);
      setSelectedReservations(data);
    } catch (error) {
      console.log(error);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  const toggleReservation = (reservation: any) => {
    setSelectedReservations((prev) => {
      const exists = prev.some((r) => r._id === reservation._id);
      return exists ? prev.filter((r) => r._id !== reservation._id) : [...prev, reservation];
    });
  };

  const cancelReservation = async (reservationId: string) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/reservations/${reservationId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      showSuccess("Reservation cancelled");
      setReservations((prev) => prev.filter((r) => r._id !== reservationId));
      setSelectedReservations((prev) => prev.filter((r) => r._id !== reservationId));
    } catch (err) {
      console.error(err);
      showError("Failed to cancel reservation");
    }
  };

  const handlePayment = async () => {
    setPayLoading(true);
    try {
      const txRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transactions/checkout`,
        { reservationIds: selectedReservations.map((r) => r._id) },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      const transaction = txRes.data.transaction;

      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/razorpay/create-order`,
        { amount: transaction.total * 100, currency: "INR", transactionId: transaction._id }
      );
      const order = orderRes.data;

      if (!window.Razorpay) { showError("Razorpay not loaded"); return; }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "orboevents",
        description: `Payment for ${selectedReservations.length} ticket(s)`,
        handler: async function (response: any) {
          try {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/transactions/success`,
              {
                transactionId: transaction._id,
                reservationIds: selectedReservations.map((r) => r._id),
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            navigate(`/transaction`);
            showSuccess("Payment successful!");
            await fetchReservations();
          } catch (err) {
            console.error(err);
            showError("Payment verification failed");
          }
        },
        prefill: { name: user?.name || "Guest", email: user?.email || "user@email.com" },
        theme: { color: "#7c3aed" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      showError("Payment failed to initialize");
    } finally {
      setPayLoading(false);
    }
  };

  const activeTickets = reservations.filter((t) => t.status === "pending");
  const count = activeTickets.length;
  const checkoutItems = reservations.filter((r) => selectedReservations.some((s) => s._id === r._id));
  const ticketCount = checkoutItems.reduce((acc, r) => acc + r.quantity, 0);
  const subtotal = checkoutItems.reduce((a, r) => a + (r.totalAmount || 0), 0);
  const grandTotal = subtotal;
  const allSelected = reservations.length > 0 && selectedReservations.length === reservations.length;

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans text-slate-900 pb-24">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.5s ease both}
        .res-card{transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s ease}
        .res-card:hover{transform:translateY(-3px);box-shadow:0 16px 40px -8px rgba(124,58,237,0.12)}
        .res-card.selected{border-color:#c4b5fd;box-shadow:0 0 0 2px rgba(124,58,237,0.15)}
        .checkout-btn{transition:all 0.3s ease}
        .checkout-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 16px 40px -8px rgba(124,58,237,0.4)}
        .section-title{background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spinner{width:1.2rem;height:1.2rem;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite}
      `}</style>

      <main className="max-w-7xl mx-auto px-6 py-10 mt-16">

        {/* Header */}
        <div className="mb-10 fade-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-violet-100 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-violet-600">Your Cart</p>
              <h1 className="text-4xl font-black section-title leading-tight">Reserved Tickets</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="bg-violet-100 text-violet-700 text-xs font-black px-3 py-1.5 rounded-full">
              {count} {count === 1 ? "Item" : "Items"} Pending
            </span>
            <span className="text-slate-400 text-xs font-medium">Reserved for 15 min</span>
            <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" /> Complete payment before expiry
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Reservation Cards ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Select All */}
            {reservations.length > 1 && (
              <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-3.5 border border-slate-100 fade-up">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setSelectedReservations(allSelected ? [] : [...reservations])}
                    className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${allSelected ? "bg-violet-600 border-violet-600" : "border-slate-300 hover:border-violet-400"}`}
                  >
                    {allSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="font-bold text-slate-700 text-sm">Select All Reservations</span>
                </label>
                <span className="text-xs font-bold text-slate-400">{selectedReservations.length} / {reservations.length} selected</span>
              </div>
            )}

            {loading ? (
              <>{[...Array(2)].map((_, i) => <SkeletonCard key={i} />)}</>
            ) : reservations.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 border border-dashed border-slate-200 text-center fade-up">
                <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <ShoppingCart className="w-9 h-9 text-violet-300" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Your cart is empty</h3>
                <p className="text-slate-500 font-medium mb-6">You don't have any pending reservations.</p>
                <Link to="/events">
                  <button className="inline-flex items-center gap-2 px-7 py-3 bg-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-violet-600/25 hover:bg-violet-700 transition-all text-sm">
                    Browse Events <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            ) : (
              reservations.map((r: any, idx: number) => {
                const isSelected = selectedReservations.some((s) => s._id === r._id);
                return (
                  <div key={r._id} className={`res-card bg-white rounded-3xl p-5 border border-slate-100 flex gap-5 fade-up ${isSelected ? "selected" : ""}`} style={{ animationDelay: `${idx * 0.08}s` }}>
                    {/* Checkbox */}
                    <div className="pt-1 shrink-0">
                      <div
                        onClick={() => toggleReservation(r)}
                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${isSelected ? "bg-violet-600 border-violet-600" : "border-slate-300 hover:border-violet-400"}`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="w-36 h-28 rounded-2xl overflow-hidden shrink-0">
                      <img
                        src={r.eventId?.image || "/images/images.jpg"}
                        alt={r.eventId?.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-1 block">Event Ticket</span>
                          <h3 className="text-lg font-black text-slate-900 mb-1 leading-snug">{r.eventId?.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-violet-400" />
                              <FormattedDate date={r.eventId?.date} />
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-violet-400" />
                              {r.eventId?.location}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                              <Tag className="w-3.5 h-3.5 text-violet-400" />
                              Qty: {r.quantity}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => confirmToast("Cancel this reservation?", () => cancelReservation(r._id))}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-3">
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${r.status === "pending" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                          {r.status === "pending" ? "⏳ Pending" : "✓ Confirmed"}
                        </span>
                        <span className="text-xl font-black text-violet-600">₹{r.totalAmount?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            <Link to="/events">
              <button className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-violet-600 transition-colors group mt-2">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Continue Browsing Events
              </button>
            </Link>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="space-y-5">
            {/* Summary Card */}
            <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-xl shadow-violet-600/5 sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-violet-600" />
                <h3 className="text-xl font-black">Order Summary</h3>
              </div>

              {/* Items breakdown */}
              {checkoutItems.length > 0 && (
                <div className="space-y-3 mb-5">
                  {checkoutItems.map((r) => (
                    <div key={r._id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <img src={r.eventId?.image || "/images/images.jpg"} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 truncate">{r.eventId?.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 shrink-0">₹{r.totalAmount?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-slate-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-slate-500 font-medium text-sm">
                  <span>Subtotal ({ticketCount} {ticketCount === 1 ? "ticket" : "tickets"})</span>
                  <span className="text-slate-900 font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium text-sm">
                  <span>Booking Fees</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium text-sm pb-4 border-b border-slate-100">
                  <span>Processing</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-lg font-black">Total</span>
                  <span className="text-3xl font-black text-violet-600">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => confirmToast("Proceed to Checkout now?", () => handlePayment())}
                disabled={selectedReservations.length === 0 || payLoading}
                className="checkout-btn w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white py-4 rounded-2xl font-black text-base shadow-xl shadow-violet-600/25 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {payLoading ? (
                  <><span className="spinner" /> Processing…</>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {selectedReservations.length === 0 && (
                <p className="text-center text-xs text-rose-500 font-medium mt-2">Select at least one reservation to checkout</p>
              )}

              <div className="mt-6 space-y-3 pt-5 border-t border-slate-50">
                {[
                  { icon: ShieldCheck, text: "Secured by Razorpay — PCI DSS Level 1" },
                  { icon: Clock, text: "15-minute reservation guaranteed" },
                  { icon: Sparkles, text: "Instant QR ticket on payment" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-400">
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
