import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronLeft,
  Currency,
  Calendar,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showError, showInfo, showSuccess } from "@/lib/hotToast";
import FormattedDate from "@/utils/dateLongFormat";
import { confirmToast } from "@/lib/confirmToast";
import TransparentSpinner from "@/components/shared/TransparentSpinner";
import useReservation from "@/hooks/reservation/useReservation";
import BackButton from "@/components/shared/BackButton";
import { formatTime } from "@/utils/timeLongFormat";

export default function Reservation() {
  const {
    reservations,
    loading,
    toggleReservation,
    selectedReservations,
    handlePayment,
    cancelReservation,
  } = useReservation();

  if (!reservations) {
    return <TransparentSpinner />;
  }

  if (loading) {
    return <TransparentSpinner />;
  }

  if (loading) return <div>Loading...</div>;

  const checkoutItems = reservations.filter((r) =>
    selectedReservations.some((s) => s._id === r._id),
  );

  const ticketCount = reservations.reduce((acc, r) => acc + r.quantity, 0);

  const subtotal = checkoutItems.reduce((a, r) => a + (r.totalAmount || 0), 0);

  const processingFee = 0;

  const bookingFee = 0;

  const grandTotal = subtotal + bookingFee + processingFee;

  const activeTickets = reservations.filter((t) => t.status === "pending");

  const count = activeTickets.length;

  return (
    <div className=" relative min-h-screen bg-[#f8f9ff] font-sans text-slate-900 pb-20">
      <main className=" max-w-7xl mx-auto px-6 py-12 mt-18">
        <div className="flex items-center justify-between gap-3 mb-8">
          <h2 className="text-4xl font-black tracking-tight">
            Ticket Reserved
          </h2>
          <span className="text-sm font-bold text-violet-600 bg-violet-100 px-1 py-1 rounded-lg w-1/4 text-center">
            {count} {count === 1 ? "Item" : "Items"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
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
              <h3 className="text-2xl font-extrabold mb-8">Order Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal ({ticketCount} tickets)</span>
                  <span className="text-slate-900 font-bold">
                    ₹ {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Booking Fees</span>
                  <span className="text-slate-900 font-bold">
                    ₹ {bookingFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium pb-4 border-b border-slate-50">
                  <span>Processing</span>
                  <span className="text-slate-900 font-bold">
                    ₹ {processingFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-black text-violet-600">
                    ₹ {grandTotal.toFixed(2)}
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
          </div>
        </div>
      </main>
    </div>
  );
}
