import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Smartphone,
  ShieldCheck,
  Zap,
  Send,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Star,
  QrCode,
  Headphones,
} from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  const reasons = [
    { icon: Clock,       title: "No Long Queues",    desc: "Average entry time reduced by 70% with QR scanning.", color: "bg-violet-50 text-violet-600" },
    { icon: Smartphone,  title: "Digital Tickets",   desc: "Eco-friendly, never lost, always in your pocket.",    color: "bg-blue-50 text-blue-600"   },
    { icon: ShieldCheck, title: "Secure Validation", desc: "Anti-spoofing tech keeps every entry tamper-proof.",  color: "bg-pink-50 text-pink-600"   },
    { icon: Zap,         title: "Easy Upgrades",     desc: "Upgrade seats or zones in one tap, anytime.",         color: "bg-amber-50 text-amber-600" },
  ];

  const contactCards = [
    { icon: Mail,       label: "Email Us",     value: "hello@orboevents.com", sub: "Reply within 2 hours",     gradient: "from-violet-600 to-purple-700" },
    { icon: Phone,      label: "Call Us",      value: "+91 98765 43210",      sub: "Mon–Fri, 9am–6pm IST",     gradient: "from-blue-600 to-cyan-600"   },
    { icon: Headphones, label: "Live Support", value: "Chat with us",         sub: "Avg wait < 2 minutes",     gradient: "from-pink-600 to-rose-600"   },
    { icon: MapPin,     label: "Visit Us",     value: "Bengaluru, Karnataka", sub: "India HQ",                 gradient: "from-green-600 to-emerald-600"},
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#f8f9ff] text-slate-900 overflow-x-hidden">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.6s ease both}
        .section-title{background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .shimmer-text{background:linear-gradient(90deg,#7c3aed,#a855f7,#ec4899,#7c3aed);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .contact-card{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .contact-card:hover{transform:translateY(-6px);box-shadow:0 20px 40px -10px rgba(124,58,237,0.18)}
        .reason-card{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .reason-card:hover{transform:translateY(-4px);box-shadow:0 16px 32px -8px rgba(0,0,0,0.08)}
        .input-field{width:100%;padding:.875rem 1.125rem;border-radius:.875rem;border:1.5px solid #e2e8f0;background:#fff;color:#1e293b;font-size:.875rem;font-weight:500;outline:none;transition:border-color .2s,box-shadow .2s}
        .input-field::placeholder{color:#94a3b8}
        .input-field:focus{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,0.12)}
        .submit-btn{display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%;padding:1rem;background:linear-gradient(135deg,#7c3aed,#9333ea);color:#fff;font-weight:800;font-size:.9375rem;border-radius:1rem;border:none;cursor:pointer;box-shadow:0 8px 24px rgba(124,58,237,0.3);transition:all .3s ease}
        .submit-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 14px 30px rgba(124,58,237,0.4)}
        .submit-btn:disabled{opacity:.7;cursor:not-allowed}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spinner{width:1.25rem;height:1.25rem;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite}
        .social-btn{transition:transform .25s ease}
        .social-btn:hover{transform:translateY(-3px)}
      `}</style>

      {/* ── HERO ── */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-pink-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10 fade-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-md border border-violet-100 mb-6">
            <MessageSquare className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-black uppercase tracking-widest text-violet-700">We're here to help</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5">
            <span className="section-title">Get in</span>{" "}<span className="shimmer-text">Touch</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Have a question, partnership inquiry, or just want to say hello? Our team responds fast.
          </p>
        </div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((c, i) => (
              <div key={i} className="contact-card bg-white rounded-3xl p-6 border border-slate-100 flex flex-col items-center text-center gap-4 fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-14 h-14 bg-gradient-to-br ${c.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <c.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{c.label}</p>
                  <p className="font-black text-slate-900 text-sm">{c.value}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + WHY US ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Contact Form */}
          <div className="fade-up">
            <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">Send a Message</span>
            <h2 className="text-4xl font-black section-title mb-2">Drop Us a Line</h2>
            <p className="text-slate-500 font-medium mb-8">Fill the form and we'll get back within 2 hours.</p>

            {submitted ? (
              <div className="flex flex-col items-center text-center py-16 bg-violet-50 rounded-3xl border border-violet-100">
                <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center mb-5 shadow-xl shadow-violet-600/25">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent! 🎉</h3>
                <p className="text-slate-500 font-medium max-w-xs">Thanks for reaching out. We'll reply within 2 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 px-6 py-3 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all text-sm"
                >Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Arjun Sharma" required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} required className="input-field">
                    <option value="">Select a topic…</option>
                    <option>General Query</option>
                    <option>Ticket Issue</option>
                    <option>Organizer Partnership</option>
                    <option>Technical Support</option>
                    <option>Refund Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us what's on your mind…" required rows={5} className="input-field resize-none" />
                </div>
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? <span className="spinner" /> : <><Send className="w-5 h-5" /> Send Message</>}
                </button>
                <p className="text-center text-xs text-slate-400 font-medium">🔒 Your data is safe. We never share with third parties.</p>
              </form>
            )}
          </div>

          {/* Why Us + QR + Social */}
          <div className="space-y-10 fade-up" style={{ animationDelay: "0.2s" }}>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-violet-600 mb-3 inline-block">Why Us</span>
              <h2 className="text-4xl font-black section-title mb-2">Why Orboevents?</h2>
              <p className="text-slate-500 font-medium mb-7">Redefining how people experience events — one scan at a time.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reasons.map((r, i) => (
                  <div key={i} className="reason-card bg-white rounded-2xl p-5 border border-slate-100 flex gap-4">
                    <div className={`w-11 h-11 ${r.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <r.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900 mb-0.5">{r.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR dark card */}
            <div className="bg-slate-900 rounded-3xl p-8 flex items-center gap-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-600/15 rounded-full blur-2xl" />
              <div className="relative z-10 w-28 h-28 bg-white/10 border-2 border-dashed border-violet-400/40 rounded-2xl flex items-center justify-center p-4 flex-shrink-0">
                <QrCode className="w-full h-full text-violet-300" />
              </div>
              <div className="relative z-10">
                <p className="text-white font-black text-lg leading-tight mb-2">Your Ticket,<br />Your Access Pass</p>
                <p className="text-slate-400 text-xs font-medium leading-relaxed mb-4">Encrypted. Offline-ready. Works on any phone.</p>
                <div className="flex flex-wrap gap-2">
                  {["256-bit Secure", "Offline Ready", "Instant Delivery"].map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/10 rounded-full text-white/70 text-[10px] font-bold border border-white/10">✓ {tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: FaTwitter,   label: "@orboevents",    gradient: "from-sky-500 to-blue-600"   },
                  { icon: FaInstagram, label: "@orboevents",    gradient: "from-pink-500 to-rose-600"  },
                  { icon: FaLinkedin,  label: "Orboevents Inc", gradient: "from-blue-700 to-indigo-700"},
                ].map((s, i) => (
                  <a key={i} href="#" className={`social-btn flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br ${s.gradient} text-white rounded-2xl text-xs font-bold shadow-md`}>
                    <s.icon className="w-4 h-4" /> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 px-6 bg-[#f0f2ff]">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-[48px] overflow-hidden shadow-2xl shadow-violet-600/20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-900" />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-violet-400/15 rounded-full blur-3xl" />
            <div className="relative z-10 p-12 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">50,000+ Happy Attendees</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-4 leading-tight">Ready to Skip the Queue?</h2>
              <p className="text-white/75 font-medium text-lg mb-8 max-w-md mx-auto">
                Join thousands of event-goers who've switched to smart QR ticketing.
              </p>
              <Link to="/events">
                <button className="group inline-flex items-center gap-2 px-10 py-4 bg-white text-violet-700 font-black rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all">
                  Explore Events <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
