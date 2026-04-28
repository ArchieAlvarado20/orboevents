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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/events" element={<UserEvents />} />
        <Route path="/tickets" element={<UserTickets />} />

        {/* Admin Group */}
        <Route path="/admin" element={<Auth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="tickets" element={<Ticket />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Scanner />} />
        </Route>

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
