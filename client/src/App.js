import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/category", element: _jsx(Category, {}) }), _jsx(Route, { path: "/admin/", element: _jsx(Auth, {}) }), _jsx(Route, { path: "/admin/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/admin/events", element: _jsx(Events, {}) }), _jsx(Route, { path: "/admin/tickets", element: _jsx(Ticket, {}) }), _jsx(Route, { path: "/admin/scanner", element: _jsx(Scanner, {}) }), _jsx(Route, { path: "/admin/analytics", element: _jsx(Analytics, {}) }), _jsx(Route, { path: "/admin/settings", element: _jsx(Scanner, {}) }), _jsx(Route, { path: "/scanner", element: _jsx(QRScanner, {}) }), _jsx(Route, { path: "/image", element: _jsx(QRImageScanner, {}) }), _jsx(Route, { path: "/test", element: _jsx(Test, {}) }), _jsx(Route, { path: "/tests", element: _jsx(CreateTest, {}) })] }) }));
}
export default App;
