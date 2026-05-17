import Topbar from "@/components/shared/usersPage/topbar";
import UserEventCard2 from "@/components/shared/usersPage/userEventCard2";
import axios from "axios";
import { ChevronLeft, ChevronRight, Filter, SwatchBook } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Music, FlaskConical } from "lucide-react";
import UserFooter from "@/components/shared/usersPage/userFooter";
import { getPagination } from "@/lib/pagination";
import BackButton from "@/components/shared/BackButton";
import EventCarousel from "@/components/shared/usersPage/EventCarousel";

interface Event {
  _id: string;
  name?: string;
  date: string;
  location: string;
  image?: string;
  status?: "active" | "pending" | "completed";
  description: string;
  price?: number;
}

export default function UserEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categoryOptions = [
    { label: "Sports & Travel", value: "sports", icon: Music },
    { label: "Science & Research", value: "science", icon: FlaskConical },
    { label: "New Years Eve", value: "newyear", icon: Music },
    {
      label: "Industrial Engineering",
      value: "engineering",
      icon: FlaskConical,
    },
    { label: "Holi", value: "holi", icon: Music },
    { label: "Health & Wellness", value: "health", icon: FlaskConical },
    { label: "Garbe", value: "garbe", icon: Music },
    { label: "Public Event", value: "public", icon: Music },
  ];

  const handlePageClick = (p: number, index: number) => {
    setPage(p);

    // window.scrollTo({
    //   top: 50,
    //   behavior: "smooth",
    // });

    pageRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    pageRefs.current[index]?.focus();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events?page=${page}`,
        );

        setEvents(res.data.events || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, [page]);

  setTimeout(() => {
    const el = document.getElementById("top");

    if (el) {
      el.scrollIntoView({
        block: "center",
      });
    }
  }, 50);

  return (
    <>
      <main className="pt-24 pb-20 grow">
        {/* <!-- Hero Section --> */}
        <section className="max-w-7xl mx-auto sm:px-6 mb-12" id="top">
          <EventCarousel
            images={[
              "https://picsum.photos/800/400?1",
              "https://picsum.photos/800/400?2",
              "https://picsum.photos/800/400?3",
            ]}
          />
        </section>
        {/* <!-- Filters & Sort --> */}
        <section className="hidden max-w-7xl mx-auto px-6 mb-2">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categoryOptions.map((cat, index) => {
                return (
                  <button
                    key={cat.value}
                    className={`px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap shadow-lg shadow-violet-600/20 ${index === 0 ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-200" : "text-slate-500 dark:text-slate-400 hover:bg-violet-50"}`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
            <div className="hidden flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl font-semibold text-sm text-gray-900 hover:shadow-sm transition-all">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl font-semibold text-sm text-gray-900 hover:shadow-sm transition-all">
                <SwatchBook className="w-4 h-4" />
                Sort: Popular
              </button>
            </div>
          </div>
        </section>
        {/* <!-- Event Grid --> */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* <!-- Event Card --> */}
            {events?.map((event) => (
              <UserEventCard2 key={event._id} event={event} />
            ))}
          </div>
          {/* <!-- Pagination --> */}
          <div className="flex items-center overflow-x-auto gap-2 mt-6 flex-wrap justify-center">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="p-2 border font-extrabold border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-slate-200"
            >
              {"<<"}
            </button>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="p-2 border font-extrabold border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-slate-200"
            >
              {"<"}
            </button>
            {/* Pages */}
            {getPagination(page, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={i} className="px-2 text-slate-500">
                  ...
                </span>
              ) : (
                <button
                  ref={(el) => {
                    pageRefs.current[i] = el;
                  }}
                  key={i}
                  onClick={() => handlePageClick(p, i)}
                  className={`px-3 py-1 rounded transition-all ${
                    page === p
                      ? "bg-violet-600 text-white"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-slate-200 rounded disabled:opacity-50p-2 border font-extrabold border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-slate-200"
            >
              {">"}
            </button>

            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="p-2 border font-extrabold border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-slate-200"
            >
              {">>"}
            </button>
          </div>
        </section>
        {/* <!-- Community Callout --> */}
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <div className="bg-violet-600 rounded-[40px] p-20 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fc79bd]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10 flex-1">
              <h2 className="font-headline font-extrabold text-white text-3xl mb-4">
                Join the Curator's Circle
              </h2>
              <p className="text-violet-100 text-lg max-w-lg mb-8">
                Get early access to gallery openings, exclusive meet-and-greets
                with artists, and 15% off all workshop tickets.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-violet-600 px-8 py-3 rounded-full font-bold text-md shadow-xl hover:shadow-white/20 transition-all hover:scale-105 active:scale-95">
                  Join Community
                </button>
                <button className="bg-transparent text-white border-2 border-white/30 px-8 py-3 rounded-full font-bold text-md hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative z-10 flex-1 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <img
                  alt="Community 1"
                  className="w-32 h-32 object-cover rounded-2xl rotate-3 shadow-2xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzb1j6s8osFZrTT_n2xMtHEMDbaGAChifYUx2auckxRGafSPXJKPTfEV1N7n5ereeD_I35HD-FdzvDQ9-SioQImvTX6YLCxoFQYXwaT0j_Js67dS5_D6XrL6T2IYBFxIplZUeDj4pgZIzIekPRi72WFHbUaOolrUBXAyymot1-Oolg6LXEPpwPtlV8Ja8rFH8-QhQ2K6VGCdMYm5dlzmNVmV0jlnQtPv55-S-f-tpTYIKH0xOHiU02Ea4RdKJzLgZaPdGWkttxcYE"
                />
                <img
                  alt="Community 2"
                  className="w-32 h-32 object-cover rounded-2xl -rotate-3 shadow-2xl mt-8"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqBJqeOXQakSayg6HbGvWxbF8oMGH4sIBIeEPGWmoGnCG69IVJsGcSVToPb23CZbVD3B0-c0h1syiy9HRlXnn4fBDPqPq194ezHL3RmGIx-NIFS4nrGebPW0UWz_zD86CpCk11DnFQcoKDvNV71cRlN0XorEgp3fyInOWHx0atyzmqIoRXiszPWUUJoPqfjBf9YYsjn5q4tgMSHqpyxrSLiUOe4Fz9atWxCAFzyxow2E5XekHA68uxQWr7YQeD0fS9axaKisqN-wU"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
