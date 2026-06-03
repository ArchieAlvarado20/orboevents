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
  Globe,
  Smartphone,
  ArrowRight,
  Star,
  Users,
  Lock,
  Wifi,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ── Scroll-into-view hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── FAQ accordion item ── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(p => !p)}
      className={`cursor-pointer bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${open ? "border-violet-200 shadow-md shadow-violet-100" : "border-slate-100 hover:border-violet-100"}`}
    >
      <div className="flex items-center justify-between p-6 gap-4">
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center text-xs font-black shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="font-bold text-slate-900 text-sm md:text-base">{q}</h4>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? "bg-violet-600 rotate-45" : "bg-slate-100"}`}>
          <span className={`text-lg font-black leading-none ${open ? "text-white" : "text-slate-500"}`}>+</span>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-6" : "max-h-0"}`}>
        <p className="px-6 text-slate-500 font-medium text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

const HowItWorks = () => {
  const stepsRef = useInView();
  const featRef  = useInView();
  const statsRef = useInView();

  const steps = [
    {
      num: "01", title: "Choose & Book",
      shortDesc: "Browse curated events and pick your preferred spots effortlessly.",
      detail: ["Filter by date, category, location and price", "Save favourites and get personalised picks", "One-tap booking confirmation"],
      icon: Calendar, gradient: "from-violet-600 to-purple-700", checkColor: "text-violet-500",
    },
    {
      num: "02", title: "Pay Securely",
      shortDesc: "Multiple payment options with bank-grade 256-bit encryption.",
      detail: ["UPI, cards, net banking & wallets", "256-bit SSL end-to-end encryption", "Instant payment confirmation"],
      icon: CreditCard, gradient: "from-blue-600 to-cyan-600", checkColor: "text-blue-500",
    },
    {
      num: "03", title: "Get QR Ticket",
      shortDesc: "Instant encrypted QR ticket delivered to your wallet.",
      detail: ["Works completely offline", "Add to Apple Wallet or Google Pay", "Contains all access zone details"],
      icon: QrCode, gradient: "from-indigo-600 to-violet-600", checkColor: "text-indigo-500",
    },
    {
      num: "04", title: "Scan & Enter",
      shortDesc: "Bypass lines — scan your phone at the gate and walk in.",
      detail: ["Sub-second QR scanning speed", "Dynamic codes prevent duplication", "VIP & tiered zone access managed automatically"],
      icon: ScanLine, gradient: "from-pink-600 to-rose-600", checkColor: "text-pink-500",
    },
  ];

  const features = [
    { icon: ShieldCheck, title: "Tamper-Proof QR",  desc: "Dynamic codes regenerate every 30s — fraud virtually impossible.", gradient: "from-violet-600 to-purple-700" },
    { icon: Zap,         title: "Lightning Entry",  desc: "Sub-second scans keep crowds flowing at any scale.",              gradient: "from-yellow-500 to-orange-600" },
    { icon: Activity,    title: "Tiered Access",    desc: "VIP zones, workshops, activity-based entry in one dashboard.",    gradient: "from-pink-600 to-rose-600" },
    { icon: Globe,       title: "Real-Time Sync",   desc: "Live cloud syncing for instant organiser attendance data.",       gradient: "from-blue-600 to-cyan-600" },
    { icon: Smartphone,  title: "Wallet Ready",     desc: "Add to Apple Wallet or Google Pay with a single tap.",           gradient: "from-green-600 to-emerald-600" },
    { icon: BarChart3,   title: "Live Analytics",   desc: "Real-time dashboards so organisers never miss a beat.",          gradient: "from-indigo-600 to-violet-700" },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime SLA",       icon: Wifi,  color: "bg-violet-600" },
    { value: "<0.5s", label: "Scan Speed",        icon: Zap,   color: "bg-amber-500"  },
    { value: "256-bit", label: "Encryption",      icon: Lock,  color: "bg-blue-600"   },
    { value: "50K+",  label: "Happy Attendees",   icon: Users, color: "bg-pink-600"   },
  ];

  const faqs = [
    { q: "Do QR tickets work without internet?", a: "Yes! Your ticket is stored locally and works offline. The scanner syncs via cloud in real-time, but you need zero connectivity on your end." },
    { q: "Can I transfer my ticket to someone else?", a: "You can gift or reassign tickets through the app before the event starts. They're linked to your account for security." },
    { q: "What if my phone battery dies at the event?", a: "Share your QR code screenshot with a trusted contact beforehand, or show the organiser your booking confirmation ID." },
    { q: "How do I get a refund?", a: "Refund eligibility depends on the organiser's policy. Request through the app and we'll process within 5–7 business days." },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#f8f9ff] text-slate-900 overflow-x-hidden">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .fade-up{animation:fadeUp 0.55s ease both}
        .section-title{background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .shimmer-text{background:linear-gradient(90deg,#7c3aed,#a855f7,#ec4899,#7c3aed);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .step-card{transition:transform 0.35s ease,box-shadow 0.35s ease}
        .step-card:hover{transform:translateY(-8px);box-shadow:0 30px 60px -15px rgba(124,58,237,0.18)}
        .feat-card{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .feat-card:hover{transform:translateY(-5px);box-shadow:0 20px 40px -10px rgba(0,0,0,0.10)}
        .feat-card:hover .feat-icon{transform:scale(1.15) rotate(-5deg)}
        .feat-icon{transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1)}
        .stat-card{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .stat-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px -8px rgba(124,58,237,0.2)}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-pink-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10 fade-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-md border border-violet-100 mb-6">
            <QrCode className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-black uppercase tracking-widest text-violet-700">The Orboevents Process</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            <span className="section-title">How It</span>{" "}<span className="shimmer-text">Works</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl mx-auto mb-8">
            From discovery to entry — every step is seamless, secure, and instant. No paper, no queues, no friction.
          </p>
          <Link to="/events">
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl shadow-xl shadow-violet-600/25 hover:bg-violet-700 hover:-translate-y-0.5 transition-all">
              Explore Events <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      {/* ── 4-STEP PROCESS ── */}
      <section className="py-20 px-6 bg-white" ref={stepsRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-black section-title mb-4">4 Steps to Your Event</h2>
            <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto">Getting in has never been this smooth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connector dots */}
            <div className="hidden lg:flex absolute top-10 left-0 right-0 items-center justify-between px-[calc(12.5%+2rem)] pointer-events-none z-0">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex-1 flex items-center gap-1">
                  <div className="flex-1 h-px bg-gradient-to-r from-violet-300/60 to-pink-300/60" />
                  <div className="w-2 h-2 rounded-full bg-violet-400/60" />
                </div>
              ))}
            </div>
            {steps.map((step, idx) => (
              <div key={idx} className={`step-card relative z-10 bg-white rounded-3xl border border-slate-100 p-8 flex flex-col ${stepsRef.inView ? "fade-up" : "opacity-0"}`} style={{ animationDelay: `${idx * 0.12}s` }}>
                <span className="absolute top-4 right-5 text-6xl font-black text-slate-100 select-none leading-none">{step.num}</span>
                <div className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg flex-shrink-0`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2 text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5">{step.shortDesc}</p>
                <div className="mt-auto space-y-2 pt-4 border-t border-slate-100">
                  {step.detail.map((line, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-500 font-medium">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${step.checkColor} shrink-0 mt-0.5`} />
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-14 px-6 bg-[#f0f2ff]" ref={statsRef.ref}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div key={i} className={`stat-card bg-white rounded-3xl p-6 flex flex-col items-center text-center border border-slate-100 ${statsRef.inView ? "fade-up" : "opacity-0"}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-12 h-12 ${s.color} rounded-2xl flex items-center justify-center mb-3 shadow-md`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-3xl font-black text-slate-900 mb-1">{s.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 bg-white" ref={featRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">Platform Power</span>
            <h2 className="text-4xl md:text-5xl font-black section-title mb-4">Built for Speed & Security</h2>
            <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">Every feature engineered for a flawless experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`feat-card bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 flex gap-5 ${featRef.inView ? "fade-up" : "opacity-0"}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={`feat-icon w-14 h-14 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-lg text-slate-900 mb-2">{f.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-[#f0f2ff]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">Got Questions?</span>
            <h2 className="text-4xl font-black section-title">Frequently Asked</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[48px] overflow-hidden shadow-2xl shadow-violet-600/20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-900" />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-violet-400/15 rounded-full blur-3xl" />
            <div className="relative z-10 p-12 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Loved by 50,000+ attendees</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                Ready to Skip the Queue?<br />
                <span className="shimmer-text">Start Today.</span>
              </h2>
              <p className="text-white/75 text-lg font-medium mb-10 max-w-xl mx-auto">
                Join thousands of event-goers who've switched to smart QR ticketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/events">
                  <button className="group flex items-center gap-2 px-10 py-4 bg-white text-violet-700 font-black rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all">
                    Browse Events <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="flex items-center gap-2 px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
