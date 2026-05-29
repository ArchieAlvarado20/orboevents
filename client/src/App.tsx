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

import Organizer from "./pages/user/Organizer";
import About from "./pages/user/About";
import AdminLayout from "./Layout/AdminLayout";
import _404Page from "./components/shared/_404Page";
import _404UserPage from "./components/shared/usersPage/_404UserPage";
import UserLayout from "./Layout/UserLayout";
import UserAuth from "./pages/UserAuth";
import ToastProvider from "./components/shared/ToastProvider";
import ScrollToTop from "./components/shared/topUponNavigate";
import Reservation from "./pages/user/Reservation";
import Transaction from "./pages/user/Transaction";
import SmartTicketingLanding from "./pages/user/main";
import DigitalTicketMockup from "./pages/user/mobile";
import Role from "./pages/admin/Role";
import Users from "./pages/admin/Users";
import Categories from "./pages/admin/Categories";
import EventType from "./pages/admin/EventType";
import { Toaster } from "react-hot-toast";
import EventInfoPage from "./pages/admin/EventsInfo";
import UserSlots from "./pages/user/UserSlots";
import ZonePage from "./pages/admin/Zone";
import UserForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetpassword";
import ProtectedRoute from "./components/shared/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Toaster position="top-center" />
      <ScrollToTop />
      <Routes>
        {/* Public */}

        <Route path="login" element={<UserAuth />} />
        <Route path="/" element={<UserLayout />}>
          <Route path="*" element={<_404UserPage />} />
          <Route index element={<SmartTicketingLanding />} />
          <Route path="category" element={<Category />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="tickets/:id/slots/:slotId" element={<UserTickets />} />
          <Route path="slots/:id" element={<UserSlots />} />
          <Route path="organizer" element={<Organizer />} />
          <Route path="about" element={<About />} />
          <Route path="scanner" element={<QRScanner />} />
          <Route path="image" element={<QRImageScanner />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="forgot-password" element={<UserForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route path="/admin" element={<Auth />} />
        {/* Admin Group */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="*" element={<_404Page />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="events" element={<Events />} />
          <Route path="roles" element={<Role />} />
          <Route path="users" element={<Users />} />
          <Route path="tickets" element={<Ticket />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="categories" element={<Categories />} />
          <Route path="event-types" element={<EventType />} />
          <Route path="events/:id" element={<EventInfoPage />} />
          <Route path="zones" element={<ZonePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
