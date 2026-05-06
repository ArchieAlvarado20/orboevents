import React, { useEffect, useState } from "react";
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
  Menu,
  X,
  Clock,
  Globe,
  Smartphone,
  Bell,
  Signal,
  Wifi,
  Battery,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { FaBatteryHalf } from "react-icons/fa";
import axios from "axios";
import UserEventCard from "@/components/shared/usersPage/userEventCard";
import { Event } from "@/types/event";
import { Link } from "react-router-dom";
import { useScrollToSection } from "@/utils/scrollToSection";

const SmartTicketingLanding = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { scrollToSection } = useScrollToSection();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events`,
        );

        const events = res.data.events || [];
        setEvents(events.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const steps = [
    {
      title: "Choose & Book",
      desc: "Browse curated events and pick your preferred spots effortlessly.",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Pay Securely",
      desc: "Use your preferred payment method with end-to-end encryption.",
      icon: CreditCard,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Get QR Ticket",
      desc: "Instant digital ticket delivery directly to your smart wallet.",
      icon: QrCode,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Scan & Enter",
      desc: "Bypass the lines. Just scan your phone at the gate and walk in.",
      icon: ScanLine,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  const eventsHidden = [
    {
      name: "Neon Nights Festival",
      date: "AUG 24, 2024",
      price: "$49",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
      activities: [
        "Live DJ Performances",
        "Interactive Light Zones",
        "Food & Beverage Access",
      ],
    },
    {
      name: "Tech Innovators Meetup",
      date: "SEP 12, 2024",
      price: "Free",
      img: "https://images.unsplash.com/photo-1540575861501-7ce0e220beff?auto=format&fit=crop&q=80&w=800",
      activities: ["Networking Lounge", "Keynote Sessions", "Startup Demos"],
    },
    {
      name: "City Tennis Finals",
      date: "OCT 05, 2024",
      price: "$25",
      img: "https://images.unsplash.com/photo-1595435064212-3626378d336d?auto=format&fit=crop&q=80&w=800",
      activities: [
        "Grandstand Seating",
        "Merchandise Store",
        "VIP Lounge Access",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans text-slate-900 overflow-x-hidden">
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-black  uppercase tracking-widest">
              <QrCode className="w-3 h-3" />
              Book, Scan & Enter — Seamless
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight">
              Seamless <span className="text-violet-600">Smart</span> Ticketing
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              Quick booking. Secure QR access. Hassle-free entry. The future of
              event management is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection("events")}
                className="px-10 py-3 bg-violet-600 text-white font-bold rounded-[10px] shadow-2xl shadow-violet-600/30 hover:bg-violet-700 transition-all hover:-translate-y-1"
              >
                Book Now
              </button>

              <Link to="/events">
                <button className="px-10 py-3 bg-white border-2 border-violet-100 text-violet-600 font-bold rounded-[10px] hover:bg-violet-50 transition-all">
                  Explore Events
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-violet-400/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-400/20 blur-[100px] rounded-full" />

            {/* Smartphone Mockup Frame */}
            <div className="relative  mx-auto w-80 h-[640px] bg-slate-900 rounded-[55px] p-3 shadow-[0_50px_100px_-20px_rgba(124,58,237,0.25)] border-[8px] border-slate-800 rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-900 rounded-b-3xl z-50 flex items-center justify-center">
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Screen Content */}
              <div className="w-full h-full bg-white rounded-[42px] overflow-hidden flex flex-col relative">
                {/* Status Bar */}
                <div className="px-8 pt-6 pb-2 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900">
                    9:41AM
                  </span>
                  <div className="flex gap-1.5 items-center">
                    <Signal className="w-3 h-3 text-slate-900" />
                    <Wifi className="w-3 h-3 text-slate-900" />
                    <FaBatteryHalf className="w-4 h-4 text-slate-900" />
                  </div>
                </div>

                {/* Ticket Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
                  {/* Branding/Logo Placeholder */}
                  <div className="flex items-center gap-2 mb-0">
                    <div className="w-10 h-10 bg-transparent rounded-md flex items-center justify-center text-white">
                      <Logo />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-2xl font-black tracking-tighter text-[#003B71]">
                        orbo<span className="text-[#F58220]">events</span>
                      </span>
                    </div>
                  </div>

                  {/* QR Code Container */}
                  <div className="w-full aspect-square bg-slate-50 border-2 border-dashed border-violet-100 rounded-[40px] p-8   flex flex-col items-center justify-center relative group/qr">
                    <div className="absolute inset-0 bg-violet-600/5 rounded-[40px] opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                    <QrCode className="w-full h-full text-slate-900 relative z-10" />
                  </div>

                  {/* Verified Badge */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-full shadow-lg shadow-violet-600/20 transform hover:scale-105 transition-transform cursor-default">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">
                        Verified Ticket
                      </span>
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-sm font-bold text-slate-900">
                        Ready to Scan
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                        Access Granted
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Interaction Area */}
                <div className="p-8 border-t border-slate-50 bg-slate-50/30">
                  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-violet-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          Gate Access
                        </p>
                        <p className="text-xs font-bold text-slate-900">
                          Zone A • Main Entrance
                        </p>
                      </div>
                    </div>
                    <Smartphone className="w-5 h-5 text-violet-200" />
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Demo Section */}
      <section className="py-24 px-6 bg-[#f0f2ff]">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-12 md:p-16 border border-violet-100 shadow-xl flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 bg-slate-50 border-2 border-dashed border-violet-200 rounded-[40px] flex items-center justify-center p-8 shrink-0">
            <QrCode className="w-full h-full text-violet-600" />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tight">
              Try the Experience
            </h2>
            <div className="space-y-4">
              <p className="font-bold text-lg">
                Your QR ticket is your access pass.
              </p>
              <p className="text-slate-500 font-medium leading-relaxed">
                Just scan and enter. It works offline, updates in real-time, and
                provides all the details you need for your activity.
              </p>
            </div>
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center shadow-lg">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg">
                <Bell className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight">
                Upcoming Live Experiences
              </h2>
              <p className="text-slate-500 font-medium">
                Find your next adventure from our community's top events.
              </p>
            </div>
            <Link to="/events">
              <button className="flex items-center gap-2 text-violet-600 font-bold hover:gap-3 transition-all">
                View All Events <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
            {/* <!-- Event Card --> */}
            {events?.map((event) => (
              <UserEventCard key={event._id} event={event} />
            ))}
            {eventsHidden.map((event, idx) => (
              <div
                key={idx}
                className="hidden bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-pink-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    From {event.price}
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <p className="text-violet-600 text-xs font-black uppercase tracking-widest mb-2">
                      {event.date}
                    </p>
                    <h3 className="text-2xl font-bold group-hover:text-violet-600 transition-colors">
                      {event.name}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {event.activities.map((act, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-slate-500 font-medium"
                      >
                        <div className="w-5 h-5 bg-violet-50 text-violet-600 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        {act}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 mt-5 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black tracking-tight">
              Simple 4-Step Process
            </h2>
            <p className="text-slate-500 font-medium">
              Getting into your favorite events has never been easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-[32px] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-violet-600/5 transition-all"
              >
                <div
                  className={`${step.bg} ${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-violet-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: ShieldCheck,
                title: "Secure QR Access",
                desc: "Dynamic encrypted QR codes prevent ticket fraud.",
              },
              {
                icon: Zap,
                title: "Fast Entry System",
                desc: "Sub-second scanning speeds ensure smooth traffic flow.",
              },
              {
                icon: Activity,
                title: "Activity-Based Access",
                desc: "Manage tiered access for VIP zones and workshops.",
              },
              {
                icon: Globe,
                title: "Real-Time Validation",
                desc: "Live cloud syncing provides instant data for organizers.",
              },
            ].map((f, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                  <f.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold">{f.title}</h4>
                <p className="text-violet-100 text-sm leading-relaxed opacity-80">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="contact"
        className="py-24 bg-slate-900 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl font-black tracking-tight">
              Why Orboevents is the preferred choice
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  icon: Clock,
                  title: "No long queues",
                  desc: "Average entry time reduced by 70%.",
                },
                {
                  icon: Smartphone,
                  title: "Digital tickets",
                  desc: "Eco-friendly and never lost.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure validation",
                  desc: "Anti-spoofing technology active.",
                },
                {
                  icon: Zap,
                  title: "Easy upgrades",
                  desc: "Upgrade your seats in one tap.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-80 h-96 bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-slate-900 gap-8 shadow-[0_0_80px_rgba(124,58,237,0.3)]">
              <div className="w-48 h-48 border-4 border-slate-100 rounded-[32px] p-4">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
              <div className="text-center space-y-2">
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
    </div>
  );
};

export default SmartTicketingLanding;
