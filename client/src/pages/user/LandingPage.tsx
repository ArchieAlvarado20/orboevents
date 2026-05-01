import UserEventCard from "@/components/shared/usersPage/userEventCard";
import { showError, showSuccess } from "@/lib/toast";
import axios from "axios";
import { ArrowRight, Lightbulb, Megaphone, Newspaper } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

export default function LandingPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) return;

    const handleAuth = async () => {
      if (hasRun.current) return;

      hasRun.current = true;
      try {
        localStorage.setItem("token", token);

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;
        localStorage.setItem("user", JSON.stringify(user));

        window.history.replaceState({}, "", "/auth");

        showSuccess(`Welcome back, ${user.name}!`);
        navigate("/");
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        showError("Authentication failed.");
        navigate("/login");
      }
    };

    handleAuth();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/event`,
        );

        const events = res.data.events || [];
        setEvents(events.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <main>
        <section className="relative mt-10 min-h-[800px] flex items-center py-20 px-6 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="z-10">
              <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 text-sm font-semibold rounded-full mb-6">
                #1 Event Discovery Platform
              </span>
              <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-5xl lg:text-6xl text-slate-900 mb-8 leading-[1.1] tracking-tight">
                The Leading Platform for{" "}
                <span className="text-violet-600">EVENTS</span>, MEETUPS &amp;
                CONFERENCES
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                Discover vibrant local experiences, connect with communities,
                and never miss out on the events that shape your city.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/events">
                  <button className="bg-violet-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-violet-600/25 hover:-translate-y-1 transition-all">
                    Explore Events
                  </button>
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/70 backdrop-blur-md rounded-full border border-white/50 shadow-sm">
                  <div className="flex -space-x-3">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      data-alt="portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3Qo4A-062yU7THWeNPbSCX2QpWW-y_PgoDRkIW-BiFdOd3uqFhfQE0mJtLo1ZzS_ajHsljwAA3HBcot3ne2ySku0EU1GmI5QrPRtkIFRma1bolvEOr0gZRfR1dDQUMGONfA6_pkdhue8VmXH9nfhkYCSpNyzh4h_CysMFsh1BUsFRMGIeVsfspGnjRcX9F-EF9JUfc-6aDWh9NwO2qramQiP_Zb8UtEQZriEX9QpYVUHIo1UP-2UzL8WtLUaN5gwGJn17d9W9BE"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      data-alt="portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB12Pzpazsp7mAM-9q-Z4--_6Ac9GxG7yasOzsiJzuSzvyDBSlRP0-ddQWqkTgH1o7iU1OXKsqavqKql5DMMFr3yqHaal6_WxfhWuKW5ILXGK-vvCuxTE1KC3QAuHt4p2iBt2J8pURQ3tqv8rzjCaeMdoLa75L1EOq_5lbP7OF2lwkIEZJqRV7ifAqbWvMCYxmnytwWmJw16ya1XRb43jidKq7GAB8Foy9tPAfRNMkG1XePMIpKlO_ktm0Tkh4gmHjAbbUjDUKe0Uo"
                    />
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      data-alt="portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCjBeU35tEZpuf7yK3iXD9O3kuE_zDwGTzUg3dWhrG7W62AlOLU5k6uY9bcpR7DSwGsLYRMcPoMYpvvBPwr8s27Ejt9N4dG5CdBkt9_la81eiHkfJjSthxdbzNqthKYUqdKoOP49qh39nAfh8ofcAFV7xHr0xipCBWxbZUt8CPpZOQaTvoY2dwHFpibwbtKA9sr06mIXzDUqP5U9s5vZt-bdwXSdxm22FkX-JthmiQ0VAjNtSNHU5gjFzxxEjs3aS2jLvCfXHsans"
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    12k+ users joined today
                  </span>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"></div>
              <div className="relative rounded-[48px] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  className="w-full aspect-[4/5] object-cover"
                  data-alt="music festival crowd"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAY4N5wGC8gTaNy7KBQo_CqoJU2FST57ZuTJ82rhza5SgNbD82Kzg6my3xr7eN-356l4AQOjv2GEYw66IZkgerEjMuWlWfVP-3MWB6hzljzZNI0cv9hmM_D09U3BIHcWYZF-mAsTqHNTO5bHWZIowppHACWQmibs5FaRbMU4FGPe4HUYWIOVyRSnWdo6hBMzQyyk35Kv1GbvilKH7woSmato4PRW18ULmt115fWR1O00xTgcfJoTMRIX8rVi4WWt7YP4CvxnG6HS4"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-4 rounded-2xl flex items-center gap-4">
                    <div className="bg-violet-600 p-3 rounded-xl">
                      <span
                        className="material-symbols-outlined text-white"
                        data-icon="event"
                      >
                        event
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Next Major Event
                      </p>
                      <p className="text-white/80 text-xs">
                        Tomorrow, 7:00 PM • Central Park
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Categories Bento Grid --> */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="items-end justify-between mb-12">
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-3xl text-slate-900 mb-2">
                Explore by Category
              </h2>
              <p className="text-slate-500">
                Find exactly what you're looking for
              </p>
            </div>
            <Link to="/category">
              <button className="mt-2 text-violet-600 font-bold flex items-center gap-1 group">
                View All <ArrowRight />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 relative group cursor-pointer overflow-hidden rounded-[32px] aspect-video">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="music concert"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9U8f5ar4R5E17iX3NnjVO-aq8g4WobCyGv8GnxKaL00mWsmz-I6tKQwMHw-2wmbsiKqaVhOTvvJ07vyfqyBUDIhVMhg7lBu_HrCKYGXHSe_4S-fMg1rXOCCakhzctYipI_eJlLdszAxW0sAPB3oi1wei0OU4-MLm5ZQGd_mX817d9vz2H_wWgaZV5IAj3NRYplWFSqVzr7kjvwzqYLDlFEYf8UFeZ84_gcW-wvSDV_HIDMomQnQH-SvnHmo5yRuY7epbq7TE4FI4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-white/80 text-xs font-bold mb-2">
                  450+ Events
                </span>
                <h3 className="text-white font-['Plus_Jakarta_Sans'] font-bold text-2xl">
                  Music &amp; Concerts
                </h3>
              </div>
            </div>
            <div className="relative group cursor-pointer overflow-hidden rounded-[32px] aspect-square">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="tech conference"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpvrC_ChO50SWPDCb1RMZJ4EZ_J0k5A4V_iZZ6BPc8WwGnTwSS-Hmp6w4lmEYWgu559GHjpEe0-PZYeFhKCB2A2kr7fwn7cUPzd-hcRvOKPRvAU1ndlEOoTSs9ENDMchgnaNOTgNNnitIY8j0m_ZIX5KgYWbMjeTL0qlPOV9ETTmDALOIuybi7h_Nl5qNNw9M1KTQURbWsrGtAd5E7863qL6iccTqcRI_4W5wNzxT6mv73OEwvbfqGSui3qwzIr937UgXDp8RyhVo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-white/80 text-xs font-bold mb-2">
                  120+ Events
                </span>
                <h3 className="text-white font-['Plus_Jakarta_Sans'] font-bold text-xl">
                  Tech &amp; Business
                </h3>
              </div>
            </div>
            <div className="relative group cursor-pointer overflow-hidden rounded-[32px] aspect-square">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="food market"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWRZmhQncpafifKShSKTucHHq_uZe9F9tCoASuAWMW-iwemuUUoYp-veXJk5KDXwM_XZ-MZmTrvdSLx8_dUpe4NS75zZVryRU9lml-E24IoNbsOI_X6wXLQl5NL8M986A4QsB8u70kM3BYpKaXQYjzuz4TNrF9yDfJVW6_ZVfEf688qeKiccNQ8JnnHVBwd5pTLJ5Lnp7ubU-ilVy52eS13L6o0gJg8QSR3ZBzryXXhmCZNJURfZWfv2Ksp6RrfRDUFqhKtePm94s"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-white/80 text-xs font-bold mb-2">
                  85+ Events
                </span>
                <h3 className="text-white font-['Plus_Jakarta_Sans'] font-bold text-xl">
                  Food &amp; Drink
                </h3>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Upcoming Events --> */}
        <section className="py-20 px-6 bg-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-3xl text-slate-900 mb-2">
                Upcoming Events
              </h2>
              <p className="text-slate-500">
                Celebrate the festival of colors in your city
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* <!-- Event Card --> */}
              {events?.map((event) => (
                <UserEventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
        {/* <!-- Features Section --> */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-3xl text-slate-900 mb-4">
              Why Choose City Event?
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              We connect millions of event-goers with incredible experiences
              every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                <Newspaper />
              </div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xl mb-4">
                World’s most influential media
              </h4>
              <p className="text-slate-500">
                Get featured and recognized by top-tier global media outlets and
                event influencers.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                <Megaphone />
              </div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xl mb-4">
                Inspirational speakers
              </h4>
              <p className="text-slate-500">
                Access a network of world-className speakers and thought leaders
                for every niche.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                <Lightbulb />{" "}
              </div>
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-xl mb-4">
                Game changing ideas
              </h4>
              <p className="text-slate-500">
                Foster innovation through events designed to spark creativity
                and connection.
              </p>
            </div>
          </div>
        </section>
        {/* <!-- Newsletter Section --> */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto bg-violet-600 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-violet-600/30">
            {/* <!-- Abstract Shapes --> */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl"></div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-4xl text-white mb-6 relative z-10">
              Never miss a beat in your city.
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">
              Join 50,000+ event lovers and get personalized recommendations
              delivered to your inbox every Thursday.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto relative z-10">
              <input
                className="flex-1 px-8 py-4 rounded-full border-0 bg-white/90 text-slate-900 focus:ring-4 focus:ring-white/20"
                placeholder="Enter your email address"
                type="email"
              />
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
