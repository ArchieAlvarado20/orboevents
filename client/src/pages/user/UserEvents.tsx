import Topbar from "@/components/shared/Topbar";
import { Link } from "react-router-dom";

export default function UserEvents() {
  return (
    <>
      <Topbar />
      <main className="pt-24 pb-20 flex-grow">
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
                <span
                  className="material-symbols-outlined text-[10px]"
                  data-icon="chevron_right"
                >
                  chevron_right
                </span>
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
              <button className="px-6 py-2 bg-violet-600 text-white rounded-full font-semibold text-sm whitespace-nowrap shadow-lg shadow-violet-600/20">
                All Events
              </button>
              <button className="px-6 py-2 bg-blue-50 text-gray-600 rounded-full font-semibold text-sm whitespace-nowrap hover:bg-blue-100 transition-colors">
                Exhibitions
              </button>
              <button className="px-6 py-2 bg-blue-50 text-gray-600 rounded-full font-semibold text-sm whitespace-nowrap hover:bg-blue-100 transition-colors">
                Workshops
              </button>
              <button className="px-6 py-2 bg-blue-50 text-gray-600 rounded-full font-semibold text-sm whitespace-nowrap hover:bg-blue-100 transition-colors">
                Museums
              </button>
              <button className="px-6 py-2 bg-blue-50 text-gray-600 rounded-full font-semibold text-sm whitespace-nowrap hover:bg-blue-100 transition-colors">
                Performances
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl font-semibold text-sm text-gray-900 hover:shadow-sm transition-all">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="filter_list"
                >
                  filter_list
                </span>
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl font-semibold text-sm text-gray-900 hover:shadow-sm transition-all">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="swap_vert"
                >
                  swap_vert
                </span>
                Sort: Popular
              </button>
            </div>
          </div>
        </section>
        {/* <!-- Event Grid --> */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* <!-- Card 1: Echoes of the Canvas --> */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(124,58,237,0.04)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-50">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Echoes of the Canvas"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS3mQFIxAd_Gb9ai6jvAYOifbe5k9Iw_2eIfCxk2-JdpSwP6jO69nZh8Sz3GV1k71wieOv7-WDZk3aMAGHB2q76CddQgBKy5IRS-6NAtt9-iM-mq48upGFPJ3GiTBhaE5Bgu0RuPfP29AHwPul8BraG2Pu4ZQQCO93STRULpC35WtxRiW33XSAstZQVM1k3CI9UDTZijWEBLMqHlfOfsxB-IHNjJFWbWx9yyMhw8WjhlihStbZCE4sL3Q40L2cp4l2YgaC8PVswXw"
                />
                <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/40 shadow-sm">
                  <span
                    className="material-symbols-outlined text-violet-600 text-base"
                    data-icon="star"
                  >
                    star
                  </span>
                  <span className="font-semibold text-sm text-violet-600">
                    4.9
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-semibold text-xs text-violet-600 shadow-sm">
                    Exhibition
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs mb-3">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="calendar_today"
                  >
                    calendar_today
                  </span>
                  Oct 12 - Oct 20, 2024
                </div>
                <h3 className="font-headline font-bold text-2xl text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  Echoes of the Canvas
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  Explore the deep intersections of emotional frequency and
                  visual texture in this groundbreaking solo exhibition by Elena
                  Mirelle.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase">
                      Starting from
                    </span>
                    <span className="font-headline font-bold text-violet-600 text-xl">
                      $25.00
                    </span>
                  </div>
                  <Link to="/tickets">
                    <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-violet-600/30 transition-all hover:-translate-y-0.5">
                      Book Spot
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* <!-- Card 2: Urban Heritage Walk --> */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(124,58,237,0.04)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-50">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Urban Heritage Walk"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArMbODraK2a_2AANaR41cv3Hm5sbu0wqB2p4oFYXefK6Vt-jxtG6WOPsTy0KWUPWiCtBszI7Evc5JbUJ8nWwLoCnIvHTdsSunsf-SKQihIeP1aG4qTaRSIG0BrBXRC4qnjTSQgVFz2_PwaEXMpDk9B9C7pj4RVI38FVnYie5cmCtIVfA_SWdEsZplWrv7A1cqEpid0iFg9KwpJ6WUvmcLnyghredAo6JK7nvt7cDc5q09Q1Y-tTIzuUjTi12JqlXq1nlDy4sAtzHw"
                />
                <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/40 shadow-sm">
                  <span
                    className="material-symbols-outlined text-violet-600 text-base"
                    data-icon="star"
                  >
                    star
                  </span>
                  <span className="font-semibold text-sm text-violet-600">
                    4.7
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-semibold text-xs text-violet-600 shadow-sm">
                    Walking Tour
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs mb-3">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="calendar_today"
                  >
                    calendar_today
                  </span>
                  Daily | 10:00 AM
                </div>
                <h3 className="font-headline font-bold text-2xl text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  Urban Heritage Walk
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  Discover the hidden stories of our city's oldest districts
                  through architecture, local lore, and secret gardens.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase">
                      Starting from
                    </span>
                    <span className="font-headline font-bold text-violet-600 text-xl">
                      $15.00
                    </span>
                  </div>
                  <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-violet-600/30 transition-all hover:-translate-y-0.5">
                    Book Spot
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Card 3: The Sculptor's Hands --> */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(124,58,237,0.04)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-50">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="The Sculptor's Hands"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQKucGuI8NWKEKMYr9z44TL_KniSzr2OKI7eKkdujZxBxCpsna74a0OCCZFpnXsDauHOko-VG3XwuRhjR2EQ96xiihUSrdCopk9DNIsYSK66TYfU0z3bptN0oNdYFRIHDapflvES_3AEa0wTk9pezn9kKR8dYo0v920sXR2_fw2djTynvOk0bCekyB8fx5JghUjP5ZNXzXnWWb5MwwhrvBA_isSI5JDPVNEj3w67X2jQFToruotjzgZUR0Qn6HT6OrvAhnC-S3Qx4"
                />
                <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/40 shadow-sm">
                  <span
                    className="material-symbols-outlined text-violet-600 text-base"
                    data-icon="star"
                  >
                    star
                  </span>
                  <span className="font-semibold text-sm text-violet-600">
                    5.0
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-semibold text-xs text-violet-600 shadow-sm">
                    Workshop
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs mb-3">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="calendar_today"
                  >
                    calendar_today
                  </span>
                  Oct 15, 2024 | 2:00 PM
                </div>
                <h3 className="font-headline font-bold text-2xl text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  The Sculptor's Hands
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  A hands-on masterclassName in traditional clay modeling
                  techniques led by award-winning artist Julian Thorne.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase">
                      Starting from
                    </span>
                    <span className="font-headline font-bold text-violet-600 text-xl">
                      $45.00
                    </span>
                  </div>
                  <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-violet-600/30 transition-all hover:-translate-y-0.5">
                    Book Spot
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Card 4: Midnight Jazz Fusion --> */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(124,58,237,0.04)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-50">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Midnight Jazz Fusion"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyaZYIILkea_Sf8NbUYmoP5OiZ8iCOgC3vwhXBun0k5Xw-HsLzPBZTA94W77u9FJEee9Q6GfrqzQ5swirx5DZ9MV0MxLNGfL9Uif62VbaUX_-hM_gjnby8_P6cg4Wnw_kDG3JIMGXzHZQ0vHNoFi_e9PEHdWHd63DaiZ_hfqXOFhT3VIqdm2iIPY1d9UJEDi8aMUYxzQE2mZCOUbidkdylGwj2Yhpw-7wvwU06XdaHdOgPCw0VwyfDnWhikrotsGaWYRlYVuYjrYw"
                />
                <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/40 shadow-sm">
                  <span
                    className="material-symbols-outlined text-violet-600 text-base"
                    data-icon="star"
                  >
                    star
                  </span>
                  <span className="font-semibold text-sm text-violet-600">
                    4.8
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-semibold text-xs text-violet-600 shadow-sm">
                    Concert
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs mb-3">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="calendar_today"
                  >
                    calendar_today
                  </span>
                  Fridays | 9:00 PM
                </div>
                <h3 className="font-headline font-bold text-2xl text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  Midnight Jazz Fusion
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  Experience the soul of the city with late-night jazz sessions
                  featuring world-className quartets and local talent.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase">
                      Starting from
                    </span>
                    <span className="font-headline font-bold text-violet-600 text-xl">
                      $30.00
                    </span>
                  </div>
                  <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-violet-600/30 transition-all hover:-translate-y-0.5">
                    Book Spot
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Card 5: Museum of Light --> */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(124,58,237,0.04)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-50">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Museum of Light"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWf1VfPTEUlTxPQfbLtdRTjGS4JlVL-U6qGgVILkPSwvK53oQUhvC4Ki9WAOEi4WVyRNRNNeV-AChiDPCTGjXYx01voknHzl06oO-9h75A3UsiZJk2bGKBiHMq6fPXsA2jQrmrlTJyX5_Vs_3KOEpQ7gCqL5vTx9LHawCMLbS4yyUehMhNlVQpP3EW_dgdQdJr6L7lZNnqApKWSNKBbWPl_b3pvX512BENzkhAi1e2BAcifzpR0UNUlP2u0O6p1AZVURm37A-mx1g"
                />
                <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/40 shadow-sm">
                  <span
                    className="material-symbols-outlined text-violet-600 text-base"
                    data-icon="star"
                  >
                    star
                  </span>
                  <span className="font-semibold text-sm text-violet-600">
                    4.9
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-semibold text-xs text-violet-600 shadow-sm">
                    Immersive Art
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs mb-3">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="calendar_today"
                  >
                    calendar_today
                  </span>
                  Permanent Exhibition
                </div>
                <h3 className="font-headline font-bold text-2xl text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  Museum of Light
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  A multi-sensory journey through digital landscapes where light
                  and sound redefine your perception of space.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase">
                      Starting from
                    </span>
                    <span className="font-headline font-bold text-violet-600 text-xl">
                      $20.00
                    </span>
                  </div>
                  <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-violet-600/30 transition-all hover:-translate-y-0.5">
                    Book Spot
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Card 6: Ancient Calligraphy --> */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(124,58,237,0.04)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-50">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt="Ancient Calligraphy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeLHdI8M31io4UQ2lCDQG3h6u3z4gnelGhHKnPjl3xUvhjR8lnYZkR7dqVPOX4v1s1_7bvZsnQFpXTwpgoji2LogsRMOuMFVN32We8_RyVBlfjHIIZx6B2Q1juWWiLgT55adb7OqIEdi2Qvqr_daNx-YGtCIgtsFXWVZ_Ou7syjk1aoShFuOIzzhs-0EK5TIotGPzEpOTQTq09vFDU-M7Fw173eNfx3c7mJFDRQ0mv-L9qh5AQquqy8K6FZQg87JJQRV-HvPedy5Y"
                />
                <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/40 shadow-sm">
                  <span
                    className="material-symbols-outlined text-violet-600 text-base"
                    data-icon="star"
                  >
                    star
                  </span>
                  <span className="font-semibold text-sm text-violet-600">
                    4.6
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full font-semibold text-xs text-violet-600 shadow-sm">
                    Cultural Art
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-400 font-semibold text-xs mb-3">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="calendar_today"
                  >
                    calendar_today
                  </span>
                  Oct 22, 2024 | 11:00 AM
                </div>
                <h3 className="font-headline font-bold text-2xl text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  Ancient Calligraphy
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  Unlock the meditative art of ancient brushwork. Learn the
                  history and technique of Eastern calligraphy.
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold text-[10px] uppercase">
                      Starting from
                    </span>
                    <span className="font-headline font-bold text-violet-600 text-xl">
                      $35.00
                    </span>
                  </div>
                  <button className="bg-violet-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-violet-600/30 transition-all hover:-translate-y-0.5">
                    Book Spot
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Pagination --> */}
          <div className="mt-20 flex items-center justify-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span
                className="material-symbols-outlined"
                data-icon="chevron_left"
              >
                chevron_left
              </span>
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
              <span
                className="material-symbols-outlined"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
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
      <footer className="bg-gray-50 dark:bg-gray-950 w-full py-12 mt-auto border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <span className="text-lg font-bold text-gray-900 dark:text-white font-headline">
              VibeCheck
            </span>
            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 text-center md:text-left">
              © 2024 VibeCheck Events. Join the community.
            </p>
          </div>
          <nav className="flex gap-8">
            <a
              className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-violet-500 transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-violet-500 transition-colors"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-violet-500 transition-colors"
              href="#"
            >
              Support
            </a>
            <a
              className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-violet-500 transition-colors"
              href="#"
            >
              Contact
            </a>
          </nav>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-violet-600 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="share">
                share
              </span>
            </a>
            <a
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-violet-600 transition-all"
              href="#"
            >
              <span className="material-symbols-outlined" data-icon="public">
                public
              </span>
            </a>
          </div>
        </div>
      </footer>
      {/* <!-- FAB --> */}
      <button className="fixed bottom-8 right-8 bg-[#fc79bd] text-white p-4 rounded-full shadow-[0_8px_32px_rgba(252,121,189,0.3)] hover:scale-110 active:scale-95 transition-all z-40 flex items-center gap-2 pr-6">
        <span className="material-symbols-outlined" data-icon="add">
          add
        </span>
        <span className="font-semibold text-sm">Post Event</span>
      </button>
    </>
  );
}
