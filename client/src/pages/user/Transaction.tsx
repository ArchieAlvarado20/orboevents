import TicketModal from "@/components/features/tickets/QRModal";
import { formatTime } from "@/utils/timeLongFormat";
import axios from "axios";
import {
  QrCode,
  MapPin,
  Calendar,
  Ticket,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface TicketType {
  _id: string;
  code: string;
  status: "active" | "used";
  userId?: { _id: string; name: string; email: string };
  eventId?: { _id: string; name: string; date: string; location: string; image?: string; startTime: string };
  ticketTypeId?: { _id: string; name: string; price: number };
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

function SkeletonTicket() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 animate-pulse flex flex-col md:flex-row">
      <div className="md:w-56 h-48 md:h-auto bg-slate-200 shrink-0" />
      <div className="flex-1 p-8 space-y-4">
        <div className="h-3 bg-slate-200 rounded-full w-1/4" />
        <div className="h-5 bg-slate-200 rounded-full w-2/3" />
        <div className="h-3 bg-slate-200 rounded-full w-1/2" />
        <div className="h-3 bg-slate-200 rounded-full w-1/3" />
        <div className="flex gap-3 mt-6">
          <div className="h-11 bg-slate-200 rounded-2xl flex-1" />
          <div className="h-11 bg-slate-200 rounded-2xl w-12" />
        </div>
      </div>
    </div>
  );
}

export default function Transaction() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"active" | "all">("active");
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tickets/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTickets(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets
    .filter((t) => activeTab === "active" ? t.status === "active" : true)
    .filter((t) => {
      const q = searchQuery.toLowerCase();
      return !q || t.eventId?.name?.toLowerCase().includes(q) || t.eventId?.location?.toLowerCase().includes(q);
    });

  const activeCount = tickets.filter((t) => t.status === "active").length;
  const usedCount = tickets.filter((t) => t.status === "used").length;

  const statusConfig = {
    active: { label: "Active", icon: CheckCircle, classes: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    used: { label: "Used", icon: XCircle, classes: "bg-slate-100 text-slate-500 border-slate-200" },
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.5s ease both}
        .ticket-card{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .ticket-card:hover{transform:translateY(-4px);box-shadow:0 24px 48px -12px rgba(124,58,237,0.15)}
        .section-title{background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .shimmer-text{background:linear-gradient(90deg,#7c3aed,#a855f7,#ec4899,#7c3aed);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .tab-btn{transition:all 0.25s ease}
        .qr-btn{transition:all 0.3s ease}
        .qr-btn:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(124,58,237,0.35)}
        .search-box:focus-within{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,0.12)}
        .ticket-stub::before{content:'';position:absolute;left:-12px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:#f8f9ff;border-radius:50%;border:1.5px solid #e2e8f0}
        .ticket-stub::after{content:'';position:absolute;right:-12px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:#f8f9ff;border-radius:50%;border:1.5px solid #e2e8f0}
      `}</style>

      <main className="min-h-screen bg-[#f8f9ff] pb-24">
        <div className="max-w-7xl mx-auto px-6 py-10 mt-16">

          {/* ── Header ── */}
          <div className="mb-10 fade-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-violet-100 rounded-2xl flex items-center justify-center">
                <Ticket className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-violet-600">Your Wallet</p>
                <h1 className="text-4xl font-black section-title leading-tight">My Tickets</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="bg-violet-100 text-violet-700 text-xs font-black px-3 py-1.5 rounded-full">{activeCount} Active</span>
              <span className="bg-slate-100 text-slate-600 text-xs font-black px-3 py-1.5 rounded-full">{usedCount} Used</span>
              <span className="text-slate-400 text-xs font-medium">{tickets.length} total tickets</span>
            </div>
          </div>

          {/* ── Tabs + Search + Filter ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 fade-up" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center bg-white rounded-2xl p-1.5 border border-slate-100 gap-1 w-fit">
              {([{ id: "active", label: `Active (${activeCount})` }, { id: "all", label: `All Tickets (${tickets.length})` }] as const).map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn px-5 py-2.5 rounded-xl font-bold text-sm ${activeTab === tab.id ? "bg-violet-600 text-white shadow-md shadow-violet-600/20" : "text-slate-500 hover:text-violet-600"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="search-box relative flex items-center bg-white border border-slate-200 rounded-2xl transition-all overflow-hidden">
                <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tickets…"
                  className="pl-10 pr-4 py-3 bg-transparent text-slate-700 font-medium text-sm outline-none placeholder:text-slate-400 w-52" />
              </div>
            </div>
          </div>

          {/* ── Ticket Grid ── */}
          {loading ? (
            <div className="space-y-5">
              {[...Array(3)].map((_, i) => <SkeletonTicket key={i} />)}
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 border border-dashed border-slate-200 text-center fade-up">
              <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Ticket className="w-9 h-9 text-violet-300" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                {activeTab === "active" ? "No active tickets" : "No tickets found"}
              </h3>
              <p className="text-slate-500 font-medium mb-6">
                {searchQuery ? `No results for "${searchQuery}"` : "You don't have any tickets yet."}
              </p>
              {!searchQuery && (
                <Link to="/events">
                  <button className="inline-flex items-center gap-2 px-7 py-3 bg-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-violet-600/25 hover:bg-violet-700 transition-all text-sm">
                    Browse Events <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {filteredTickets.map((ticket, idx) => {
                const cfg = statusConfig[ticket.status] || statusConfig.active;
                const StatusIcon = cfg.icon;
                return (
                  <div key={ticket._id} className={`ticket-card fade-up bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col md:flex-row`} style={{ animationDelay: `${idx * 0.08}s` }}>

                    {/* Image column */}
                    <div className="md:w-56 relative overflow-hidden shrink-0 h-52 md:h-auto">
                      <img
                        src={ticket.eventId?.image || "/images/images.jpg"}
                        alt={ticket.eventId?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                      {/* Date badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-md text-center">
                        <p className="text-xs font-black text-slate-900 uppercase leading-tight">
                          {new Date(ticket.eventId?.date || "").toLocaleDateString("en-IN", { month: "short" })}
                        </p>
                        <p className="text-xl font-black text-violet-600 leading-none">
                          {new Date(ticket.eventId?.date || "").getDate()}
                        </p>
                      </div>
                      {/* Status badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${cfg.classes}`}>
                          <StatusIcon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </div>
                    </div>

                    {/* Info column */}
                    <div className="flex-1 p-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-1.5 block">
                              {ticket.ticketTypeId?.name || "Standard Ticket"}
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 leading-snug">{ticket.eventId?.name}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Ticket Price</p>
                            <p className="text-xl font-black text-violet-600">₹{ticket.ticketTypeId?.price?.toFixed(2) ?? "—"}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                          {ticket.eventId?.startTime && (
                            <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                              <Clock className="w-4 h-4 text-violet-400 shrink-0" />
                              Starts at {formatTime(ticket.eventId?.startTime)}
                            </span>
                          )}
                          {ticket.eventId?.location && (
                            <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                              <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
                              {ticket.eventId?.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                            <Calendar className="w-4 h-4 text-violet-400 shrink-0" />
                            {new Date(ticket.eventId?.date || "").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        </div>

                        {/* Ticket code */}
                        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ticket ID</span>
                          <span className="font-mono text-xs font-bold text-slate-700">{ticket.code || ticket._id.slice(-8).toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                        <button
                          onClick={() => handleShowTicket(ticket)}
                          disabled={ticket.status === "used"}
                          className="qr-btn flex items-center gap-2 bg-violet-600 text-white py-3 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-violet-600/20 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                          <QrCode className="w-4 h-4" /> Show QR Ticket
                        </button>
                        <button className="flex items-center gap-2 bg-slate-100 text-slate-700 py-3 px-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                        {ticket.status === "used" && (
                          <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold ml-1">
                            <XCircle className="w-4 h-4" /> This ticket has been used
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right accent */}
                    <div className={`w-2 shrink-0 ${ticket.status === "active" ? "bg-gradient-to-b from-violet-600 to-purple-700" : "bg-slate-200"}`} />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Footer CTA ── */}
          {!loading && (
            <div className="mt-16 fade-up">
              <div className="relative bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-900 rounded-3xl p-10 md:p-14 overflow-hidden shadow-2xl shadow-violet-900/20">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-violet-400/15 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      <span className="text-white text-xs font-bold uppercase tracking-widest">Find More Events</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Ready for your next event?</h3>
                    <p className="text-violet-200 font-medium max-w-md">Browse thousands of upcoming events and book in seconds.</p>
                  </div>
                  <Link to="/events" className="shrink-0">
                    <button className="group flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-black rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all">
                      Explore Events <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

        <TicketModal open={open} onClose={() => setOpen(false)} ticket={selectedTicket} />
      </main>
    </>
  );
}
