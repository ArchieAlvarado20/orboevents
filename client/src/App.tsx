import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Scanner from "./pages/admin/Scanner";
import Auth from "./pages/Auth";
import Events from "./pages/admin/Events";
import QRScanner from "./components/QRScanner";
import QRImageScanner from "./components/QRimage";
import Test from "./pages/admin/test";
import CreateTest from "./pages/admin/testCreate";
import Analytics from "./pages/admin/Analytics";
import Ticket from "./pages/admin/Tickets";
import LandingPage from "./pages/user/LandingPage";
import Category from "./pages/user/Category";
import UserEvents from "./pages/user/UserEvents";
import UserTickets from "./pages/user/UserTickets";
import ScrollToTop from "./lib/topUponNavigate";
import Organizer from "./pages/user/Organizer";
import About from "./pages/user/About";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/events" element={<UserEvents />} />
        <Route path="/tickets/:id" element={<UserTickets />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/about" element={<About />} />

        {/* Admin Group */}
        <Route path="/admin" element={<Auth />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/tickets" element={<Ticket />} />
        <Route path="/admin/scanner" element={<Scanner />} />
        <Route path="/admin/analytics" element={<Analytics />} />

        <Route path="/admin/settings" element={<Scanner />} />

        {/* Other routes */}
        <Route path="/scanner" element={<QRScanner />} />
        <Route path="/image" element={<QRImageScanner />} />
        <Route path="/test" element={<Test />} />
        <Route path="/tests" element={<CreateTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
