import Topbar from "@/components/shared/usersPage/topbar";
import UserEventCard2 from "@/components/shared/usersPage/userEventCard2";
import axios from "axios";
import { ChevronLeft, ChevronRight, Filter, SwatchBook } from "lucide-react";
import { useEffect, useState } from "react";
import { Music, FlaskConical } from "lucide-react";
import UserFooter from "@/components/shared/usersPage/userFooter";

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/event`,
        );

        setEvents(res.data.events || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);
  return (
    <>
      <Topbar active="events" />
      <main className="pt-24 pb-20 flex-grow mt-5">
        {/* <!-- Hero Section --> */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="relative rounded-[2rem] overflow-hidden h-[320px] flex items-center p-12 group">
            <img
              alt="Art &amp; Culture"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiXHFQ8-N_kqnHo42KDjJpPe7J7Vdhsqi6xBgss6k5Rd5p2DHm0uZ9aQ_Cz-YloaiZpE-7_HzgUDw4BLbKnhHACB3OUTQ3fZK6YkHyNSoMUnCUpORgAYm2PnzDnkItwTisVbRoSB2JDH2k3Haak1JC7EpByh5_EawmTwtFH5nLduNpZ5j7A-LaPmQEc9LkgdsTcKmbG1hVAFHz0RR966zh2GeZkXrCPbtwVPH2DUtgtd7KdZtY6lyYQqbrBxRnKiTxhdqdvvy9RUs"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"></div>
            <div className="relative z-10 max-w-2xl">
              <nav className="flex items-center gap-2 text-white/70 font-semibold text-sm mb-4">
                <span>Explore</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Art &amp; Culture</span>
              </nav>
              <h1 className="text-white font-headline text-5xl font-extrabold mb-4">
                Art &amp; Culture
              </h1>
              <p className="text-white/80 text-lg">
                Immerse yourself in creativity. Discover local exhibitions,
                heritage tours, and cultural dialogues happening this month.
              </p>
            </div>
          </div>
        </section>
        {/* <!-- Filters & Sort --> */}
        <section className="max-w-7xl mx-auto px-6 mb-2">
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
            <div className="flex items-center gap-3">
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
          <div className="mt-20 flex items-center justify-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-violet-600 text-white rounded-lg font-semibold text-sm">
              1
            </button>
            <button className="w-10 h-10 border border-gray-200 text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="w-10 h-10 border border-gray-200 text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
              3
            </button>
            <span className="mx-1 text-gray-400">...</span>
            <button className="w-10 h-10 border border-gray-200 text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
              8
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
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
      {/* <!-- Footer --> */}
      <UserFooter />
    </>
  );
}
