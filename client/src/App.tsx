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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/admin/" element={<Auth />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/tickets" element={<Ticket />} />
        <Route path="/admin/scanner" element={<Scanner />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/settings" element={<Scanner />} />
        <Route path="/scanner" element={<QRScanner />} />
        <Route path="/image" element={<QRImageScanner />} />
        <Route path="/test" element={<Test />} />
        <Route path="/tests" element={<CreateTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
