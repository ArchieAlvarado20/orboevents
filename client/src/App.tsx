import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Scanner from "./pages/admin/Scanner";
import Auth from "./pages/Auth";
import Events from "./pages/admin/Events";
import QRScanner from "./components/QRScanner";
import QRImageScanner from "./components/QRimage";
import Analytics from "./pages/admin/Analytics";
import Ticket from "./pages/admin/Tickets";
import LandingPage from "./pages/user/LandingPage";
import Category from "./pages/user/Category";
import UserEvents from "./pages/user/UserEvents";
import UserTickets from "./pages/user/UserTickets";

import Organizer from "./pages/user/Organizer";
import About from "./pages/user/About";
import AdminLayout from "./Layout/AdminLayout";
import _404Page from "./components/shared/_404Page";
import _404UserPage from "./components/shared/usersPage/_404UserPage";
import Checkout from "./pages/user/Checkout";
import UserLayout from "./Layout/UserLayout";
import UserAuth from "./pages/UserAuth";
import ToastProvider from "./components/shared/ToastProvider";
import ScrollToTop from "./components/shared/topUponNavigate";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <ScrollToTop />
      <Routes>
        {/* Public */}

        <Route path="login" element={<UserAuth />} />
        <Route path="/" element={<UserLayout />}>
          <Route path="*" element={<_404UserPage />} />
          <Route index element={<LandingPage />} />
          <Route path="category" element={<Category />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="tickets/:id" element={<UserTickets />} />
          <Route path="organizer" element={<Organizer />} />
          <Route path="about" element={<About />} />
          <Route path="scanner" element={<QRScanner />} />
          <Route path="image" element={<QRImageScanner />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route path="/admin" element={<Auth />} />
        {/* Admin Group */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="*" element={<_404Page />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="tickets" element={<Ticket />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
