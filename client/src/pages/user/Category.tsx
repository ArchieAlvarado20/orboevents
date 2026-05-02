import BackButton from "@/components/shared/BackButton";
import Topbar from "@/components/shared/usersPage/topbar";
import UserFooter from "@/components/shared/usersPage/userFooter";
import {
  Music,
  FlaskConical,
  CalendarHeartIcon,
  MonitorCheck,
  Map,
  ArrowRight,
} from "lucide-react";

export default function Category() {
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
  return (
    <>
      <main className="pt-16 mt-10 pb-24 md:pb-0">
        <BackButton className="mb-2" />
        {/* <!-- Hero Section --> */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover brightness-50"
              data-alt="Energetic concert crowd at night with vibrant purple and blue stage lights and laser beams cutting through hazy atmosphere"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYCgPwwyKamX-qZLoekqpPw0QZ3b72A76LIxfC6NKtChD__mwUX0mznf3O207SmbaEzJsGauCgkb27d5s2PumfbIBdaNxWHSdvvmMVJwdPrVRoOJvORmpMhlq9VrAyr71GIo2yYWUbr2OxeE2wsK_8JE1lvGOjdb09bsOOGjeZ6dYrMLUi0VV28kaIK2Ncgmxw3VaZqdbrOfjfUnS4bix43b7_4KQZ9BDlrbuo3I3_SFdp-dSffe4L1X3QJx3T_-PbHtBUgGSHuNE"
            />
            <div className="absolute inset-0 mesh-gradient opacity-40 mix-blend-overlay"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-display-lg text-display-lg text-white mb-4">
              Music &amp; Concerts
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto">
              Discover the rhythm of the city. From underground electronic raves
              to serene jazz in the park, find your next unforgettable sound
              experience.
            </p>
          </div>
        </section>
        {/* <!-- Main Content Area with Sidebar --> */}
        <div className="max-w-7xl mx-auto px-6 mt-5 flex gap-gutter">
          {/* <!-- SideNavBar --> */}
          <aside>
            {categoryOptions.map((cat, index) => {
              const Icon = cat.icon;

              return (
                <a
                  key={cat.value}
                  href="#"
                  className={`mx-2 px-4 py-3 flex items-center gap-3 font-['Plus_Jakarta_Sans'] text-sm font-semibold rounded-lg transition-all ${
                    index === 0
                      ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-200"
                      : "text-slate-500 dark:text-slate-400 hover:bg-violet-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {cat.label}
                </a>
              );
            })}
          </aside>

          {/* <!-- Content Canvas --> */}
          <div className="flex-1 py-8">
            {/* <!-- Filters Bar --> */}
            <div className="hidden glass-card mb-10 p-4 rounded-2xl flex flex-wrap items-center gap-4 border border-violet-100/50 shadow-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
                <CalendarHeartIcon />
                <select
                  className="bg-transparent border-0 outline-none
focus:outline-none focus:ring-0
text-sm font-medium text-slate-900 dark:text-white
placeholder:text-slate-400
py-2 pr-8
transition-colors duration-200"
                >
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>This Weekend</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
                <MonitorCheck />
                <select
                  className="bg-transparent border-0 outline-none
focus:outline-none focus:ring-0
text-sm font-medium text-slate-900 dark:text-white
placeholder:text-slate-400
py-2 pr-8
transition-colors duration-200"
                >
                  <option>Price: Any</option>
                  <option>Free</option>
                  <option>Paid</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
                <Map />
                <select className="bg-transparent border-none focus:ring-0 text-label-md font-label-md text-on-surface p-0 pr-8">
                  <option>Format: All</option>
                  <option>Virtual</option>
                  <option>In-person</option>
                </select>
              </div>
              <button className="ml-auto bg-violet-600 text-white px-6 py-2 rounded-full font-label-md text-label-md hover:-translate-y-0.5 transition-transform shadow-md shadow-primary/20">
                Apply Filters
              </button>
            </div>
            {/* <!-- Event Grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* <!-- Event Card 1 --> */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-violet-50">
                <div className="relative h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-alt="High-energy electronic music festival stage with circular neon light structures and purple lasers over a dancing crowd"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA83e9qcS5Z28hyIR5KTSkLjE2i4-kjlvqmrPplqK50z-aDLRYi27txs9icLJkQErkL-8PPC76tbL2svVdPeAt6rmjQeuoMtu7hJVBcpGLuewWVHyMyvSlNmVetL603hyqko8I2Xn1k65FtbIAcGPYQaXcsELx1h5DiLSqggvG44mAkNUcnToFMtazAeUbUM_t-SUUrBsm0okXSKR4GmHYfSTMzNUHiSZyaFZFeqpNa-yWvv06nIVoU1PD3zduGnpm5jXdO76mXkyg"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-violet-700 shadow-sm">
                    Aug 24 • 8:00 PM
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary bg-secondary-fixed px-2 py-0.5 rounded">
                      Electronic
                    </span>
                    <span className="text-headline-md font-headline-md text-primary">
                      $45.00
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
                    Neon Pulse Music Festival
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm gap-1">
                    <span className="material-symbols-outlined text-lg">
                      location_on
                    </span>
                    <span>Neon Arena, Downtown</span>
                  </div>
                </div>
              </div>
              {/* <!-- Event Card 2 --> */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-violet-50">
                <div className="relative h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-alt="Outdoor jazz band performing on a small stage in a lush green city park at twilight with string lights hanging from trees"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHTUl1YnfYuMZShFtYC8WeqtYvrWWTeu80e-ervDrtLEyyROHOQJ5Itdrk0O-qdHxCAOMq6rIwOsafLwiXYIzRTpqHso6WCXGB0JlEkTP6wNq_QA-inK3wdyIZRNShEDXS-E1V20P6c-6ftA2vkaME6GCFnaLGM-eGVm2lwysjWSic-hrddPwYKw05zWumT0sUndL08H-n2_v1Y7GadXuCUq0V3s9mngAVbeiaTyDP9k1OnGvNpRnoeM11Ktar53fHSpkBmmzflF8"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-violet-700 shadow-sm">
                    Aug 25 • 6:30 PM
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded">
                      Jazz
                    </span>
                    <span className="text-headline-md font-headline-md text-primary">
                      Free
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
                    Jazz in the Park
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm gap-1">
                    <span className="material-symbols-outlined text-lg">
                      location_on
                    </span>
                    <span>Central Gardens, East Side</span>
                  </div>
                </div>
              </div>
              {/* <!-- Event Card 3 --> */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-violet-50">
                <div className="relative h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-alt="Close up of a professional DJ controller in a dark underground club with ambient blue and magenta neon highlights"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvnaagqVejHNgia3rybVEgTsBC17nQVN01mGQA_AAJOUKvfNoEirJCk2o562LIeBMELsoNMObLgWskQ8Q3qzN5gs7wa9KuZhu8EEaC1VmPAU529oV9uj9hOobAqY3UayiK7ewr4Ou_luuW9vSNkEfcWi1xVE4RPCIsPWx6zFCnKN0UTFLZiKsGVLdcgTtknFy-nV4VhYFzz4wu8J_YFxusSO9b1jL3fH6Xg39TRrVHxxR8sHUofkdcWmW5Z2dFbgCjTJx3fylTAyo"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-violet-700 shadow-sm">
                    Tonight • 11:00 PM
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-on-primary-container bg-primary-container px-2 py-0.5 rounded">
                      Electronic
                    </span>
                    <span className="text-headline-md font-headline-md text-primary">
                      music $25.00
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
                    Electronic Underground
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm gap-1">
                    <span className="material-symbols-outlined text-lg">
                      location_on
                    </span>
                    <span>The Vault, Industrial District</span>
                  </div>
                </div>
              </div>
              {/* <!-- Event Card 4 (Asymmetric Layout addition) --> */}
              <div className="md:col-span-2 xl:col-span-2 bg-violet-600 rounded-3xl overflow-hidden shadow-xl group flex flex-col md:flex-row min-h-[300px]">
                <div className="md:w-1/2 relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Atmospheric shot of a lead guitarist silhouette on stage with intense golden backlighting and stadium crowd smoke"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJDzSiS-jvQA1ixboGax20w6ti3garmLF7OooY3rMWMrc5qsjkS01YnpLqNF-guZ5e1zV8XHhnLvAYHaIpdYq7E79rJ-sCWASbKuxCYEovVDrRmxQVzvEzu_8MiEPE3ECp3ThRYJJ4b9Y7eO176qP_NSNEzlJlqHj53qGH-bqebqDUuNyiw1ax2xpFpMlV-f25K2JQvLH0xsBNRw9qVcWAKNHz20IE6TGehk1to92HLl2TxpCHw2VrMNVhw6sQdWZlmVyJi2AlIhk"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center bg-primary">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary-fixed bg-white/20 w-fit px-3 py-1 rounded-full mb-4">
                    Featured Event
                  </span>
                  <h3 className="font-headline-lg text-display-lg text-white mb-4">
                    Midsummer Rock Festival
                  </h3>
                  <p className="text-white/80 mb-6 text-body-md">
                    Join 50,000 fans for three days of non-stop legendary rock.
                    Early bird tickets available now.
                  </p>
                  <button className="bg-white text-primary px-8 py-3 rounded-full font-headline-md text-label-md hover:bg-surface-variant transition-colors w-fit">
                    Book Tickets
                  </button>
                </div>
              </div>
              {/* <!-- Event Card 5 --> */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-violet-50">
                <div className="relative h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-alt="Modern acoustic guitar player on a sunlit terrace overlooking a Mediterranean city with soft bokeh background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQAAmUnbMMxIA9izgqiaESBM98hofnVXlALdY_vyVHTAJuO5bCZ_cQk82Gk3bALYJ-9CPdU0gKlMjBL6-dtla9lnRmO7pPEbO6S6mOQgsYUFMcAi5NQXf3FmsLsNZHWXGcYr5VNs2scR90mbH2SYkN_ezIPkZGsvjem09fnnW8r8lfiNx3NuUf2V3Ui0jdp1s8-mSs8Osun9X7e2cU0BaF3GsJZWQXmr_trNaw3pck2iFcUfJYdzNxOACFrNd91ZC_MP5ZspK6xYA"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-violet-700 shadow-sm">
                    Aug 28 • 5:00 PM
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary bg-secondary-fixed px-2 py-0.5 rounded">
                      Acoustic
                    </span>
                    <span className="text-headline-md font-headline-md text-primary">
                      Free
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
                    Rooftop Sessions
                  </h3>
                  <div className="flex items-center text-slate-500 text-sm gap-1">
                    <span className="material-symbols-outlined text-lg">
                      location_on
                    </span>
                    <span>Skyline Terrace</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Pagination / Load More --> */}
            <div className="mt-16 flex justify-center">
              <button className="group flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-primary px-8 py-4 rounded-full font-headline-md transition-all">
                Discover More Events
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
