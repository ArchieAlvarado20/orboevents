import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  CreditCard,
  QrCode,
  ScanLine,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  Clock,
  Globe,
  Smartphone,
  Bell,
  Signal,
  Wifi,
  Star,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  ChevronRight,
  Play,
  MapPin,
  Music,
  Coffee,
  Cpu,
  Heart,
  Ticket,
  BarChart3,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { FaBatteryHalf } from "react-icons/fa";
import axios from "axios";
import UserEventCard from "@/components/shared/usersPage/userEventCard";
import { Event } from "@/types/event";
import { Link } from "react-router-dom";
import { useScrollToSection } from "@/utils/scrollToSection";

/* ─────────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────────── */
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─────────────────────────────────────────────
   Intersection-observer hook (fires once)
───────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   Stat counter card
───────────────────────────────────────────── */
function StatCounter({
  value,
  suffix,
  label,
  icon: Icon,
  color,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  color: string;
  inView: boolean;
}) {
  const count = useCounter(value, 2200, inView);
  return (
    <div className="relative group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 ${color}`}
      />
      <div
        className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <p className="text-5xl font-black text-slate-900 mb-1">
        {count}
        {suffix}
      </p>
      <p className="text-slate-500 font-semibold text-sm">{label}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Flip card component
───────────────────────────────────────────── */
function FlipCard({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  return (
    <div className="group perspective-1000 h-72 cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden">
          {back}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Landing Page
───────────────────────────────────────────── */
const SmartTicketingLanding = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { scrollToSection } = useScrollToSection();
  const statsRef = useInView(0.3);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events`,
        );
        setEvents((res.data.events || []).slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  /* ── How It Works steps ── */
  const steps = [
    {
      step: "01",
      title: "Choose & Book",
      desc: "Browse curated events and pick your preferred spots effortlessly.",
      flipDesc:
        "Filter by date, category, location and more. Save favorites, set reminders, and get personalized recommendations based on your interests.",
      icon: Calendar,
      gradient: "from-violet-600 to-purple-700",
      lightBg: "bg-violet-50",
      textColor: "text-violet-600",
    },
    {
      step: "02",
      title: "Pay Securely",
      desc: "Use your preferred payment method with end-to-end encryption.",
      flipDesc:
        "Multiple payment options including UPI, cards, net banking, and wallets. Your transaction is protected with bank-grade 256-bit SSL encryption.",
      icon: CreditCard,
      gradient: "from-blue-600 to-cyan-600",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      step: "03",
      title: "Get QR Ticket",
      desc: "Instant digital ticket delivered straight to your wallet.",
      flipDesc:
        "Your encrypted QR ticket works offline, updates in real-time, and contains all event details. Add it to Apple Wallet or Google Pay instantly.",
      icon: QrCode,
      gradient: "from-indigo-600 to-violet-600",
      lightBg: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      step: "04",
      title: "Scan & Enter",
      desc: "Bypass the lines. Scan your phone at the gate and walk in.",
      flipDesc:
        "Sub-second QR scanning. Dynamic codes prevent duplication. VIP zone access, activity-based permissions — all managed in one place.",
      icon: ScanLine,
      gradient: "from-pink-600 to-rose-600",
      lightBg: "bg-pink-50",
      textColor: "text-pink-600",
    },
  ];

  /* ── Categories for flip-card grid ── */
  const categories = [
    {
      label: "Music & Concerts",
      count: "450+",
      icon: Music,
      img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
      gradient: "from-rose-900/80 via-pink-700/50 to-transparent",
      backGradient: "from-rose-600 to-pink-700",
      tags: ["Live Bands", "DJ Nights", "Concerts", "Open Mics"],
    },
    {
      label: "Tech & Business",
      count: "120+",
      icon: Cpu,
      img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
      gradient: "from-violet-900/80 via-indigo-700/50 to-transparent",
      backGradient: "from-violet-600 to-indigo-700",
      tags: ["Conferences", "Hackathons", "Meetups", "Workshops"],
    },
    {
      label: "Food & Drink",
      count: "85+",
      icon: Coffee,
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
      gradient: "from-amber-900/80 via-orange-700/50 to-transparent",
      backGradient: "from-amber-600 to-orange-600",
      tags: ["Food Fests", "Wine Tasting", "Pop-ups", "Culinary Tours"],
    },
    {
      label: "Sports & Fitness",
      count: "200+",
      icon: Activity,
      img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      gradient: "from-green-900/80 via-emerald-700/50 to-transparent",
      backGradient: "from-green-600 to-emerald-700",
      tags: ["Tournaments", "Marathons", "Yoga", "Fitness Classes"],
    },
  ];

  /* ── Testimonials ── */
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Event Enthusiast",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3Qo4A-062yU7THWeNPbSCX2QpWW-y_PgoDRkIW-BiFdOd3uqFhfQE0mJtLo1ZzS_ajHsljwAA3HBcot3ne2ySku0EU1GmI5QrPRtkIFRma1bolvEOr0gZRfR1dDQUMGONfA6_pkdhue8VmXH9nfhkYCSpNyzh4h_CysMFsh1BUsFRMGIeVsfspGnjRcX9F-EF9JUfc-6aDWh9NwO2qramQiP_Zb8UtEQZriEX9QpYVUHIo1UP-2UzL8WtLUaN5gwGJn17d9W9BE",
      text: "Orboevents completely changed how I experience local events. The QR ticket system is so smooth — I never have to worry about long entry queues anymore!",
      rating: 5,
      event: "Neon Nights Festival",
      gradient: "from-violet-600 to-purple-700",
    },
    {
      name: "Arjun Mehta",
      role: "Tech Conference Organizer",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB12Pzpazsp7mAM-9q-Z4--_6Ac9GxG7yasOzsiJzuSzvyDBSlRP0-ddQWqkTgH1o7iU1OXKsqavqKql5DMMFr3yqHaal6_WxfhWuKW5ILXGK-vvCuxTE1KC3QAuHt4p2iBt2J8pURQ3tqv8rzjCaeMdoLa75L1EOq_5lbP7OF2lwkIEZJqRV7ifAqbWvMCYxmnytwWmJw16ya1XRb43jidKq7GAB8Foy9tPAfRNMkG1XePMIpKlO_ktm0Tkh4gmHjAbbUjDUKe0Uo",
      text: "As an organizer, the real-time analytics and gate management tools are incredibly powerful. We managed 2,000 attendees without a single issue.",
      rating: 5,
      event: "Tech Innovators Summit 2025",
      gradient: "from-blue-600 to-cyan-700",
    },
    {
      name: "Sneha Patel",
      role: "Food Blogger",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCjBeU35tEZpuf7yK3iXD9O3kuE_zDwGTzUg3dWhrG7W62AlOLU5k6uY9bcpR7DSwGsLYRMcPoMYpvvBPwr8s27Ejt9N4dG5CdBkt9_la81eiHkfJjSthxdbzNqthKYUqdKoOP49qh39nAfh8ofcAFV7xHr0xipCBWxbZUt8CPpZOQaTvoY2dwHFpibwbtKA9sr06mIXzDUqP5U9s5vZt-bdwXSdxm22FkX-JthmiQ0VAjNtSNHU5gjFzxxEjs3aS2jLvCfXHsans",
      text: "I discovered three incredible food festivals through Orboevents that I would have completely missed otherwise. The recommendations are spot-on!",
      rating: 5,
      event: "Street Food Festival 2025",
      gradient: "from-orange-500 to-rose-600",
    },
  ];

  /* ── Platform Features ── */
  const features = [
    {
      icon: ShieldCheck,
      title: "Tamper-Proof QR Access",
      desc: "Dynamic encrypted QR codes regenerate every 30 seconds, making ticket fraud virtually impossible.",
      gradient: "from-violet-600 to-purple-700",
      stat: "99.9% secure",
    },
    {
      icon: Zap,
      title: "Lightning Fast Entry",
      desc: "Sub-second QR scanning ensures smooth crowd flow even at large-scale events with thousands of attendees.",
      gradient: "from-yellow-500 to-orange-600",
      stat: "<0.5s scan time",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      desc: "Live dashboards give organizers instant visibility into attendance, revenue, and activity-level data.",
      gradient: "from-blue-600 to-cyan-600",
      stat: "Live data",
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      desc: "Fully offline-capable tickets and cloud-synced validation — reliable even in low-connectivity venues.",
      gradient: "from-green-600 to-emerald-700",
      stat: "100% uptime",
    },
    {
      icon: Smartphone,
      title: "Wallet Integration",
      desc: "Add your ticket to Apple Wallet or Google Pay with one tap. Always accessible, always ready.",
      gradient: "from-pink-600 to-rose-600",
      stat: "iOS & Android",
    },
    {
      icon: Users,
      title: "Group Bookings",
      desc: "Book for teams, families, or corporate groups. Manage everyone's access from a single dashboard.",
      gradient: "from-indigo-600 to-violet-700",
      stat: "Up to 500 seats",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans text-slate-900 overflow-x-hidden">
      {/* ─── Inline Styles for Flip Animations ─── */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.3); }
          50% { box-shadow: 0 0 60px rgba(124,58,237,0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .float-phone { animation: float 5s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #7c3aed, #a855f7, #ec4899, #7c3aed);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .fade-in-up { animation: fadeInUp 0.7s ease forwards; }
        .section-title {
          background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-bg {
          background: radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(236,72,153,0.08) 0%, transparent 50%),
                      #f8f9ff;
        }
        .card-glass {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.5);
        }
        .grid-feature-card:hover .feature-icon {
          transform: scale(1.15) rotate(-5deg);
        }
        .feature-icon { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .step-card:hover { transform: translateY(-8px); }
        .step-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .step-card:hover { box-shadow: 0 30px 60px -15px rgba(124,58,237,0.2); }
        .category-card:hover { transform: scale(1.03); }
        .category-card { transition: transform 0.4s ease; }
        .testimonial-card:hover { transform: translateY(-6px); }
        .testimonial-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .testimonial-card:hover { box-shadow: 0 25px 50px -10px rgba(0,0,0,0.12); }
        .cta-gradient {
          background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 40%, #9333ea 70%, #c026d3 100%);
        }
        .bento-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -10px rgba(124,58,237,0.2); }
        .bento-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .partner-scroll {
          display: flex;
          gap: 3rem;
          animation: scroll-x 20s linear infinite;
        }
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .glow-pill {
          box-shadow: 0 0 20px rgba(124,58,237,0.25);
        }
      `}</style>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section
        id="home"
        className="hero-bg pt-32 pb-24 px-6 overflow-hidden min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div className="space-y-8 fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-md border border-violet-100 glow-pill">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-violet-700">
                Live — 12,000+ events this month
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-[1.05] tracking-tight">
              <span className="text-slate-900">Seamless</span>{" "}
              <span className="shimmer-text">Smart</span>
              <br />
              <span className="text-slate-900">Ticketing</span>
            </h1>

            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              Book in seconds. Enter with a scan. Experience events without
              friction — powered by encrypted QR technology and real-time cloud
              sync.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => scrollToSection("events")}
                className="group px-10 py-4 bg-violet-600 text-white font-bold rounded-2xl shadow-2xl shadow-violet-600/30 hover:bg-violet-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Book Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/events"
                className="px-10 py-4 text-center bg-white border-2 border-violet-200 text-violet-700 font-bold rounded-2xl hover:bg-violet-50 hover:border-violet-400 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" /> Explore Events
              </Link>
            </div>

            {/* Social proof row */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3Qo4A-062yU7THWeNPbSCX2QpWW-y_PgoDRkIW-BiFdOd3uqFhfQE0mJtLo1ZzS_ajHsljwAA3HBcot3ne2ySku0EU1GmI5QrPRtkIFRma1bolvEOr0gZRfR1dDQUMGONfA6_pkdhue8VmXH9nfhkYCSpNyzh4h_CysMFsh1BUsFRMGIeVsfspGnjRcX9F-EF9JUfc-6aDWh9NwO2qramQiP_Zb8UtEQZriEX9QpYVUHIo1UP-2UzL8WtLUaN5gwGJn17d9W9BE",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuB12Pzpazsp7mAM-9q-Z4--_6Ac9GxG7yasOzsiJzuSzvyDBSlRP0-ddQWqkTgH1o7iU1OXKsqavqKql5DMMFr3yqHaal6_WxfhWuKW5ILXGK-vvCuxTE1KC3QAuHt4p2iBt2J8pURQ3tqv8rzjCaeMdoLa75L1EOq_5lbP7OF2lwkIEZJqRV7ifAqbWvMCYxmnytwWmJw16ya1XRb43jidKq7GAB8Foy9tPAfRNMkG1XePMIpKlO_ktm0Tkh4gmHjAbbUjDUKe0Uo",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBCjBeU35tEZpuf7yK3iXD9O3kuE_zDwGTzUg3dWhrG7W62AlOLU5k6uY9bcpR7DSwGsLYRMcPoMYpvvBPwr8s27Ejt9N4dG5CdBkt9_la81eiHkfJjSthxdbzNqthKYUqdKoOP49qh39nAfh8ofcAFV7xHr0xipCBWxbZUt8CPpZOQaTvoY2dwHFpibwbtKA9sr06mIXzDUqP5U9s5vZt-bdwXSdxm22FkX-JthmiQ0VAjNtSNHU5gjFzxxEjs3aS2jLvCfXHsans",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm font-bold text-slate-700">
                  50,000+ happy attendees
                </p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-sm font-bold text-slate-500">
                <span className="text-slate-900">₹ 2Cr+</span> in tickets sold
              </div>
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="relative flex justify-center">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-400/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-400/15 blur-[100px] rounded-full pointer-events-none" />

            {/* Floating badges */}
            <div className="absolute -left-6 top-20 card-glass px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-20 hidden lg:flex">
              <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">
                  Ticket Verified
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Gate A — Admitted
                </p>
              </div>
            </div>

            <div className="absolute -right-4 bottom-28 card-glass px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-20 hidden lg:flex">
              <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">
                  Trending Now
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  +230 booked today
                </p>
              </div>
            </div>

            {/* Phone frame */}
            <div className="relative mx-auto w-72 h-[580px] bg-slate-900 rounded-[52px] p-3 shadow-[0_60px_120px_-20px_rgba(124,58,237,0.35)] border-[7px] border-slate-800 float-phone pulse-glow z-10 rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-900 rounded-b-3xl z-50 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-800 rounded-full" />
              </div>

              <div className="w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col relative">
                {/* Status Bar */}
                <div className="px-7 pt-5 pb-2 flex justify-between items-center bg-white">
                  <span className="text-xs font-bold text-slate-900">
                    9:41 AM
                  </span>
                  <div className="flex gap-1.5 items-center">
                    <Signal className="w-3 h-3 text-slate-900" />
                    <Wifi className="w-3 h-3 text-slate-900" />
                    <FaBatteryHalf className="w-4 h-4 text-slate-900" />
                  </div>
                </div>

                {/* Screen content */}
                <div className="flex-1 flex flex-col items-center justify-center px-5 gap-6">
                  {/* Brand */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-transparent rounded-md flex items-center justify-center">
                      <Logo />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-[#003B71]">
                      orbo<span className="text-[#F58220]">events</span>
                    </span>
                  </div>

                  {/* QR */}
                  <div className="w-full aspect-square bg-gradient-to-br from-slate-50 to-violet-50 border-2 border-dashed border-violet-200 rounded-[36px] p-7 flex flex-col items-center justify-center relative group/qr overflow-hidden">
                    <div className="absolute inset-0 bg-violet-600/5 opacity-0 group-hover/qr:opacity-100 transition-opacity rounded-[36px]" />
                    <QrCode className="w-full h-full text-slate-900 relative z-10" />
                    {/* Scanning line animation */}
                    <div className="absolute left-6 right-6 h-0.5 bg-violet-500/60 top-1/2 animate-ping" />
                  </div>

                  {/* Verified badge */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-full shadow-lg shadow-violet-600/25">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">
                        Verified Ticket
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-900">
                        Ready to Scan
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                        Access Granted
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="p-5 border-t border-slate-50 bg-slate-50/50">
                  <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-violet-100 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                          Gate Access
                        </p>
                        <p className="text-xs font-bold text-slate-900">
                          Zone A • Main Entrance
                        </p>
                      </div>
                    </div>
                    <Smartphone className="w-4 h-4 text-violet-300" />
                  </div>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-white" ref={statsRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter
              value={50}
              suffix="K+"
              label="Happy Attendees"
              icon={Users}
              color="bg-violet-600"
              inView={statsRef.inView}
            />
            <StatCounter
              value={1200}
              suffix="+"
              label="Events Hosted"
              icon={Calendar}
              color="bg-pink-600"
              inView={statsRef.inView}
            />
            <StatCounter
              value={98}
              suffix="%"
              label="Satisfaction Rate"
              icon={Star}
              color="bg-amber-500"
              inView={statsRef.inView}
            />
            <StatCounter
              value={200}
              suffix="+"
              label="Cities Covered"
              icon={Globe}
              color="bg-emerald-600"
              inView={statsRef.inView}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CATEGORIES — FLIP CARD GRID
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#f0f2ff]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">
                Browse Categories
              </span>
              <h2 className="text-4xl md:text-5xl font-black section-title leading-tight">
                Find Your
                <br />
                Perfect Experience
              </h2>
            </div>
            <Link
              to="/category"
              className="group flex items-center gap-2 text-violet-600 font-bold hover:gap-3 transition-all"
            >
              All Categories{" "}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Flip card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <FlipCard
                key={i}
                front={
                  <div className="w-full h-full relative category-card overflow-hidden rounded-3xl">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`}
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="bg-white/20 backdrop-blur-md w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                        <cat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white/70 text-xs font-bold mb-1">
                        {cat.count} Events
                      </span>
                      <h3 className="text-white font-black text-xl leading-tight">
                        {cat.label}
                      </h3>
                      <p className="text-white/60 text-xs mt-2">
                        Hover to explore →
                      </p>
                    </div>
                  </div>
                }
                back={
                  <div
                    className={`w-full h-full bg-gradient-to-br ${cat.backGradient} rounded-3xl p-6 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                        <cat.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-black text-2xl mb-2">
                        {cat.label}
                      </h3>
                      <p className="text-white/80 text-sm font-medium mb-4">
                        {cat.count} events available
                      </p>
                    </div>
                    <div className="space-y-2">
                      {cat.tags.map((tag, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 text-white/90 text-sm font-semibold"
                        >
                          <CheckCircle2 className="w-4 h-4 text-white/70 shrink-0" />
                          {tag}
                        </div>
                      ))}
                    </div>
                    <Link to="/category">
                      <button className="mt-4 w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold rounded-2xl transition-colors text-sm">
                        Browse {cat.label}
                      </button>
                    </Link>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — STEP CARDS WITH FLIP BACK
      ═══════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl font-black section-title mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
              Getting into your favourite events has never been this easy. Hover
              over each step to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group perspective-1000 h-64 cursor-pointer"
              >
                <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="h-full p-7 rounded-3xl border border-slate-100 bg-slate-50/60 hover:shadow-xl step-card flex flex-col justify-between">
                      <div>
                        <span className="text-6xl font-black text-slate-100 absolute top-4 right-6 select-none">
                          {step.step}
                        </span>
                        <div
                          className={`${step.lightBg} ${step.textColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-5 feature-icon`}
                        >
                          <step.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-black mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                      <p className="text-xs text-slate-400 font-semibold mt-3">
                        Hover to learn more →
                      </p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div
                      className={`h-full p-7 rounded-3xl bg-gradient-to-br ${step.gradient} flex flex-col justify-between`}
                    >
                      <div>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-white/85 text-sm font-medium leading-relaxed">
                          {step.flipDesc}
                        </p>
                      </div>
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                        Step {step.step}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          UPCOMING EVENTS
      ═══════════════════════════════════════════ */}
      <section id="events" className="py-24 px-6 bg-[#f0f2ff]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">
                Don't Miss Out
              </span>
              <h2 className="text-4xl md:text-5xl font-black section-title">
                Upcoming Live
                <br />
                Experiences
              </h2>
              <p className="text-slate-500 font-medium mt-3">
                Find your next adventure from our community's top events.
              </p>
            </div>
            <Link to="/events">
              <button className="flex items-center gap-2 px-7 py-3.5 bg-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-violet-600/25 hover:bg-violet-700 hover:-translate-y-0.5 transition-all">
                View All Events <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event) => (
              <UserEventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PLATFORM FEATURES — 3×2 BENTO GRID
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">
              Platform Features
            </span>
            <h2 className="text-4xl md:text-5xl font-black section-title mb-4">
              Why Choose Orboevents?
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
              We connect millions of event-goers with incredible experiences
              every day, powered by cutting-edge technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="group grid-feature-card bento-card bg-slate-50 hover:bg-white border border-slate-100 rounded-3xl p-8 flex flex-col gap-5 cursor-default"
              >
                <div
                  className={`feature-icon w-14 h-14 bg-gradient-to-br ${feat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <feat.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-black text-lg text-slate-900">
                      {feat.title}
                    </h4>
                    <span className="text-xs font-black text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
                      {feat.stat}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — FLIP CARDS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#f0f2ff]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">
              Social Proof
            </span>
            <h2 className="text-4xl md:text-5xl font-black section-title mb-4">
              Loved by Event-Goers
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Hover over the cards to read full testimonials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FlipCard
                key={i}
                front={
                  <div className="w-full h-full bg-white rounded-3xl p-8 flex flex-col justify-between border border-slate-100 testimonial-card">
                    <div>
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(t.rating)].map((_, j) => (
                          <Star
                            key={j}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed text-sm line-clamp-4">
                        "{t.text}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                      <img
                        src={t.avatar}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-black text-sm text-slate-900">
                          {t.name}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div
                    className={`w-full h-full bg-gradient-to-br ${t.gradient} rounded-3xl p-8 flex flex-col justify-between`}
                  >
                    <div>
                      <Award className="w-8 h-8 text-white/70 mb-4" />
                      <p className="text-white font-medium leading-relaxed text-sm">
                        "{t.text}"
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-black">{t.name}</p>
                      <p className="text-white/70 text-xs font-semibold">
                        {t.event}
                      </p>
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT / QR TRUST SECTION
      ═══════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-24 px-6 bg-slate-900 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-400 mb-3 inline-block">
                Why Orboevents
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                The preferred choice for{" "}
                <span className="shimmer-text">smart events</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Clock,
                  title: "No long queues",
                  desc: "Average entry time reduced by 70% with QR scanning.",
                },
                {
                  icon: Smartphone,
                  title: "Digital tickets",
                  desc: "Eco-friendly, never lost, always in your pocket.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure validation",
                  desc: "Anti-spoofing technology active on every scan.",
                },
                {
                  icon: Zap,
                  title: "Easy upgrades",
                  desc: "Upgrade seats or zones in one tap, anytime.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-violet-600 transition-colors">
                    <item.icon className="w-5 h-5 text-violet-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-black text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/events">
              <button className="group flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl shadow-xl shadow-violet-600/25 hover:bg-violet-700 hover:-translate-y-0.5 transition-all">
                Start Exploring{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* QR Visual */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-violet-600/10 rounded-full blur-3xl" />
            <div className="relative w-80 h-96 bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-slate-900 gap-8 shadow-[0_0_80px_rgba(124,58,237,0.3)]">
              <div className="w-48 h-48 border-4 border-slate-100 rounded-[32px] p-4 relative">
                <QrCode className="w-full h-full text-slate-900" />
                <div className="absolute inset-0 border-2 border-violet-500/30 rounded-[32px] animate-ping" />
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-700 text-xs font-bold">
                    Live & Encrypted
                  </span>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-violet-600">
                  Scan for Access
                </p>
                <p className="text-[10px] text-slate-400 font-bold">
                  ORBOEVENTS SECURE SYSTEM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA BANNER
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative cta-gradient rounded-[48px] overflow-hidden p-16 text-center shadow-2xl shadow-violet-900/30">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">
                  Join 50,000+ event-goers
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Ready to Experience
                <br />
                <span className="text-yellow-300">Seamless Events?</span>
              </h2>
              <p className="text-white/80 text-lg font-medium mb-10 max-w-xl mx-auto">
                Say goodbye to paper tickets, long queues, and event anxiety.
                Join the future of event access today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/events">
                  <button className="group px-10 py-4 bg-white text-violet-700 font-black rounded-2xl shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                    Browse Events{" "}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="px-10 py-4 bg-white/15 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-white/25 transition-all"
                >
                  How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartTicketingLanding;
