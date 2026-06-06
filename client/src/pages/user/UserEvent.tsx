import UserEventCard2 from "@/components/shared/usersPage/userEventCard2";
import axios from "axios";
import {
  ChevronRight,
  Filter,
  Search,
  X,
  SlidersHorizontal,
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
  TrendingUp,
  ArrowRight,
  PartyPopper,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getPagination } from "@/lib/pagination";
import EventCarousel from "@/components/shared/usersPage/EventCarousel";
import { userEventApi } from "@/api/userEvent.api";
import { useCategory } from "@/hooks/category/useCategory";
import { EventForm } from "@/types/event";
import { categoryIconMap } from "@/types/categoryIcon.type";
import TransparentSpinner from "@/components/shared/TransparentSpinner";

/* ─── Skeleton Card ─── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 animate-pulse">
      <div className="h-56 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-slate-200 rounded-full w-1/3" />
        <div className="h-5 bg-slate-200 rounded-full w-3/4" />
        <div className="h-3 bg-slate-200 rounded-full w-full" />
        <div className="h-3 bg-slate-200 rounded-full w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-slate-200 rounded-full w-1/4" />
          <div className="h-9 bg-slate-200 rounded-full w-1/3" />
        </div>
      </div>
    </div>
  );
}

/* ─── Custom debounce hook — prevents API call on every keystroke ─── */
// function useDebounce<T>(value: T, delay: number): T {
//   const [debounced, setDebounced] = useState<T>(value);
//   useEffect(() => {
//     const timer = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(timer);
//   }, [value, delay]);
//   return debounced;
// }

export default function UserEvents() {
  const [events, setEvents] = useState<EventForm[]>([]);
  const [allEvents, setAllEvents] = useState<EventForm[]>([]);
  const eventGridRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { categories, fetchPublicCategories } = useCategory();

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    dateFrom: "",
    dateTo: "",
  });

  // Debounced values — API fires only after user stops typing (500ms)
  // const search = useDebounce(searchInput, 500);
  // const locationFilter = useDebounce(locationInput, 500);

  const pageRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const paginationTotal = Math.max(totalPages, 1);

  const hasFilters =
    selectedCategory ||
    locationInput ||
    dateFrom ||
    dateTo ||
    minPrice ||
    maxPrice ||
    searchInput;

  const handlePageClick = (p: number | string, index: number) => {
    if (typeof p === "number") {
      setPage(p);
      window.scrollTo({ top: 0, behavior: "smooth" });
      pageRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setLocationInput("");
    setDateFrom("");
    setDateTo("");
    setMinPrice("");
    setMaxPrice("");
    setSearchInput("");
    setPage(1);
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);

      try {
        const res = await userEventApi.getAllEvents();

        setAllEvents(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const res = await userEventApi.get({
          page,
          category: selectedCategory,
          search: filters.search,
          location: filters.location,
          dateFrom: filters.dateFrom,
          dateTo: filters.dateTo,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        });
        setEvents(res.data.events || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page, selectedCategory, filters]);

  useEffect(() => {
    fetchPublicCategories();
  }, []);

  if (!events) {
    return <TransparentSpinner />;
  }
  if (loading) {
    return <TransparentSpinner />;
  }

  return (
    <>
      <style>{`
        .events-filter-glass { background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); }
        .cat-pill { transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .cat-pill:hover { transform: translateY(-2px); }
        .cat-pill.active { transform: translateY(-2px); }
        .page-btn { transition: all 0.2s ease; }
        .page-btn:hover:not(:disabled) { transform: scale(1.08); }
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .ev-card { animation: fadeSlideIn 0.4s ease both; }
        .ev-card:nth-child(1){animation-delay:.05s} .ev-card:nth-child(2){animation-delay:.10s}
        .ev-card:nth-child(3){animation-delay:.15s} .ev-card:nth-child(4){animation-delay:.20s}
        .ev-card:nth-child(5){animation-delay:.25s} .ev-card:nth-child(6){animation-delay:.30s}
        .filter-panel { animation: fadeSlideIn 0.3s ease both; }
        .shimmer-bg {
          background: linear-gradient(90deg,#7c3aed,#a855f7,#ec4899,#7c3aed);
          background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .search-box:focus-within { box-shadow: 0 0 0 3px rgba(124,58,237,0.15); border-color: #7c3aed; }
      `}</style>

      <main className="pt-24 pb-20 grow bg-[#f8f9ff] min-h-screen">
        {/* <!-- Hero Section --> */}
        <section className="max-w-7xl py-8 mx-auto sm:px-6 mb-6" id="top">
          <EventCarousel events={allEvents} />
        </section>

        {/* ═══ SEARCH + FILTER BAR ═══ */}
        <section className="max-w-7xl mx-auto px-6 mb-8">
          {/* Advanced filter panel */}
          <div className="filter-panel events-filter-glass rounded-3xl p-6 mb-5 shadow-xl border border-slate-100">
            <div className="flex flex-col md:flex-row gap-3 mb-5">
              <div className=" search-box relative flex-1 bg-white border border-slate-200 rounded-2xl transition-all overflow-hidden flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search events, artists, venues…"
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-slate-800 font-medium placeholder:text-slate-400 text-sm outline-none"
                />
                {searchInput && (
                  <button
                    onClick={() => {
                      setSearchInput("");
                      setPage(1);
                    }}
                    className="pr-4 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={!hasFilters}
                  onClick={() => {
                    setFilters({
                      search: searchInput,
                      location: locationInput,
                      minPrice,
                      maxPrice,
                      dateFrom,
                      dateTo,
                    });

                    setPage(1);
                  }}
                  className={` flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm border transition-all ${hasFilters ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-600/25" : "bg-white text-slate-700 border-slate-200 hover:border-violet-300 hover:text-violet-600"}`}
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                  {hasFilters && (
                    <span className="w-5 h-5 bg-white text-violet-600 rounded-full text-xs font-black flex items-center justify-center ml-1">
                      !
                    </span>
                  )}
                </button>
                {hasFilters && (
                  <button
                    onClick={() => {
                      clearFilters();
                      setFilters({
                        search: "",
                        location: "",
                        minPrice: "",
                        maxPrice: "",
                        dateFrom: "",
                        dateTo: "",
                      });
                    }}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-all"
                  >
                    <X className="w-4 h-4" /> Clear All
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
                  <MapPin className="w-3 h-3 text-violet-500" /> Location
                </label>
                <input
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setPage(1);
                  }}
                  placeholder="City or venue…"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
                  <Calendar className="w-3 h-3 text-violet-500" /> From
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
                  <Calendar className="w-3 h-3 text-violet-500" /> To
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400">
                  <IndianRupee className="w-3 h-3 text-violet-500" /> Price
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min={0}
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Min ₹"
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white transition-all"
                  />
                  <input
                    type="number"
                    min={0}
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Max ₹"
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide py-1"
            ref={eventGridRef}
            id="category"
          >
            <button
              onClick={() => {
                clearFilters();
                setFilters({
                  search: "",
                  location: "",
                  minPrice: "",
                  maxPrice: "",
                  dateFrom: "",
                  dateTo: "",
                });
              }}
              className={`cat-pill flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap border transition-all ${
                selectedCategory === ""
                  ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-600/25"
                  : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <PartyPopper className="w-4 h-4" />
                All Events
              </div>
            </button>
            {categories.map((cat) => {
              const Icon = categoryIconMap[cat.icon];
              const isActive = selectedCategory === cat._id;
              return (
                <button
                  key={cat._id}
                  onClick={() => {
                    setSelectedCategory(cat._id);
                    setPage(1);
                    setTimeout(() => {
                      document.getElementById("category")?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }, 50);
                  }}
                  className={`cat-pill flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap border transition-all ${isActive ? "active bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-600/25" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50"}`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {cat.name}
                </button>
              );
            })}
          </div>

          {!loading && (
            <p className="text-sm font-semibold text-slate-500 mt-4">
              {hasFilters ? (
                <>
                  Showing{" "}
                  <span className="text-slate-900 font-bold">
                    {events.length}
                  </span>{" "}
                  filtered results
                </>
              ) : (
                <>
                  Showing{" "}
                  <span className="text-slate-900 font-bold">
                    {events.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-slate-900 font-bold">
                    {events.length}
                  </span>{" "}
                  events
                </>
              )}
            </p>
          )}
        </section>

        {/* ═══ EVENT GRID ═══ */}
        <section className="max-w-7xl mx-auto px-6 min-h-96">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
                <Filter className="w-10 h-10 text-violet-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                No Events Found
              </h3>
              <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed mb-8">
                No events match your filters. Try adjusting or clearing them.
              </p>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="px-8 py-3.5 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-600/25 hover:bg-violet-700 hover:-translate-y-0.5 transition-all"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event._id} className="ev-card">
                  <UserEventCard2 event={event} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && paginationTotal > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
              <button
                onClick={() => {
                  setPage(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={page === 1}
                className="page-btn w-10 h-10 flex items-center justify-center font-black rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-violet-400 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                «
              </button>
              <button
                onClick={() => {
                  setPage((p) => Math.max(p - 1, 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={page === 1}
                className="page-btn w-10 h-10 flex items-center justify-center font-black rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-violet-400 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              {getPagination(page, paginationTotal).map((p, i) =>
                p === "..." ? (
                  <span
                    key={i}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold"
                  >
                    …
                  </span>
                ) : (
                  <button
                    ref={(el) => {
                      pageRefs.current[i] = el;
                    }}
                    key={i}
                    onClick={() => handlePageClick(p, i)}
                    className={`page-btn w-10 h-10 flex items-center justify-center font-bold rounded-xl transition-all ${page === p ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 border border-violet-600" : "bg-white border border-slate-200 text-slate-700 hover:border-violet-400 hover:text-violet-600"}`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() => {
                  setPage((p) => Math.min(p + 1, paginationTotal));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={page === paginationTotal}
                className="page-btn w-10 h-10 flex items-center justify-center font-black rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-violet-400 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ›
              </button>
              <button
                onClick={() => {
                  setPage(paginationTotal);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={page === paginationTotal}
                className="page-btn w-10 h-10 flex items-center justify-center font-black rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-violet-400 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                »
              </button>
              <span className="text-xs font-bold text-slate-400 px-3 py-2 bg-white rounded-xl border border-slate-100 ml-2">
                Page {page} of {paginationTotal}
              </span>
            </div>
          )}
        </section>

        {/* ═══ COMMUNITY CTA ═══ */}
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-violet-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-900" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-400/15 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 p-12 md:p-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span className="text-white text-xs font-bold uppercase tracking-widest">
                    Exclusive Member Benefits
                  </span>
                </div>
                <h2 className="font-black text-white text-3xl md:text-4xl mb-4 leading-tight">
                  Join the <span className="shimmer-bg">Curator's Circle</span>
                </h2>
                <p className="text-violet-200 text-base font-medium max-w-md mb-8 leading-relaxed">
                  Early event access, artist meet-and-greets, and 15% off all
                  workshop tickets — forever.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="group flex items-center gap-2 bg-white text-violet-700 px-8 py-3.5 rounded-2xl font-bold shadow-xl hover:-translate-y-0.5 transition-all">
                    Join Community{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-2xl font-bold hover:bg-white/20 transition-all">
                    Learn More
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  {[
                    "Early Bird Access",
                    "15% Discount",
                    "Exclusive Meet-ups",
                    "Priority Support",
                  ].map((perk) => (
                    <span
                      key={perk}
                      className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs font-semibold"
                    >
                      <span className="text-green-400">✓</span> {perk}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative z-10 flex-shrink-0 hidden md:block">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80",
                  ].map((src, i) => (
                    <img
                      key={i}
                      alt={`Community ${i + 1}`}
                      className={`w-36 h-36 object-cover rounded-3xl shadow-2xl hover:rotate-0 transition-transform duration-500 ${i % 2 === 0 ? (i === 0 ? "rotate-3" : "-rotate-2") : i === 1 ? "-rotate-3 mt-8" : "rotate-2 mt-8"}`}
                      src={src}
                    />
                  ))}
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl px-4 py-2 shadow-xl flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-violet-600" />
                  <span className="text-xs font-black text-slate-900">
                    50K+ Members
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
