import TicketModal from "@/components/features/tickets/QRModal";
import { Event } from "@/types/event";
import { formatTime } from "@/utils/timeLongFormat";
import axios from "axios";
import {
  CheckCircle,
  Download,
  DownloadCloud,
  FilterIcon,
  MapPin,
  MapPinMinus,
  MoreVertical,
  Pin,
  QrCode,
  Share,
  TimerIcon,
  Wallet2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Ticket {
  _id: string;
  code: string;
  status: "active" | "used";

  userId?: {
    _id: string;
    name: string;
    email: string;
  };

  eventId?: {
    _id: string;
    name: string;
    date: string;
    location: string;
    image?: string;
    startTime: string;
  };

  ticketTypeId?: {
    _id: string;
    name: string;
    price: number;
  };

  transactionId?: string;

  createdAt?: string;
  updatedAt?: string;
}

export default function Transaction() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const handleShowTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/tickets/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setTickets(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const activeTickets = tickets.filter((t) => t.status === "active");

  const count = activeTickets.length;

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-12 mt-18">
        {/* <!-- Dashboard Header & Tabs --> */}
        <div className="mb-12">
          <h1 className="font-headline-lg text-4xl lg:text-5xl text-[#121c2a] mb-6">
            My Tickets
          </h1>
          <div className="flex gap-4 border-b border-slate-200">
            <button className="px-6 py-4 font-bold text-violet-600 border-b-2 border-violet-600 transition-all">
              Active Tickets
            </button>
            <button className="px-6 py-4 font-semibold text-slate-500 hover:text-violet-600 transition-all">
              Order History
            </button>
          </div>
        </div>

        {/* <!-- Active Tickets Section --> */}
        <section className="mb-20 ">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#121c2a]">
              Upcoming Events
            </h2>
            <span className="text-sm font-bold text-violet-600 bg-violet-100 px-3 py-1 rounded-full">
              {count} Active
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* <!-- Main Featured Ticket --> */}
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="lg:col-span-7 group relative overflow-hidden rounded-[32px] bg-white shadow-[0_10px_40px_rgba(124,58,237,0.06)] border border-violet-100/50 flex flex-col md:flex-row"
              >
                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                  <img src={ticket.eventId?.image} />
                  <div className="absolute top-4 left-4 bg-violet-600 border border-violet-600 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                    <p className="font-bold text-white  border-violet-600 text-center leading-tight text-sm">
                      {new Date(ticket.eventId.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        },
                      )}
                      <br />
                    </p>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Music Festival
                      </span>
                      <MoreVertical />
                    </div>
                    <h3 className="text-3xl font-bold mb-2"></h3>
                    <div className="flex flex-col gap-2 text-slate-500 mb-6">
                      <div className="flex items-center gap-2">
                        <TimerIcon />
                        <span className="text-sm">
                          Starts at {formatTime(ticket.eventId?.startTime)} •
                          Main Stage
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin />
                        <span className="text-sm">
                          {ticket.eventId?.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleShowTicket(ticket)}
                      className="flex-1 bg-violet-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-violet-700 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <QrCode />
                      Show Ticket
                    </button>
                    <button className="p-3 border-2 border-violet-100 text-violet-600 rounded-xl hover:bg-violet-50 active:scale-95 transition-all">
                      <DownloadCloud />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <TicketModal
              open={open}
              onClose={() => setOpen(false)}
              ticket={selectedTicket}
            />
          </div>
        </section>

        <section className="bg-slate-50 p-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#121c2a]">Recent Events</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
                <FilterIcon size={24} />
                Filter
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
                <Download size={24} />
                Export
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <!-- History Item 1 --> */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 hover:bg-white hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    alt="Summer Jazz Night"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-alt="Outdoor evening jazz concert with warm string lights and a cozy atmosphere"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBXNCeA1TpSwdLtWXXxZ8a_vplOAtm9IQqQwOOg8GLaQwx6kzvKcnqbRieqODWQWft9JPIiJctHnN-dRGrze1AJCe3g-pLoDQvfCo1SjS8c1kyDOyf6_efc00NAyV-qMPFeNQIuf-XApkbQ-KvXPbZWbvgc2qestw-SRSyuwz2yymn65TubsHf4BDEQjChbEqpdmCk27lgXI4axBGig9ehPpKsDs0K7kCJU5TVm6b7Gaz3BrytxwfqePVk9fQOUORR2ZxSfRX_9ZA"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-label-md text-on-surface truncate">
                    Summer Jazz Night
                  </h5>
                  <p className="text-xs text-on-surface-variant mb-2">
                    Aug 12, 2024
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle />
                    Completed
                  </span>
                </div>
                <button className="p-2 font-extrabold text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  {">"}
                </button>
              </div>
            </div>
            {/* <!-- History Item 2 --> */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 hover:bg-white hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    alt="UX/UI Design Workshop"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-alt="High-angle shot of people working on design wireframes on a bright table in a modern office"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVirI0g11rIvI9MQEkNsSsvMzRaiRbMNm2lBtog9NsXw4T3KLvJD6Wki69yCCgeitIyJlCI6K1Fbx4SnUxg7l_nDbmcVAN0oPSl3JgbMMLYXFCLRmZ2G9XyGlw5JA9daMFAW2_L_pF85UMd0HIVNyph7XbdOZB23w4JR8ekhbANxCZ9Z7vB8heIT99bp6CdxesJpezJQhmOxYN4vIM0vwlrkeKAv_M1UNMeSCK1VrrignuJdZTbbHwyKB91gNJYwTHRwl4ow-c2_c"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-label-md text-on-surface truncate">
                    UX/UI Design Workshop
                  </h5>
                  <p className="text-xs text-on-surface-variant mb-2">
                    July 28, 2024
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle />
                    Completed
                  </span>
                </div>
                <button className="p-2 font-extrabold text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  {">"}
                </button>
              </div>
            </div>
            {/* <!-- History Item 3 --> */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/50 hover:bg-white hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    alt="Rhythm &amp; Brews"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-alt="A blurry, atmospheric shot of a music club with glowing blue and purple stage lights"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9I7ftJYGcIgd8PgeyCdw0nZOut1x0Jc5ZXAZJRjolRL4AtwqRqOHx17O_YyLH80YTxFfCLRFMKuvjzNkPmilkZS7bcMhi6nAiVJUp8_9sA1V2tSxuDBWGFcLGl4rvfAluRUPtN20lOEu7tP7pdF4b8ElQ8LJi3q2cRSN98Mg6Q1OaDxjtS2gb8dOFolD24uiqVtKUYE4KXJTl3o7cm5N2RtqWmF13KqUwwYBYrVAYNXaFbcm48mnsd7W-G9YL18Qv0pnKQh8Y0RQ"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-label-md text-on-surface truncate">
                    Rhythm &amp; Brews
                  </h5>
                  <p className="text-xs text-on-surface-variant mb-2">
                    June 05, 2024
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle />
                    Completed
                  </span>
                </div>
                <button className="p-2 font-extrabold text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Comprehensive Order History Table Section --> */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#121c2a]">
              Full Order History
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
                <FilterIcon size={24} />
                Filter
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
                <Download size={24} />
                Export
              </button>
            </div>
          </div>
          <div className="bg-white rounded-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Event Name
                    </th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* <!-- Order 1 --> */}
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                          <img
                            alt="Summer Jazz"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBXNCeA1TpSwdLtWXXxZ8a_vplOAtm9IQqQwOOg8GLaQwx6kzvKcnqbRieqODWQWft9JPIiJctHnN-dRGrze1AJCe3g-pLoDQvfCo1SjS8c1kyDOyf6_efc00NAyV-qMPFeNQIuf-XApkbQ-KvXPbZWbvgc2qestw-SRSyuwz2yymn65TubsHf4BDEQjChbEqpdmCk27lgXI4axBGig9ehPpKsDs0K7kCJU5TVm6b7Gaz3BrytxwfqePVk9fQOUORR2ZxSfRX_9ZA"
                          />
                        </div>
                        <span className="font-bold text-slate-900">
                          Summer Jazz Night
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium text-sm">
                      Aug 12, 2024
                    </td>
                    <td className="px-8 py-6 font-mono text-xs text-slate-500">
                      #ORD-2024-8841
                    </td>
                    <td className="px-8 py-6 text-slate-900 font-bold">
                      $45.00
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>{" "}
                        Completed
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-violet-600 font-bold text-sm hover:underline">
                        Details
                      </button>
                    </td>
                  </tr>
                  {/* <!-- Order 2 --> */}
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                          <img
                            alt="UX Workshop"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVirI0g11rIvI9MQEkNsSsvMzRaiRbMNm2lBtog9NsXw4T3KLvJD6Wki69yCCgeitIyJlCI6K1Fbx4SnUxg7l_nDbmcVAN0oPSl3JgbMMLYXFCLRmZ2G9XyGlw5JA9daMFAW2_L_pF85UMd0HIVNyph7XbdOZB23w4JR8ekhbANxCZ9Z7vB8heIT99bp6CdxesJpezJQhmOxYN4vIM0vwlrkeKAv_M1UNMeSCK1VrrignuJdZTbbHwyKB91gNJYwTHRwl4ow-c2_c"
                          />
                        </div>
                        <span className="font-bold text-slate-900">
                          UX/UI Design Workshop
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium text-sm">
                      July 28, 2024
                    </td>
                    <td className="px-8 py-6 font-mono text-xs text-slate-500">
                      #ORD-2024-7729
                    </td>
                    <td className="px-8 py-6 text-slate-900 font-bold">
                      $120.00
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>{" "}
                        Completed
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-violet-600 font-bold text-sm hover:underline">
                        Details
                      </button>
                    </td>
                  </tr>
                  {/* <!-- Order 3 --> */}
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                          <img
                            alt="Rhythm"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9I7ftJYGcIgd8PgeyCdw0nZOut1x0Jc5ZXAZJRjolRL4AtwqRqOHx17O_YyLH80YTxFfCLRFMKuvjzNkPmilkZS7bcMhi6nAiVJUp8_9sA1V2tSxuDBWGFcLGl4rvfAluRUPtN20lOEu7tP7pdF4b8ElQ8LJi3q2cRSN98Mg6Q1OaDxjtS2gb8dOFolD24uiqVtKUYE4KXJTl3o7cm5N2RtqWmF13KqUwwYBYrVAYNXaFbcm48mnsd7W-G9YL18Qv0pnKQh8Y0RQ"
                          />
                        </div>
                        <span className="font-bold text-slate-900">
                          Rhythm &amp; Brews
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium text-sm">
                      June 05, 2024
                    </td>
                    <td className="px-8 py-6 font-mono text-xs text-slate-500">
                      #ORD-2024-5510
                    </td>
                    <td className="px-8 py-6 text-slate-900 font-bold">
                      $30.00
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>{" "}
                        Cancelled
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-violet-600 font-bold text-sm hover:underline">
                        Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <p className="text-sm text-slate-500">Showing 3 of 12 orders</p>
              <div className="flex gap-2">
                <button className="p-2 border font-extrabold border-slate-200 rounded-lg bg-white disabled:opacity-50">
                  {"<"}
                </button>
                <button className="p-2 border font-extrabold border-slate-200 rounded-lg bg-white">
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
